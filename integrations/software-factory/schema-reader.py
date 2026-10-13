"""Read only the fixed contract source as AST; never import application code."""
import ast
import json
import sys

source = json.load(sys.stdin)
result = {"enums": {}, "fields": {}}
for kind, text in source.items():
    if kind not in ("model", "schema") or not isinstance(text, str) or len(text) > 100000:
        raise ValueError("Bounded model/schema source required")
    tree = ast.parse(text)
    for node in tree.body:
        if (kind == "model" and isinstance(node, ast.Assign)
                and isinstance(node.value, ast.Subscript)
                and isinstance(node.value.value, ast.Name)
                and node.value.value.id == "Literal"):
            values = node.value.slice.elts if isinstance(node.value.slice, ast.Tuple) else [node.value.slice]
            if all(isinstance(value, ast.Constant) and isinstance(value.value, str) for value in values):
                for target in node.targets:
                    if isinstance(target, ast.Name):
                        result["enums"][target.id] = [value.value for value in values]
        if not isinstance(node, ast.ClassDef):
            continue
        if kind == "model":
            values = [field.value.value for field in node.body
                      if isinstance(field, ast.Assign) and isinstance(field.value, ast.Constant)
                      and isinstance(field.value.value, str)]
            if values:
                result["enums"][node.name] = values
        elif node.name == "EnergyFindingOut":
            for field in node.body:
                if isinstance(field, ast.AnnAssign) and isinstance(field.target, ast.Name):
                    result["fields"][field.target.id] = ast.unparse(field.annotation)
print(json.dumps(result))
