# MCP Toolbox Configs — SeaBridgeAI

Configuration examples for running MCP Toolbox for Databases locally and in staging.

## Files

| File | Purpose |
|------|---------|
| `tools.dev.example.yaml` | Local/dev cluster config — copy to `tools.dev.yaml` |
| `tools.staging.example.yaml` | Staging config — copy to `tools.staging.yaml` |
| `tools.dev.yaml` | **gitignored** — your real dev config with credentials |
| `tools.staging.yaml` | **gitignored** — your real staging config |

## Quick Start (Dev)

1. Copy the example:
   ```powershell
   Copy-Item tools.dev.example.yaml tools.dev.yaml
   ```

2. Fill in credentials from your `.env` (never commit real credentials):
   - `<MONGODB_DEV_URL>` → your Atlas dev SRV connection string (read-only user)
   - `<SEABRI_DEV_DB_HOST>` → your local/dev Postgres host
   - `<REDIS_DEV_HOST>` → your local Redis host

3. Start toolbox:
   ```powershell
   npx @toolbox-sdk/server --config tools.dev.yaml
   ```

4. Add to Claude Code project `.mcp.json`:
   ```json
   {
     "mcpServers": {
       "toolbox": { "type": "http", "url": "http://127.0.0.1:5000/mcp" }
     }
   }
   ```

## Database User Setup

### MongoDB — Read-Only User

In MongoDB Atlas UI or mongosh (dev cluster only):

```javascript
db.createUser({
  user: "toolbox_ro",
  pwd: "<strong-random-password>",
  roles: [{ role: "read", db: "manageesg_dev" }]
})
```

### PostgreSQL — Read-Only User

```sql
CREATE USER toolbox_ro WITH PASSWORD '<strong-random-password>';
GRANT CONNECT ON DATABASE openseabri_dev TO toolbox_ro;
GRANT USAGE ON SCHEMA public TO toolbox_ro;
-- Grant SELECT on safe tables only (not homeowner PII tables):
GRANT SELECT ON properties, contractors, claims, incidents, incident_events, documents TO toolbox_ro;
```

## Safety Rules

- Use `<PLACEHOLDER>` in example files — never real credentials
- `tools.dev.yaml` and `tools.staging.yaml` are gitignored
- Read-only DB users only
- No DROP/DELETE/UPDATE/INSERT/ALTER in any tool statement
- Local or dev cluster only for `tools.dev.yaml`
- Staging requires explicit approval before use
- Production: requires written approval from `adelmar@seabridgesustainability.com`

## Full Documentation

See [`docs/mcp/mcp-toolbox.md`](../../docs/mcp/mcp-toolbox.md) for the complete
integration guide, testing plan, and architecture.
