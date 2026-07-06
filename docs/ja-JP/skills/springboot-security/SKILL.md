---
name: springboot-security
description: Spring Security best practices for authn/authz, validation, CSRF, secrets, headers, rate limiting, and dependency security in Java Spring Boot services.
---

# Spring Boot Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’Â¬Ã£Æ’â€œÃ£Æ’Â¥Ã£Æ’Â¼

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


Ã¨ÂªÂÃ¨Â¨Â¼Ã£ÂÂ®Ã¨Â¿Â½Ã¥Å Â Ã£â‚¬ÂÃ¥â€¦Â¥Ã¥Å â€ºÃ¥â€¡Â¦Ã§Ââ€ Ã£â‚¬ÂÃ£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â½Å“Ã¦Ë†ÂÃ£â‚¬ÂÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã¥â€¡Â¦Ã§Ââ€ Ã¦â„¢â€šÃ£ÂÂ«Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š

## Ã¨ÂªÂÃ¨Â¨Â¼

- Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’Ë†Ã£Æ’Â¬Ã£â€šÂ¹JWTÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã¥Â¤Â±Ã¥Å Â¹Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã¤Â»ËœÃ£ÂÂÃ¤Â¸ÂÃ©â‚¬ÂÃ¦ËœÅ½Ã£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë†
- Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ«Ã£ÂÂ¯ `httpOnly`Ã£â‚¬Â`Secure`Ã£â‚¬Â`SameSite=Strict` Ã£â€šÂ¯Ã£Æ’Æ’Ã£â€šÂ­Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- `OncePerRequestFilter` Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£Æ’ÂªÃ£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂµÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼Ã£ÂÂ§Ã£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼

```java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
  private final JwtService jwtService;

  public JwtAuthFilter(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain) throws ServletException, IOException {
    String header = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7);
      Authentication auth = jwtService.authenticate(token);
      SecurityContextHolder.getContext().setAuthentication(auth);
    }
    chain.doFilter(request, response);
  }
}
```

## Ã¨ÂªÂÃ¥ÂÂ¯

- Ã£Æ’Â¡Ã£â€šÂ½Ã£Æ’Æ’Ã£Æ’â€°Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šâ€™Ã¦Å“â€°Ã¥Å Â¹Ã¥Å’â€“: `@EnableMethodSecurity`
- `@PreAuthorize("hasRole('ADMIN')")` Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯ `@PreAuthorize("@authz.canEdit(#id)")` Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£ÂÂ§Ã¦â€¹â€™Ã¥ÂÂ¦Ã£Ââ€”Ã£â‚¬ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂªÃ£â€šÂ¹Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€”Ã£ÂÂ®Ã£ÂÂ¿Ã¥â€¦Â¬Ã©â€“â€¹

## Ã¥â€¦Â¥Ã¥Å â€ºÃ¦Â¤Å“Ã¨Â¨Â¼

- `@Valid` Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£ÂÂ¦Ã£â€šÂ³Ã£Æ’Â³Ã£Æ’Ë†Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â©Ã£Æ’Â¼Ã£ÂÂ§Bean ValidationÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- DTOÃ£ÂÂ«Ã¥Ë†Â¶Ã§Â´â€žÃ£â€šâ€™Ã©ÂÂ©Ã§â€Â¨: `@NotBlank`Ã£â‚¬Â`@Email`Ã£â‚¬Â`@Size`Ã£â‚¬ÂÃ£â€šÂ«Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â Ã£Æ’ÂÃ£Æ’ÂªÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£Æ’Â¼
- Ã£Æ’Â¬Ã£Æ’Â³Ã£Æ’â‚¬Ã£Æ’ÂªÃ£Æ’Â³Ã£â€šÂ°Ã¥â€°ÂÃ£ÂÂ«Ã£Æ’â€ºÃ£Æ’Â¯Ã£â€šÂ¤Ã£Æ’Ë†Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂ§HTMLÃ£â€šâ€™Ã£â€šÂµÃ£Æ’â€¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£â€šÂº

## SQLÃ£â€šÂ¤Ã£Æ’Â³Ã£â€šÂ¸Ã£â€šÂ§Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã©ËœÂ²Ã¦Â­Â¢

- Spring DataÃ£Æ’ÂªÃ£Æ’ÂÃ£â€šÂ¸Ã£Æ’Ë†Ã£Æ’ÂªÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£Æ’â€˜Ã£Æ’Â©Ã£Æ’Â¡Ã£Æ’Â¼Ã£â€šÂ¿Ã¥Å’â€“Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’â€ Ã£â€šÂ£Ã£Æ’â€“Ã£â€šÂ¯Ã£â€šÂ¨Ã£Æ’ÂªÃ£ÂÂ«Ã£ÂÂ¯ `:param` Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’â€¡Ã£â€šÂ£Ã£Æ’Â³Ã£â€šÂ°Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ€”Ã£â‚¬ÂÃ¦â€“â€¡Ã¥Â­â€”Ã¥Ë†â€”Ã£â€šâ€™Ã©â‚¬Â£Ã§ÂµÂÃ£Ââ€”Ã£ÂÂªÃ£Ââ€ž

## CSRFÃ¤Â¿ÂÃ¨Â­Â·

- Ã£Æ’â€“Ã£Æ’Â©Ã£â€šÂ¦Ã£â€šÂ¶Ã£â€šÂ»Ã£Æ’Æ’Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯CSRFÃ£â€šâ€™Ã¦Å“â€°Ã¥Å Â¹Ã£ÂÂ«Ã£Ââ€”Ã£â‚¬ÂÃ£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Â /Ã£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼Ã£ÂÂ«Ã£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£â€šâ€¹
- BearerÃ£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨Ã£Ââ„¢Ã£â€šâ€¹Ã§Â´â€Ã§Â²â€¹Ã£ÂÂªAPIÃ£ÂÂ®Ã¥Â Â´Ã¥ÂË†Ã£ÂÂ¯Ã£â‚¬ÂCSRFÃ£â€šâ€™Ã§â€žÂ¡Ã¥Å Â¹Ã£ÂÂ«Ã£Ââ€”Ã£ÂÂ¦Ã£â€šÂ¹Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’Ë†Ã£Æ’Â¬Ã£â€šÂ¹Ã¨ÂªÂÃ¨Â¨Â¼Ã£ÂÂ«Ã¤Â¾ÂÃ¥Â­Ëœ

```java
http
  .csrf(csrf -> csrf.disable())
  .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
```

## Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã§Â®Â¡Ã§Ââ€ 

- Ã£â€šÂ½Ã£Æ’Â¼Ã£â€šÂ¹Ã£â€šÂ³Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÂ«Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£â€šâ€™Ã¥ÂÂ«Ã£â€šÂÃ£ÂÂªÃ£Ââ€žÃ£â‚¬â€šÃ§â€™Â°Ã¥Â¢Æ’Ã¥Â¤â€°Ã¦â€¢Â°Ã£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯vaultÃ£Ââ€¹Ã£â€šâ€°Ã¨ÂªÂ­Ã£ÂÂ¿Ã¨Â¾Â¼Ã£â€šâ‚¬
- `application.yml` Ã£â€šâ€™Ã¨ÂªÂÃ¨Â¨Â¼Ã¦Æ’â€¦Ã¥Â Â±Ã£Ââ€¹Ã£â€šâ€°Ã¨Â§Â£Ã¦â€Â¾Ã£Ââ€”Ã£â‚¬ÂÃ£Æ’â€”Ã£Æ’Â¬Ã£Æ’Â¼Ã£â€šÂ¹Ã£Æ’â€ºÃ£Æ’Â«Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨
- Ã£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã£ÂÂ¨DBÃ¨ÂªÂÃ¨Â¨Â¼Ã¦Æ’â€¦Ã¥Â Â±Ã£â€šâ€™Ã¥Â®Å¡Ã¦Å“Å¸Ã§Å¡â€žÃ£ÂÂ«Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€ Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³

## Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼

```java
http
  .headers(headers -> headers
    .contentSecurityPolicy(csp -> csp
      .policyDirectives("default-src 'self'"))
    .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
    .xssProtection(Customizer.withDefaults())
    .referrerPolicy(rp -> rp.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.NO_REFERRER)));
```

## Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†Â¶Ã©â„¢Â

- Ã©Â«ËœÃ£â€šÂ³Ã£â€šÂ¹Ã£Æ’Ë†Ã£ÂÂªÃ£â€šÂ¨Ã£Æ’Â³Ã£Æ’â€°Ã£Æ’ÂÃ£â€šÂ¤Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Bucket4jÃ£ÂÂ¾Ã£ÂÅ¸Ã£ÂÂ¯Ã£â€šÂ²Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ¦Ã£â€šÂ§Ã£â€šÂ¤Ã£Æ’Â¬Ã£Æ’â„¢Ã£Æ’Â«Ã£ÂÂ®Ã¥Ë†Â¶Ã©â„¢ÂÃ£â€šâ€™Ã©ÂÂ©Ã§â€Â¨
- Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¹Ã£Æ’Ë†Ã£â€šâ€™Ã£Æ’Â­Ã£â€šÂ°Ã£ÂÂ«Ã¨Â¨ËœÃ©Å’Â²Ã£Ââ€”Ã£ÂÂ¦Ã£â€šÂ¢Ã£Æ’Â©Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šâ€™Ã©â‚¬ÂÃ¤Â¿Â¡Ã£Ââ€”Ã£â‚¬ÂÃ£Æ’ÂªÃ£Æ’Ë†Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€™Ã£Æ’Â³Ã£Æ’Ë†Ã¤Â»ËœÃ£ÂÂÃ£ÂÂ§429Ã£â€šâ€™Ã¨Â¿â€Ã£Ââ„¢

## Ã¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£ÂÂ®Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£

- CIÃ£ÂÂ§OWASP Dependency Check / SnykÃ£â€šâ€™Ã¥Â®Å¸Ã¨Â¡Å’
- Spring BootÃ£ÂÂ¨Spring SecurityÃ£â€šâ€™Ã£â€šÂµÃ£Æ’ÂÃ£Æ’Â¼Ã£Æ’Ë†Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹Ã£Æ’ÂÃ£Æ’Â¼Ã£â€šÂ¸Ã£Æ’Â§Ã£Æ’Â³Ã£ÂÂ«Ã¤Â¿ÂÃ£ÂÂ¤
- Ã¦â€”Â¢Ã§Å¸Â¥Ã£ÂÂ®CVEÃ£ÂÂ§Ã£Æ’â€œÃ£Æ’Â«Ã£Æ’â€°Ã£â€šâ€™Ã¥Â¤Â±Ã¦â€¢â€”Ã£Ââ€¢Ã£Ââ€ºÃ£â€šâ€¹

## Ã£Æ’Â­Ã£â€šÂ®Ã£Æ’Â³Ã£â€šÂ°Ã£ÂÂ¨PII

- Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£â‚¬ÂÃ£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã£â‚¬ÂÃ£Æ’â€˜Ã£â€šÂ¹Ã£Æ’Â¯Ã£Æ’Â¼Ã£Æ’â€°Ã£â‚¬ÂÃ¥Â®Å’Ã¥â€¦Â¨Ã£ÂÂªPANÃ£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šâ€™Ã£Æ’Â­Ã£â€šÂ°Ã£ÂÂ«Ã¨Â¨ËœÃ©Å’Â²Ã£Ââ€”Ã£ÂÂªÃ£Ââ€ž
- Ã¦Â©Å¸Ã¥Â¯â€ Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«Ã£Æ’â€°Ã£â€šâ€™Ã§Â·Â¨Ã©â€ºâ€ Ã£Ââ€”Ã£â‚¬ÂÃ¦Â§â€¹Ã©â‚¬Â Ã¥Å’â€“JSONÃ£Æ’Â­Ã£â€šÂ®Ã£Æ’Â³Ã£â€šÂ°Ã£â€šâ€™Ã¤Â½Â¿Ã§â€Â¨

## Ã£Æ’â€¢Ã£â€šÂ¡Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’â€°

- Ã£â€šÂµÃ£â€šÂ¤Ã£â€šÂºÃ£â‚¬ÂÃ£â€šÂ³Ã£Æ’Â³Ã£Æ’â€ Ã£Æ’Â³Ã£Æ’â€žÃ£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”Ã£â‚¬ÂÃ¦â€¹Â¡Ã¥Â¼ÂµÃ¥Â­ÂÃ£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼
- WebÃ£Æ’Â«Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Â¤â€“Ã£ÂÂ«Ã¤Â¿ÂÃ¥Â­ËœÃ£Ââ€”Ã£â‚¬ÂÃ¥Â¿â€¦Ã¨Â¦ÂÃ£ÂÂ«Ã¥Â¿Å“Ã£ÂËœÃ£ÂÂ¦Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³

## Ã£Æ’ÂªÃ£Æ’ÂªÃ£Æ’Â¼Ã£â€šÂ¹Ã¥â€°ÂÃ£Æ’ÂÃ£â€šÂ§Ã£Æ’Æ’Ã£â€šÂ¯Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†

- [ ] Ã¨ÂªÂÃ¨Â¨Â¼Ã£Æ’Ë†Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â³Ã£ÂÅ’Ã¦Â­Â£Ã£Ââ€”Ã£ÂÂÃ¦Â¤Å“Ã¨Â¨Â¼Ã£Ââ€¢Ã£â€šÅ’Ã£â‚¬ÂÃ¦Å“Å¸Ã©â„¢ÂÃ¥Ë†â€¡Ã£â€šÅ’Ã£ÂÂ«Ã£ÂÂªÃ£ÂÂ£Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹
- [ ] Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¦Â©Å¸Ã¥Â¯â€ Ã£Æ’â€˜Ã£â€šÂ¹Ã£ÂÂ«Ã¨ÂªÂÃ¥ÂÂ¯Ã£â€šÂ¬Ã£Æ’Â¼Ã£Æ’â€°Ã£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹
- [ ] Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦Ã£ÂÂ®Ã¥â€¦Â¥Ã¥Å â€ºÃ£ÂÅ’Ã¦Â¤Å“Ã¨Â¨Â¼Ã£ÂÅ Ã£â€šË†Ã£ÂÂ³Ã£â€šÂµÃ£Æ’â€¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£â€šÂºÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹
- [ ] Ã¦â€“â€¡Ã¥Â­â€”Ã¥Ë†â€”Ã©â‚¬Â£Ã§ÂµÂÃ£Ââ€¢Ã£â€šÅ’Ã£ÂÅ¸SQLÃ£ÂÅ’Ã£ÂÂªÃ£Ââ€ž
- [ ] Ã£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šÂ±Ã£Æ’Â¼Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’â€”Ã£ÂÂ«Ã¥Â¯Â¾Ã£Ââ€”Ã£ÂÂ¦CSRFÃ¥Â¯Â¾Ã§Â­â€“Ã£ÂÅ’Ã¦Â­Â£Ã£Ââ€”Ã£Ââ€ž
- [ ] Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¬Ã£Æ’Æ’Ã£Æ’Ë†Ã£ÂÅ’Ã¥Â¤â€“Ã©Æ’Â¨Ã¥Å’â€“Ã£Ââ€¢Ã£â€šÅ’Ã£â‚¬ÂÃ£â€šÂ³Ã£Æ’Å¸Ã£Æ’Æ’Ã£Æ’Ë†Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£ÂÂªÃ£Ââ€ž
- [ ] Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£Æ’ËœÃ£Æ’Æ’Ã£Æ’â‚¬Ã£Æ’Â¼Ã£ÂÅ’Ã¨Â¨Â­Ã¥Â®Å¡Ã£Ââ€¢Ã£â€šÅ’Ã£ÂÂ¦Ã£Ââ€žÃ£â€šâ€¹
- [ ] APIÃ£ÂÂ«Ã£Æ’Â¬Ã£Æ’Â¼Ã£Æ’Ë†Ã¥Ë†Â¶Ã©â„¢ÂÃ£ÂÅ’Ã£Ââ€šÃ£â€šâ€¹
- [ ] Ã¤Â¾ÂÃ¥Â­ËœÃ©â€“Â¢Ã¤Â¿â€šÃ£ÂÅ’Ã£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â£Ã£Æ’Â³Ã£Ââ€¢Ã£â€šÅ’Ã£â‚¬ÂÃ¦Å“â‚¬Ã¦â€“Â°Ã£ÂÂ§Ã£Ââ€šÃ£â€šâ€¹
- [ ] Ã£Æ’Â­Ã£â€šÂ°Ã£ÂÂ«Ã¦Â©Å¸Ã¥Â¯â€ Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£ÂÅ’Ã£ÂÂªÃ£Ââ€ž

**Ã¦Â³Â¨Ã¦â€žÂ**: Ã£Æ’â€¡Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â«Ã£Æ’Ë†Ã£ÂÂ§Ã¦â€¹â€™Ã¥ÂÂ¦Ã£Ââ€”Ã£â‚¬ÂÃ¥â€¦Â¥Ã¥Å â€ºÃ£â€šâ€™Ã¦Â¤Å“Ã¨Â¨Â¼Ã£Ââ€”Ã£â‚¬ÂÃ¦Å“â‚¬Ã¥Â°ÂÃ¦Â¨Â©Ã©â„¢ÂÃ£â€šâ€™Ã©ÂÂ©Ã§â€Â¨Ã£Ââ€”Ã£â‚¬ÂÃ¨Â¨Â­Ã¥Â®Å¡Ã£ÂÂ«Ã£â€šË†Ã£â€šâ€¹Ã£â€šÂ»Ã£â€šÂ­Ã£Æ’Â¥Ã£Æ’ÂªÃ£Æ’â€ Ã£â€šÂ£Ã£â€šâ€™Ã¥â€žÂªÃ¥â€¦Ë†Ã£Ââ€”Ã£ÂÂ¾Ã£Ââ„¢Ã£â‚¬â€š
