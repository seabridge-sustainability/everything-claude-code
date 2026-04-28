# Security Quarantine

This directory contains third-party reference apps and examples. They are useful
as source material, but they are not approved runtime dependencies.

Last local audit: 2026-04-28.

## Do Not Run Without Upgrade

- `awesome-llm-apps/advanced_ai_agents/multi_agent_apps/ai_negotiation_battle_simulator/frontend`
  - Residual: moderate CopilotKit/LangSmith/uuid/Next/PostCSS chain.
  - Recommendation: reference-only unless the app is upgraded as its own project.

- `awesome-llm-apps/advanced_llm_apps/multimodal_video_moment_finder/frontend`
  - Residual: high Next.js advisories plus PostCSS.
  - Recommendation: do not run until Next is upgraded and smoke-tested.

- `awesome-llm-apps/advanced_llm_apps/thinkpath_chatbot_app`
  - Residual: high Electron advisories.
  - Recommendation: do not build or run the desktop app until Electron is upgraded.

- `awesome-llm-apps/awesome_agent_skills/self-improving-agent-skills/frontend`
  - Residual: Next/PostCSS and `diff` advisories.
  - Recommendation: reference-only until dependencies are upgraded.

- `design-extract/website`
  - Residual: Next/PostCSS through `@vercel/analytics`.
  - Recommendation: reference-only until Next-related advisories are resolved.

- `agentic-stack/docs/demo`
  - Residual: low Remotion/webpack advisories.
  - Recommendation: demo-only; do not expose to untrusted input.
