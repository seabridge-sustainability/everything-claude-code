---
name: laravel-plugin-discovery
description: Discover and evaluate Laravel packages via LaraPlugins.io MCP. Use when the user wants to find plugins, check package health, or assess Laravel/PHP compatibility.
metadata:
  origin: ECC
---

# Laravel Plugin Discovery

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action; approval covers that action only.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. (Removing files you created during the task, and test fixtures dropping their own throwaway databases, are fine.)
2. **Ask first:** commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Find, evaluate, and choose healthy Laravel packages using the LaraPlugins.io MCP server.

## When to Use

- User wants to find Laravel packages for a specific feature (e.g. "auth", "permissions", "admin panel")
- User asks "what package should I use for..." or "is there a Laravel package for..."
- User wants to check if a package is actively maintained
- User needs to verify Laravel version compatibility
- User wants to assess package health before adding to a project

## MCP Requirement

LaraPlugins MCP server must be configured. Add to your `~/.claude.json` mcpServers:

```json
"laraplugins": {
  "type": "http",
  "url": "https://laraplugins.io/mcp/plugins"
}
```

No API key required Ã¢â‚¬â€ the server is free for the Laravel community.

## MCP Tools

The LaraPlugins MCP provides two primary tools:

### SearchPluginTool

Search packages by keyword, health score, vendor, and version compatibility.

**Parameters:**
- `text_search` (string, optional): Keyword to search (e.g. "permission", "admin", "api")
- `health_score` (string, optional): Filter by health band Ã¢â‚¬â€ `Healthy`, `Medium`, `Unhealthy`, or `Unrated`
- `laravel_compatibility` (string, optional): Filter by Laravel version Ã¢â‚¬â€ `"5"`, `"6"`, `"7"`, `"8"`, `"9"`, `"10"`, `"11"`, `"12"`, `"13"`
- `php_compatibility` (string, optional): Filter by PHP version Ã¢â‚¬â€ `"7.4"`, `"8.0"`, `"8.1"`, `"8.2"`, `"8.3"`, `"8.4"`, `"8.5"`
- `vendor_filter` (string, optional): Filter by vendor name (e.g. "spatie", "laravel")
- `page` (number, optional): Page number for pagination

### GetPluginDetailsTool

Fetch detailed metrics, readme content, and version history for a specific package.

**Parameters:**
- `package` (string, required): Full Composer package name (e.g. "spatie/laravel-permission")
- `include_versions` (boolean, optional): Include version history in response

---

## How It Works

### Finding Packages

When the user wants to discover packages for a feature:

1. Use `SearchPluginTool` with relevant keywords
2. Apply filters for health score, Laravel version, or PHP version
3. Review the results with package names, descriptions, and health indicators

### Evaluating Packages

When the user wants to assess a specific package:

1. Use `GetPluginDetailsTool` with the package name
2. Review health score, last updated date, Laravel version support
3. Check vendor reputation and risk indicators

### Checking Compatibility

When the user needs Laravel or PHP version compatibility:

1. Search with `laravel_compatibility` filter set to their version
2. Or get details on a specific package to see its supported versions

---

## Examples

### Example: Find Authentication Packages

```
SearchPluginTool({
  text_search: "authentication",
  health_score: "Healthy"
})
```

Returns packages matching "authentication" with healthy status:
- spatie/laravel-permission
- laravel/breeze
- laravel/passport
- etc.

### Example: Find Laravel 12 Compatible Packages

```
SearchPluginTool({
  text_search: "admin panel",
  laravel_compatibility: "12"
})
```

Returns packages compatible with Laravel 12.

### Example: Get Package Details

```
GetPluginDetailsTool({
  package: "spatie/laravel-permission",
  include_versions: true
})
```

Returns:
- Health score and last activity
- Laravel/PHP version support
- Vendor reputation (risk score)
- Version history
- Brief description

### Example: Find Packages by Vendor

```
SearchPluginTool({
  vendor_filter: "spatie",
  health_score: "Healthy"
})
```

Returns all healthy packages from vendor "spatie".

---

## Filtering Best Practices

### By Health Score

| Health Band | Meaning |
|-------------|---------|
| `Healthy` | Active maintenance, recent updates |
| `Medium` | Occasional updates, may need attention |
| `Unhealthy` | Abandoned or infrequently maintained |
| `Unrated` | Not yet assessed |

**Recommendation**: Prefer `Healthy` packages for production applications.

### By Laravel Version

| Version | Notes |
|---------|-------|
| `13` | Latest Laravel |
| `12` | Current stable |
| `11` | Still widely used |
| `10` | Legacy but common |
| `5`-`9` | Deprecated |

**Recommendation**: Match the target project's Laravel version.

### Combining Filters

```typescript
// Find healthy, Laravel 12 compatible packages for permissions
SearchPluginTool({
  text_search: "permission",
  health_score: "Healthy",
  laravel_compatibility: "12"
})
```

---

## Response Interpretation

### Search Results

Each result includes:
- Package name (e.g. `spatie/laravel-permission`)
- Brief description
- Health status indicator
- Laravel version support badges

### Package Details

The detailed response includes:
- **Health Score**: Numeric or band indicator
- **Last Activity**: When the package was last updated
- **Laravel Support**: Version compatibility matrix
- **PHP Support**: PHP version compatibility
- **Risk Score**: Vendor trust indicators
- **Version History**: Recent release timeline

---

## Common Use Cases

| Scenario | Recommended Approach |
|----------|---------------------|
| "What package for auth?" | Search "auth" with healthy filter |
| "Is spatie/package still maintained?" | Get details, check health score |
| "Need Laravel 12 packages" | Search with laravel_compatibility: "12" |
| "Find admin panel packages" | Search "admin panel", review results |
| "Check vendor reputation" | Search by vendor, check details |

---

## Best Practices

1. **Always filter by health** Ã¢â‚¬â€ Use `health_score: "Healthy"` for production projects
2. **Match Laravel version** Ã¢â‚¬â€ Always check `laravel_compatibility` matches the target project
3. **Check vendor reputation** Ã¢â‚¬â€ Prefer packages from known vendors (spatie, laravel, etc.)
4. **Review before recommending** Ã¢â‚¬â€ Use GetPluginDetailsTool for a comprehensive assessment
5. **No API key needed** Ã¢â‚¬â€ The MCP is free, no authentication required

---

## Related Skills

- `laravel-patterns` Ã¢â‚¬â€ Laravel architecture and patterns
- `laravel-tdd` Ã¢â‚¬â€ Test-driven development for Laravel
- `laravel-security` Ã¢â‚¬â€ Laravel security best practices
- `documentation-lookup` Ã¢â‚¬â€ General library documentation lookup (Context7)
