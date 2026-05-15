# Security Checklist

- [ ] Auth required where appropriate.
- [ ] Tenant/user isolation enforced.
- [ ] Secrets not committed or logged.
- [ ] File uploads validate type, size, path, and storage behavior.
- [ ] Webhooks verify HMAC/signature when applicable.
- [ ] API keys loaded from environment only.
- [ ] External calls are approved, bounded, and feature-gated.
- [ ] Destructive actions avoided or explicitly approved with exact target.
- [ ] Rate limits considered for public or proxy routes.
