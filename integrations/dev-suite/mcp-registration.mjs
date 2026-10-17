// Shared registration invariants. Register tools without undoing owner choices.
export function assertSameMcpLaunch(existing, proposed, label = 'MCP server') {
  for (const key of ['type', 'command', 'args']) {
    if (Object.hasOwn(proposed, key) && JSON.stringify(existing[key]) !== JSON.stringify(proposed[key])) {
      throw new Error(`Existing ${label} selects a different ${key}; preserve it for explicit review`);
    }
  }
}

export function registerClaudeSpecialists(config, entries) {
  const added = [];
  for (const [name, definition] of Object.entries(entries)) {
    const existing = config.mcpServers?.[name];
    if (existing) assertSameMcpLaunch(existing, definition, name);
    else added.push(name);
  }
  const projects = Object.values(config.projects || {}).filter(project =>
    project && typeof project === 'object' && !Array.isArray(project));
  // Validate the entire plan before changing even the caller's in-memory copy.
  for (const project of added.length ? projects : []) {
    if (project.disabledMcpServers !== undefined && (!Array.isArray(project.disabledMcpServers)
        || project.disabledMcpServers.some(name => typeof name !== 'string'))) {
      throw new Error('Existing Claude MCP choices are malformed; preserve configuration');
    }
  }
  config.mcpServers ||= {};
  for (const name of added) config.mcpServers[name] = entries[name];
  for (const project of added.length ? projects : []) {
    // A newly registered specialist is opt-in in known projects. Existing
    // activation, disabled and rejected decisions are never removed or widened.
    project.disabledMcpServers = [...new Set([...(project.disabledMcpServers || []), ...added])];
  }
  return added;
}

export function codexSpecialistBlock(name, definition) {
  if (!/^[a-z][a-z0-9_-]*$/.test(name) || typeof definition.command !== 'string'
      || !Array.isArray(definition.args) || definition.args.some(arg => typeof arg !== 'string')) {
    throw new Error('Valid specialist name, command and string arguments required');
  }
  return `\n[mcp_servers.${name}]\nenabled = false\ncommand = ${JSON.stringify(definition.command)}\nargs = ${JSON.stringify(definition.args)}\n`;
}
