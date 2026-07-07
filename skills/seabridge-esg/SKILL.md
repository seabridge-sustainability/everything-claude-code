---
name: seabridge-esg
description: SeaBridgeAI project conventions for deepagents. ESG data models, LangGraph agent patterns, FastAPI endpoint structure, and cross-repo layout for manageesg-backend and manageesg-frontend.
---

# SeaBridgeAI ESG Project Conventions

When working in any SeaBridgeAI repo, follow these conventions.

## Project Layout

```
manageesg-backend/
  app/                      # FastAPI app
    api/v1/endpoints/       # ~40+ REST routers
    models/                 # Beanie MongoDB documents
    services/               # Business logic layer
    schemas/                # Pydantic v2 request/response models
  seabridge_ai/             # AI/ML package (uv managed, Python 3.12)
    src/sustainability_ai/
      ai_agents/            # LangGraph agents by domain
      ai_manager/           # Sustainability chatbot
      ai_mcp/               # MCP integrations
      nl_to_mql/            # NL → MongoDB query agent

manageesg-frontend/
  src/                      # Next.js 14+ app router
```

## FastAPI Endpoint Pattern

```python
from fastapi import APIRouter, Depends
from app.api.deps import get_current_user
from app.schemas.my_schema import MyRequest, MyResponse
from app.services.my_service import MyService
from app.utils.logger import logger

router = APIRouter()

@router.post("/", response_model=MyResponse)
async def create_item(request: MyRequest, user=Depends(get_current_user)):
    logger.info(f"Creating item for user {user.id}")
    return await MyService.create(request)
```

## LangGraph Agent Pattern

```python
# seabridge_ai/src/sustainability_ai/ai_agents/<domain>/<agent>.py
from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import HumanMessage

llm = ChatAnthropic(model="claude-sonnet-4-6")

def build_graph():
    graph = StateGraph(AgentState)
    graph.add_node("analyze", analyze_node)
    graph.add_edge("analyze", END)
    graph.set_entry_point("analyze")
    return graph.compile()
```

## MongoDB / Beanie Model Pattern

```python
from beanie import Document
from pydantic import Field
from typing import Optional

class MyDocument(Document):
    name: str
    value: Optional[float] = None

    class Settings:
        name = "my_collection"
```

## Code Standards

- Python 3.12, PEP 8, type annotations on all signatures
- `loguru` for logging (never `print()`)
- Pydantic v2 for all schemas
- `uv sync` to install dependencies in seabridge_ai/
- Run tests: `pytest` from repo root
- No hardcoded secrets — all via `.env`
