"""
train_sustainability_model.py

LoRA fine-tune from YAML config. Requires Unsloth Studio environment.
Approval required for jobs > 1 epoch or > 100 steps.

Usage:
    python train_sustainability_model.py --config ../../configs/unsloth/qwen-sustainability-smoke.yaml
    python train_sustainability_model.py --config ../../configs/unsloth/gemma-sustainability-smoke.yaml

VRAM budget (RTX 4090 Laptop, 16 GB):
  Qwen2.5-3B  Q4 4bit LoRA  ~5 GB
  Qwen2.5-7B  Q4 4bit LoRA  ~10 GB
  Gemma-2-2B  Q4 4bit LoRA  ~4 GB
"""
from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Config loading
# ---------------------------------------------------------------------------

def _load_config(config_path: str) -> dict:
    """Merge model_variables.yaml defaults with the given config file."""
    try:
        import yaml
    except ImportError:
        print("[ERROR] PyYAML not installed. Run: pip install pyyaml")
        sys.exit(1)

    defaults_path = Path(__file__).parent.parent.parent / "configs" / "unsloth" / "model_variables.yaml"
    config = {}
    if defaults_path.exists():
        with open(defaults_path) as f:
            config.update(yaml.safe_load(f) or {})

    with open(config_path) as f:
        overrides = yaml.safe_load(f) or {}
    config.update(overrides)
    return config


# ---------------------------------------------------------------------------
# Training
# ---------------------------------------------------------------------------

def train(cfg: dict) -> None:
    _require_approval(cfg)

    try:
        from unsloth import FastLanguageModel
        from datasets import load_dataset
        from trl import SFTTrainer
        from transformers import TrainingArguments
    except ImportError as exc:
        print(f"[ERROR] Missing dependency: {exc}")
        print("       Run inside the Unsloth Studio venv.")
        sys.exit(1)

    model_name: str = cfg["training_model_family"]
    max_seq_length: int = cfg.get("max_seq_length", 512)
    lora_rank: int = cfg.get("lora_rank", 16)
    output_dir: str = cfg.get("output_dir", "./output/sustainability-model")

    print(f"\n=== Sustainability LoRA Fine-Tune ===")
    print(f"Model    : {model_name}")
    print(f"Output   : {output_dir}")
    print(f"Domain   : {cfg.get('sustainability_domain', 'general')}")
    print(f"Epochs   : {cfg.get('num_train_epochs', 1)}\n")

    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=model_name,
        max_seq_length=max_seq_length,
        load_in_4bit=cfg.get("load_in_4bit", True),
        dtype=None,
    )

    model = FastLanguageModel.get_peft_model(
        model,
        r=lora_rank,
        lora_alpha=cfg.get("lora_alpha", lora_rank),
        lora_dropout=cfg.get("lora_dropout", 0),
        target_modules=cfg.get("lora_target_modules", ["q_proj", "v_proj"]),
        use_gradient_checkpointing=cfg.get("use_gradient_checkpointing", "unsloth"),
        random_state=42,
    )

    dataset_path: str = cfg["dataset_path"]
    dataset = load_dataset("json", data_files=dataset_path, split="train")
    dataset = dataset.map(_format_prompt, fn_kwargs={"tokenizer": tokenizer})

    training_args = TrainingArguments(
        output_dir=output_dir,
        num_train_epochs=cfg.get("num_train_epochs", 1),
        per_device_train_batch_size=cfg.get("per_device_train_batch_size", 1),
        gradient_accumulation_steps=cfg.get("gradient_accumulation_steps", 4),
        learning_rate=cfg.get("learning_rate", 2.0e-4),
        bf16=cfg.get("bf16", True),
        save_strategy=cfg.get("save_strategy", "no"),
        logging_steps=1,
        report_to="none",
    )

    trainer = SFTTrainer(
        model=model,
        tokenizer=tokenizer,
        train_dataset=dataset,
        dataset_text_field="text",
        max_seq_length=max_seq_length,
        args=training_args,
    )

    trainer_stats = trainer.train()
    print(f"\nTraining complete. Loss: {trainer_stats.training_loss:.4f}")

    if cfg.get("save_strategy", "no") != "no":
        model.save_pretrained(output_dir)
        tokenizer.save_pretrained(output_dir)
        print(f"Adapter saved to: {output_dir}")
    else:
        print("save_strategy=no — adapter not persisted (smoke-test mode).")


def _format_prompt(example: dict, tokenizer) -> dict:
    """Convert instruction/chat/dpo record to a single 'text' field."""
    if "conversations" in example:
        # ChatML format
        parts = []
        for turn in example["conversations"]:
            role = turn.get("from", "user")
            val = turn.get("value", "")
            parts.append(f"<|im_start|>{role}\n{val}<|im_end|>")
        example["text"] = "\n".join(parts)
    elif "instruction" in example:
        # Instruction format
        inp = example.get("input", "")
        prefix = f"\n\nContext: {inp}" if inp else ""
        example["text"] = (
            f"### Instruction:\n{example['instruction']}{prefix}\n\n"
            f"### Response:\n{example['output']}"
        )
    return example


def _require_approval(cfg: dict) -> None:
    epochs = cfg.get("num_train_epochs", 1)
    max_steps = cfg.get("max_steps", None)
    if epochs > 1 or (max_steps and max_steps > 100):
        approved = os.environ.get("TRAINING_APPROVED", "false").lower()
        if approved != "true":
            print(
                f"[BLOCKED] Jobs > 1 epoch or > 100 steps require explicit approval.\n"
                f"  Set TRAINING_APPROVED=true in your environment to proceed.\n"
                f"  Current config: {epochs} epoch(s), max_steps={max_steps}"
            )
            sys.exit(1)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Sustainability LoRA fine-tune")
    parser.add_argument(
        "--config",
        required=True,
        help="Path to YAML training config (overrides model_variables.yaml defaults)",
    )
    args = parser.parse_args()

    config_path = Path(args.config)
    if not config_path.exists():
        print(f"[ERROR] Config not found: {config_path}")
        sys.exit(1)

    cfg = _load_config(str(config_path))
    train(cfg)


if __name__ == "__main__":
    main()
