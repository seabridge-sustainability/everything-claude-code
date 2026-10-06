# MongoDB Agent Workflow (on demand)

Read this only for MongoDB, Beanie, Motor/PyMongo, database-query, or MongoDB MCP work. Repository `AGENTS.md` and the current user's authorization remain authoritative. MongoDB's [Build with AI](https://www.mongodb.com/docs/build-with-ai/) and [Agent Skills](https://www.mongodb.com/docs/agent-skills/) are task references, not permission to connect to a database or install a plugin.

## Application changes

- Trace the authenticated tenant/company scope from the API boundary through the service to every Mongo query, aggregation (including `$lookup`), and write. Test cross-tenant denial and missing-data behavior; an example document or an agent-generated answer is not proof of live tenant data.
- Follow the repository's Beanie model, Pydantic response, and index conventions. For a changed access pattern, check the matching index and use an appropriate query plan against safe representative data; do not add indexes or run expensive explain plans on shared data by default.
- Keep database initialization and migrations separate from connectivity checks. SeaBridge backend startup can repair records and create indexes, so starting it against a shared database is not a read-only probe.
- Use an isolated, throwaway loopback database for Mongo-backed tests, run those tests serially on this machine, and verify the target URI before execution. A skip caused by an unavailable test database is not a pass. Never point tests or cleanup at a shared, staging, or production database.

## Agent access

- Prefer current MongoDB documentation or the relevant connection, schema, query, or optimization skill for design work. Do not load the entire MongoDB skill catalog or enable MongoDB MCP for unrelated tasks.
- MongoDB MCP is optional and not configured by this protocol. Before any approved connection, identify the exact environment, collections, data sensitivity, tenant boundary, purpose, and query budget. Default to synthetic or isolated development data. A read-only MCP setting alone does not prevent sensitive reads or constrain direct terminal/driver access.
- If MCP is explicitly approved, use both a separately scoped read-only database identity and `MDB_MCP_READ_ONLY=true`; disable unneeded write, Atlas-management, and export tools; set bounded query time; and supply secrets through protected environment configuration, never command arguments or agent context. Verify the effective permissions without reading tenant records. Do not silently fall back to a broader credential.

## Maintenance

The backend currently uses Motor and Beanie 1.x. Treat a move to PyMongo Async/Beanie 2 as a separately planned, tested migration, not an incidental dependency bump. Check current [Motor support](https://motor.readthedocs.io/en/latest/changelog.html) and [Beanie releases](https://github.com/BeanieODM/beanie/releases) before changing drivers.

MongoDB MCP references: [configuration](https://www.mongodb.com/docs/mcp-server/local-mcp/configuration/options/) and [security best practices](https://www.mongodb.com/docs/mcp-server/local-mcp/security-best-practices/).
