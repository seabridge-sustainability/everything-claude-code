'use strict';

/**
 * SeaBridgeAI knowledge-source registry: load, validate, and route.
 *
 * The JSON Schema (schemas/knowledge-sources.schema.json) checks the shape of
 * each entry. This module adds the cross-entry rules a schema cannot express:
 * unique ids, consistent projection links, one home per information type, and
 * the tenant boundary. The tenant boundary is keyed on store kind here in code,
 * so relaxing a flag in the JSON cannot move customer data into agent or
 * personal stores.
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const REPO_ROOT = path.join(__dirname, '..', '..');
const DEFAULT_REGISTRY_PATH = path.join(REPO_ROOT, 'config', 'knowledge-sources.json');
const SCHEMA_PATH = path.join(REPO_ROOT, 'schemas', 'knowledge-sources.schema.json');

// Stores that must never hold customer/tenant information: coding-agent
// memory, personal business knowledge, human notes, and code graphs.
const TENANT_FORBIDDEN_STORE_KINDS = new Set([
  'ecc-memory-vault',
  'gbrain',
  'obsidian-vault',
  'markdown-folder',
  'graphify-files',
  'falkordb',
  'harness-memory',
  'mcp-memory',
  'git-docs',
  'git-repo',
  'issue-tracker',
]);

// Reviewed, version-controlled repository content is the only governed truth.
const GOVERNED_STORE_KINDS = new Set(['git-docs', 'git-repo']);

// The only store kind that may hold tenant data (the platform's own Mongo).
const TENANT_CAPABLE_STORE_KINDS = new Set(['mongodb']);

// ECC Memory Vault records are always unreviewed context (schemas/memory.schema.json);
// accepted knowledge is promoted out of the vault into governed documentation.
const VAULT_TRUST_STATES = new Set(['unreviewed', 'superseded']);

const ABSOLUTE_MACHINE_PATH = /(^|[\s:])([A-Za-z]:[\\/]|\/(Users|home)\/)/;

let compiledValidator = null;

function schemaValidator() {
  if (!compiledValidator) {
    const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
    compiledValidator = new Ajv({ allErrors: true }).compile(schema);
  }
  return compiledValidator;
}

function schemaErrors(data) {
  const validate = schemaValidator();
  if (validate(data)) return [];
  return validate.errors.map(error => {
    const missing = error.params && error.params.missingProperty;
    const where = error.instancePath || '/';
    return {
      code: missing ? 'MISSING_FIELD' : 'SCHEMA',
      path: missing ? `${where}/${missing}` : where,
      message: missing ? `missing required field '${missing}'` : error.message,
    };
  });
}

function crossEntryErrors(registry) {
  const errors = [];
  const add = (code, id, message) => errors.push({ code, path: `sources/${id}`, message });
  const byId = new Map();

  for (const source of registry.sources) {
    if (byId.has(source.id)) add('DUPLICATE_ID', source.id, 'source id is declared more than once');
    byId.set(source.id, source);
  }

  const typeOwners = new Map();

  for (const source of registry.sources) {
    const { id, authority, lifecycle, canonicalStore, tenantData, scope } = source;
    const kind = canonicalStore.kind;

    if (ABSOLUTE_MACHINE_PATH.test(canonicalStore.location)) {
      add('MACHINE_PATH', id, 'location must be logical (repo:path, ~/path, mongodb:collection), not an absolute machine path');
    }

    // Tenant boundary.
    if (TENANT_FORBIDDEN_STORE_KINDS.has(kind)) {
      if (source.sensitivity === 'tenant-confidential') add('TENANT_BOUNDARY', id, `store kind '${kind}' cannot be tenant-confidential`);
      if (source.writers.includes('tenant-users')) add('TENANT_BOUNDARY', id, `tenant users cannot write to store kind '${kind}'`);
    }
    if (tenantData === 'required') {
      if (!TENANT_CAPABLE_STORE_KINDS.has(kind)) add('TENANT_BOUNDARY', id, `tenant data can only live in platform stores, not '${kind}'`);
      if (!scope.levels.includes('tenant')) add('TENANT_SCOPE', id, "tenant data requires scope level 'tenant'");
      if (!scope.isolationKey) add('TENANT_SCOPE', id, 'tenant data requires scope.isolationKey (filter applied before ranking)');
      if (source.sensitivity !== 'tenant-confidential') add('TENANT_SCOPE', id, "tenant data requires sensitivity 'tenant-confidential'");
    }

    // Trust states.
    if (kind === 'ecc-memory-vault') {
      for (const state of source.trustStates) {
        if (!VAULT_TRUST_STATES.has(state)) add('TRUST_STATE', id, `ECC Memory Vault entries cannot be '${state}'; promote into governed docs instead`);
      }
    }
    if (source.trustStates.includes('governed') && !GOVERNED_STORE_KINDS.has(kind)) {
      add('TRUST_STATE', id, "only reviewed, version-controlled repository content can be 'governed'");
    }

    // Authority and projections.
    if (authority === 'projection') {
      if (source.derivedFrom.length === 0) add('PROJECTION', id, 'a projection must name the sources it is rebuilt from');
      if (source.agentAccess === 'read-write') add('PROJECTION', id, 'agents get read-only access to projections');
    } else if (source.derivedFrom.length > 0) {
      add('PROJECTION', id, `only projections are derived from other sources (authority is '${authority}')`);
    }
    if ((authority === 'interface' || authority === 'cache') && source.informationTypes.length > 0) {
      add('ROUTING', id, `an ${authority} owns no information types; route them to their canonical source`);
    }

    for (const target of source.derivedProjections) {
      const projection = byId.get(target);
      if (!projection) {
        add('UNKNOWN_REF', id, `derivedProjections names unknown source '${target}'`);
        continue;
      }
      if (!projection.derivedFrom.includes(id)) add('PROJECTION', id, `'${target}' does not list '${id}' in derivedFrom`);
      if (tenantData === 'required' && projection.tenantData === 'forbidden') {
        add('TENANT_BOUNDARY', id, `tenant data cannot be projected into '${target}'`);
      }
    }
    for (const parent of source.derivedFrom) {
      const origin = byId.get(parent);
      if (!origin) add('UNKNOWN_REF', id, `derivedFrom names unknown source '${parent}'`);
      else if (!origin.derivedProjections.includes(id)) add('PROJECTION', id, `'${parent}' does not list '${id}' in derivedProjections`);
    }

    // Lifecycle.
    if (lifecycle === 'deprecated') {
      if (source.writers.length > 0) add('LIFECYCLE', id, 'a deprecated source accepts no new writes');
      if (source.agentAccess === 'read-write') add('LIFECYCLE', id, 'agents cannot write to a deprecated source');
      continue;
    }
    if (source.writers.length === 0) add('LIFECYCLE', id, 'an active or planned source needs at least one writer');
    if (source.readers.length === 0) add('LIFECYCLE', id, 'an active or planned source needs at least one reader');

    for (const type of source.informationTypes) {
      if (typeOwners.has(type)) add('ROUTING', id, `information type '${type}' is already owned by '${typeOwners.get(type)}'`);
      else typeOwners.set(type, id);
    }
  }

  return errors;
}

function validateRegistry(data) {
  const errors = schemaErrors(data);
  if (errors.length > 0) return { valid: false, errors };
  const crossErrors = crossEntryErrors(data);
  return { valid: crossErrors.length === 0, errors: crossErrors };
}

function formatErrors(errors) {
  return errors.map(e => `${e.code} ${e.path}: ${e.message}`).join('\n');
}

function loadRegistry(registryPath = DEFAULT_REGISTRY_PATH) {
  const data = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const result = validateRegistry(data);
  if (!result.valid) {
    throw new Error(`Invalid knowledge-source registry ${registryPath}:\n${formatErrors(result.errors)}`);
  }
  return data;
}

class RoutingError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

/**
 * Where a piece of information of `informationType` belongs.
 * Pass `{ containsTenantData: true }` for anything that came from a customer;
 * the router refuses rather than falling back to another store.
 */
function routeInformationType(registry, informationType, { containsTenantData = false } = {}) {
  const owner = registry.sources.find(
    source => source.lifecycle !== 'deprecated' && source.informationTypes.includes(informationType)
  );
  if (!owner) throw new RoutingError('UNKNOWN_TYPE', `no source owns information type '${informationType}'`);
  if (containsTenantData && owner.tenantData !== 'required') {
    throw new RoutingError(
      'TENANT_BOUNDARY',
      `'${informationType}' routes to '${owner.id}', which must not hold tenant data; store it in a tenant-scoped platform source instead`
    );
  }
  return owner;
}

module.exports = {
  DEFAULT_REGISTRY_PATH,
  SCHEMA_PATH,
  TENANT_FORBIDDEN_STORE_KINDS,
  RoutingError,
  validateRegistry,
  formatErrors,
  loadRegistry,
  routeInformationType,
};
