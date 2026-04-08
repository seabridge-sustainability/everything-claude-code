| name | description |
|------|-------------|
| cloud-infrastructure-security | Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã­â€Å’Ã«Å¾Â«Ã­ÂÂ¼ Ã«Â°Â°Ã­ÂÂ¬, Ã¬ÂÂ¸Ã­â€â€žÃ«ÂÂ¼ ÃªÂµÂ¬Ã¬â€žÂ±, IAM Ã¬Â â€¢Ã¬Â±â€¦ ÃªÂ´â‚¬Ã«Â¦Â¬, Ã«Â¡Å“ÃªÂ¹â€¦/Ã«ÂªÂ¨Ã«â€¹Ë†Ã­â€žÂ°Ã«Â§Â Ã¬â€žÂ¤Ã¬Â â€¢, CI/CD Ã­Å’Å’Ã¬ÂÂ´Ã­â€â€žÃ«ÂÂ¼Ã¬ÂÂ¸ ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬â€¹Å“ Ã¬ÂÂ´ Ã¬Å Â¤Ã­â€šÂ¬Ã¬Ââ€ž Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€. Ã«ÂªÂ¨Ã«Â²â€ Ã¬â€šÂ¬Ã«Â¡â‚¬Ã¬â€”Â Ã«Â§Å¾Ã¬Â¶Ëœ Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã«Â³Â´Ã¬â€¢Ë† Ã¬Â²Â´Ã­ÂÂ¬Ã«Â¦Â¬Ã¬Å Â¤Ã­Å Â¸Ã«Â¥Â¼ Ã¬Â Å“ÃªÂ³ÂµÃ­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤. |

# Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã«Â°Â Ã¬ÂÂ¸Ã­â€â€žÃ«ÂÂ¼ Ã«Â³Â´Ã¬â€¢Ë† Ã¬Å Â¤Ã­â€šÂ¬

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¬ÂÂ´ Ã¬Å Â¤Ã­â€šÂ¬Ã¬Ââ‚¬ Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã¬ÂÂ¸Ã­â€â€žÃ«ÂÂ¼, CI/CD Ã­Å’Å’Ã¬ÂÂ´Ã­â€â€žÃ«ÂÂ¼Ã¬ÂÂ¸, Ã«Â°Â°Ã­ÂÂ¬ ÃªÂµÂ¬Ã¬â€žÂ±Ã¬ÂÂ´ Ã«Â³Â´Ã¬â€¢Ë† Ã«ÂªÂ¨Ã«Â²â€ Ã¬â€šÂ¬Ã«Â¡â‚¬Ã«Â¥Â¼ Ã«â€Â°Ã«Â¥Â´ÃªÂ³Â  Ã¬â€”â€¦ÃªÂ³â€ž Ã­â€˜Å“Ã¬Â¤â‚¬Ã¬Ââ€ž Ã¬Â¤â‚¬Ã¬Ë†ËœÃ­â€¢ËœÃ«Ââ€žÃ«Â¡Â Ã«Â³Â´Ã¬Å¾Â¥Ã­â€¢Â©Ã«â€¹Ë†Ã«â€¹Â¤.

## Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€ Ã¬â€¹Å“Ã¬Â Â

- Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã­â€Å’Ã«Å¾Â«Ã­ÂÂ¼(AWS, Vercel, Railway, Cloudflare)Ã¬â€”Â Ã¬â€¢Â Ã­â€Å’Ã«Â¦Â¬Ã¬Â¼â‚¬Ã¬ÂÂ´Ã¬â€¦Ëœ Ã«Â°Â°Ã­ÂÂ¬ Ã¬â€¹Å“
- IAM Ã¬â€”Â­Ã­â€¢Â  Ã«Â°Â ÃªÂ¶Å’Ã­â€¢Å“ ÃªÂµÂ¬Ã¬â€žÂ± Ã¬â€¹Å“
- CI/CD Ã­Å’Å’Ã¬ÂÂ´Ã­â€â€žÃ«ÂÂ¼Ã¬ÂÂ¸ Ã¬â€žÂ¤Ã¬Â â€¢ Ã¬â€¹Å“
- Infrastructure as Code(Terraform, CloudFormation) ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬â€¹Å“
- Ã«Â¡Å“ÃªÂ¹â€¦ Ã«Â°Â Ã«ÂªÂ¨Ã«â€¹Ë†Ã­â€žÂ°Ã«Â§Â ÃªÂµÂ¬Ã¬â€žÂ± Ã¬â€¹Å“
- Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã­â„¢ËœÃªÂ²Â½Ã¬â€”ÂÃ¬â€žÅ“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ ÃªÂ´â‚¬Ã«Â¦Â¬ Ã¬â€¹Å“
- CDN Ã«Â°Â Ã¬â€”Â£Ã¬Â§â‚¬ Ã«Â³Â´Ã¬â€¢Ë† Ã¬â€žÂ¤Ã¬Â â€¢ Ã¬â€¹Å“
- Ã¬Å¾Â¬Ã­â€¢Â´ Ã«Â³ÂµÃªÂµÂ¬ Ã«Â°Â Ã«Â°Â±Ã¬â€”â€¦ Ã¬Â â€žÃ«Å¾Âµ ÃªÂµÂ¬Ã­Ëœâ€ž Ã¬â€¹Å“

## Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã«Â³Â´Ã¬â€¢Ë† Ã¬Â²Â´Ã­ÂÂ¬Ã«Â¦Â¬Ã¬Å Â¤Ã­Å Â¸

### 1. IAM Ã«Â°Â Ã¬Â â€˜ÃªÂ·Â¼ Ã¬Â Å“Ã¬â€“Â´

#### Ã¬ÂµÅ“Ã¬â€ Å’ ÃªÂ¶Å’Ã­â€¢Å“ Ã¬â€ºÂÃ¬Â¹â„¢

```yaml
# PASS: CORRECT: Minimal permissions
iam_role:
  permissions:
    - s3:GetObject  # Only read access
    - s3:ListBucket
  resources:
    - arn:aws:s3:::my-bucket/*  # Specific bucket only

# FAIL: WRONG: Overly broad permissions
iam_role:
  permissions:
    - s3:*  # All S3 actions
  resources:
    - "*"  # All resources
```

#### Ã«â€¹Â¤Ã¬Â¤â€˜ Ã¬ÂÂ¸Ã¬Â¦Â (MFA)

```bash
# ALWAYS enable MFA for root/admin accounts
aws iam enable-mfa-device \
  --user-name admin \
  --serial-number arn:aws:iam::123456789:mfa/admin \
  --authentication-code1 123456 \
  --authentication-code2 789012
```

#### Ã­â„¢â€¢Ã¬ÂÂ¸ Ã«â€¹Â¨ÃªÂ³â€ž

- [ ] Ã­â€â€žÃ«Â¡Å“Ã«Ââ€¢Ã¬â€¦ËœÃ¬â€”ÂÃ¬â€žÅ“ Ã«Â£Â¨Ã­Å Â¸ ÃªÂ³â€žÃ¬Â â€¢ Ã¬â€šÂ¬Ã¬Å¡Â© Ã¬â€”â€ Ã¬ÂÅ’
- [ ] Ã«ÂªÂ¨Ã«â€œÂ  ÃªÂ¶Å’Ã­â€¢Å“ Ã¬Å¾Ë†Ã«Å â€ ÃªÂ³â€žÃ¬Â â€¢Ã¬â€”Â MFA Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨
- [ ] Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤ ÃªÂ³â€žÃ¬Â â€¢Ã¬ÂÂ´ Ã¬Å¾Â¥ÃªÂ¸Â° Ã¬Å¾ÂÃªÂ²Â© Ã¬Â¦ÂÃ«Âªâ€¦Ã¬ÂÂ´ Ã¬â€¢â€žÃ«â€¹Å’ Ã¬â€”Â­Ã­â€¢Â Ã¬Ââ€ž Ã¬â€šÂ¬Ã¬Å¡Â©
- [ ] IAM Ã¬Â â€¢Ã¬Â±â€¦Ã¬ÂÂ´ Ã¬ÂµÅ“Ã¬â€ Å’ ÃªÂ¶Å’Ã­â€¢Å“Ã¬Ââ€ž Ã«â€Â°Ã«Â¦â€ž
- [ ] Ã¬Â â€¢ÃªÂ¸Â°Ã¬Â ÂÃ¬ÂÂ¸ Ã¬Â â€˜ÃªÂ·Â¼ ÃªÂ²â‚¬Ã­â€ Â  Ã¬Ë†ËœÃ­â€“â€°
- [ ] Ã¬â€šÂ¬Ã¬Å¡Â©Ã­â€¢ËœÃ¬Â§â‚¬ Ã¬â€¢Å Ã«Å â€ Ã¬Å¾ÂÃªÂ²Â© Ã¬Â¦ÂÃ«Âªâ€¦ ÃªÂµÂÃ¬Â²Â´ Ã«ËœÂÃ«Å â€ Ã¬Â Å“ÃªÂ±Â°

### 2. Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ ÃªÂ´â‚¬Ã«Â¦Â¬

#### Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬

```typescript
// PASS: CORRECT: Use cloud secrets manager
import { SecretsManager } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManager({ region: 'us-east-1' });
const secret = await client.getSecretValue({ SecretId: 'prod/api-key' });
const apiKey = JSON.parse(secret.SecretString).key;

// FAIL: WRONG: Hardcoded or in environment variables only
const apiKey = process.env.API_KEY; // Not rotated, not audited
```

#### Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ ÃªÂµÂÃ¬Â²Â´

```bash
# Set up automatic rotation for database credentials
aws secretsmanager rotate-secret \
  --secret-id prod/db-password \
  --rotation-lambda-arn arn:aws:lambda:region:account:function:rotate \
  --rotation-rules AutomaticallyAfterDays=30
```

#### Ã­â„¢â€¢Ã¬ÂÂ¸ Ã«â€¹Â¨ÃªÂ³â€ž

- [ ] Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿Ã¬ÂÂ´ Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬Ã¬â€”Â Ã¬Â â‚¬Ã¬Å¾Â¥Ã«ÂÂ¨ (AWS Secrets Manager, Vercel Secrets)
- [ ] Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬Å¾ÂÃªÂ²Â© Ã¬Â¦ÂÃ«Âªâ€¦Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã¬Å¾ÂÃ«Ââ„¢ ÃªÂµÂÃ¬Â²Â´ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨
- [ ] API Ã­â€šÂ¤ÃªÂ°â‚¬ Ã¬ÂµÅ“Ã¬â€ Å’ Ã«Â¶â€žÃªÂ¸Â°Ã«Â³â€žÃ«Â¡Å“ ÃªÂµÂÃ¬Â²Â´Ã«ÂÂ¨
- [ ] Ã¬Â½â€Ã«â€œÅ“, Ã«Â¡Å“ÃªÂ·Â¸, Ã¬â€”ÂÃ«Å¸Â¬ Ã«Â©â€Ã¬â€¹Å“Ã¬Â§â‚¬Ã¬â€”Â Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã¬â€”â€ Ã¬ÂÅ’
- [ ] Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã¬Â â€˜ÃªÂ·Â¼Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ ÃªÂ°ÂÃ¬â€šÂ¬ Ã«Â¡Å“ÃªÂ¹â€¦ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨

### 3. Ã«â€žÂ¤Ã­Å Â¸Ã¬â€ºÅ’Ã­ÂÂ¬ Ã«Â³Â´Ã¬â€¢Ë†

#### VPC Ã«Â°Â Ã«Â°Â©Ã­â„¢â€Ã«Â²Â½ ÃªÂµÂ¬Ã¬â€žÂ±

```terraform
# PASS: CORRECT: Restricted security group
resource "aws_security_group" "app" {
  name = "app-sg"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]  # Internal VPC only
  }

  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Only HTTPS outbound
  }
}

# FAIL: WRONG: Open to the internet
resource "aws_security_group" "bad" {
  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # All ports, all IPs!
  }
}
```

#### Ã­â„¢â€¢Ã¬ÂÂ¸ Ã«â€¹Â¨ÃªÂ³â€ž

- [ ] Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ÃªÂ°â‚¬ ÃªÂ³ÂµÃªÂ°Å“Ã¬Â ÂÃ¬Å“Â¼Ã«Â¡Å“ Ã¬Â â€˜ÃªÂ·Â¼ Ã«Â¶Ë†ÃªÂ°â‚¬
- [ ] SSH/RDP Ã­ÂÂ¬Ã­Å Â¸ÃªÂ°â‚¬ VPN/Ã«Â°Â°Ã¬Å Â¤Ã¬Â²Å“Ã¬â€”ÂÃ«Â§Å’ Ã¬Â Å“Ã­â€¢Å“Ã«ÂÂ¨
- [ ] Ã«Â³Â´Ã¬â€¢Ë† ÃªÂ·Â¸Ã«Â£Â¹Ã¬ÂÂ´ Ã¬ÂµÅ“Ã¬â€ Å’ ÃªÂ¶Å’Ã­â€¢Å“Ã¬Ââ€ž Ã«â€Â°Ã«Â¦â€ž
- [ ] Ã«â€žÂ¤Ã­Å Â¸Ã¬â€ºÅ’Ã­ÂÂ¬ ACLÃ¬ÂÂ´ ÃªÂµÂ¬Ã¬â€žÂ±Ã«ÂÂ¨
- [ ] VPC Ã­â€Å’Ã«Â¡Å“Ã¬Å¡Â° Ã«Â¡Å“ÃªÂ·Â¸ÃªÂ°â‚¬ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨

### 4. Ã«Â¡Å“ÃªÂ¹â€¦ Ã«Â°Â Ã«ÂªÂ¨Ã«â€¹Ë†Ã­â€žÂ°Ã«Â§Â

#### CloudWatch/Ã«Â¡Å“ÃªÂ¹â€¦ ÃªÂµÂ¬Ã¬â€žÂ±

```typescript
// PASS: CORRECT: Comprehensive logging
import { CloudWatchLogsClient, CreateLogStreamCommand } from '@aws-sdk/client-cloudwatch-logs';

const logSecurityEvent = async (event: SecurityEvent) => {
  await cloudwatch.putLogEvents({
    logGroupName: '/aws/security/events',
    logStreamName: 'authentication',
    logEvents: [{
      timestamp: Date.now(),
      message: JSON.stringify({
        type: event.type,
        userId: event.userId,
        ip: event.ip,
        result: event.result,
        // Never log sensitive data
      })
    }]
  });
};
```

#### Ã­â„¢â€¢Ã¬ÂÂ¸ Ã«â€¹Â¨ÃªÂ³â€ž

- [ ] Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€žÅ“Ã«Â¹â€žÃ¬Å Â¤Ã¬â€”Â CloudWatch/Ã«Â¡Å“ÃªÂ¹â€¦ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨
- [ ] Ã¬â€¹Â¤Ã­Å’Â¨Ã­â€¢Å“ Ã¬ÂÂ¸Ã¬Â¦Â Ã¬â€¹Å“Ã«Ââ€žÃªÂ°â‚¬ Ã«Â¡Å“ÃªÂ¹â€¦Ã«ÂÂ¨
- [ ] ÃªÂ´â‚¬Ã«Â¦Â¬Ã¬Å¾Â Ã¬Å¾â€˜Ã¬â€”â€¦Ã¬ÂÂ´ ÃªÂ°ÂÃ¬â€šÂ¬Ã«ÂÂ¨
- [ ] Ã«Â¡Å“ÃªÂ·Â¸ Ã«Â³Â´Ã¬Â¡Â´ ÃªÂ¸Â°ÃªÂ°â€žÃ¬ÂÂ´ ÃªÂµÂ¬Ã¬â€žÂ±Ã«ÂÂ¨ (ÃªÂ·Å“Ã¬Â â€¢ Ã¬Â¤â‚¬Ã¬Ë†ËœÃ«Â¥Â¼ Ã¬Å“â€žÃ­â€¢Â´ 90Ã¬ÂÂ¼ Ã¬ÂÂ´Ã¬Æ’Â)
- [ ] Ã¬ÂËœÃ¬â€¹Â¬Ã¬Å Â¤Ã«Å¸Â¬Ã¬Å¡Â´ Ã­â„¢Å“Ã«Ââ„¢Ã¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã¬â€¢Å’Ã«Â¦Â¼ ÃªÂµÂ¬Ã¬â€žÂ±Ã«ÂÂ¨
- [ ] Ã«Â¡Å“ÃªÂ·Â¸ÃªÂ°â‚¬ Ã¬Â¤â€˜Ã¬â€¢â„¢ Ã¬Â§â€˜Ã¬Â¤â€˜Ã­â„¢â€Ã«ÂËœÃªÂ³Â  Ã«Â³â‚¬Ã¬Â¡Â° Ã«Â°Â©Ã¬Â§â‚¬Ã«ÂÂ¨

### 5. CI/CD Ã­Å’Å’Ã¬ÂÂ´Ã­â€â€žÃ«ÂÂ¼Ã¬ÂÂ¸ Ã«Â³Â´Ã¬â€¢Ë†

#### Ã«Â³Â´Ã¬â€¢Ë† Ã­Å’Å’Ã¬ÂÂ´Ã­â€â€žÃ«ÂÂ¼Ã¬ÂÂ¸ ÃªÂµÂ¬Ã¬â€žÂ±

```yaml
# PASS: CORRECT: Secure GitHub Actions workflow
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read  # Minimal permissions

    steps:
      - uses: actions/checkout@v4

      # Scan for secrets
      - name: Secret scanning
        uses: trufflesecurity/trufflehog@6c05c4a00b91aa542267d8e32a8254774799d68d

      # Dependency audit
      - name: Audit dependencies
        run: npm audit --audit-level=high

      # Use OIDC, not long-lived tokens
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole
          aws-region: us-east-1
```

#### ÃªÂ³ÂµÃªÂ¸â€°Ã«Â§Â Ã«Â³Â´Ã¬â€¢Ë†

```json
// package.json - Use lock files and integrity checks
{
  "scripts": {
    "deps:install": "npm ci",  // Use ci for reproducible builds
    "audit": "npm audit --audit-level=moderate",
    "check": "npm outdated"
  }
}
```

#### Ã­â„¢â€¢Ã¬ÂÂ¸ Ã«â€¹Â¨ÃªÂ³â€ž

- [ ] Ã¬Å¾Â¥ÃªÂ¸Â° Ã¬Å¾ÂÃªÂ²Â© Ã¬Â¦ÂÃ«Âªâ€¦ Ã«Å’â‚¬Ã¬â€¹Â  OIDC Ã¬â€šÂ¬Ã¬Å¡Â©
- [ ] Ã­Å’Å’Ã¬ÂÂ´Ã­â€â€žÃ«ÂÂ¼Ã¬ÂÂ¸Ã¬â€”ÂÃ¬â€žÅ“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã¬Å Â¤Ã¬ÂºÂÃ«â€¹Â
- [ ] Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ± Ã¬Â·Â¨Ã¬â€¢Â½Ã¬Â Â Ã¬Å Â¤Ã¬ÂºÂÃ«â€¹Â
- [ ] Ã¬Â»Â¨Ã­â€¦Å’Ã¬ÂÂ´Ã«â€žË† Ã¬ÂÂ´Ã«Â¯Â¸Ã¬Â§â‚¬ Ã¬Å Â¤Ã¬ÂºÂÃ«â€¹Â (Ã­â€¢Â´Ã«â€¹Â¹Ã­â€¢ËœÃ«Å â€ ÃªÂ²Â½Ã¬Å¡Â°)
- [ ] Ã«Â¸Å’Ã«Å¾Å“Ã¬Â¹Ëœ Ã«Â³Â´Ã­ËœÂ¸ ÃªÂ·Å“Ã¬Â¹â„¢ Ã¬Â ÂÃ¬Å¡Â©Ã«ÂÂ¨
- [ ] Ã«Â³â€˜Ã­â€¢Â© Ã¬Â â€ž Ã¬Â½â€Ã«â€œÅ“ Ã«Â¦Â¬Ã«Â·Â° Ã­â€¢â€žÃ¬Ë†Ëœ
- [ ] Ã¬â€žÅ“Ã«Âªâ€¦Ã«ÂÅ“ Ã¬Â»Â¤Ã«Â°â€¹ Ã¬Â ÂÃ¬Å¡Â©

### 6. Cloudflare Ã«Â°Â CDN Ã«Â³Â´Ã¬â€¢Ë†

#### Cloudflare Ã«Â³Â´Ã¬â€¢Ë† ÃªÂµÂ¬Ã¬â€žÂ±

```typescript
// PASS: CORRECT: Cloudflare Workers with security headers
export default {
  async fetch(request: Request): Promise<Response> {
    const response = await fetch(request);

    // Add security headers
    const headers = new Headers(response.headers);
    headers.set('X-Frame-Options', 'DENY');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'geolocation=(), microphone=()');

    return new Response(response.body, {
      status: response.status,
      headers
    });
  }
};
```

#### WAF ÃªÂ·Å“Ã¬Â¹â„¢

```bash
# Enable Cloudflare WAF managed rules
# - OWASP Core Ruleset
# - Cloudflare Managed Ruleset
# - Rate limiting rules
# - Bot protection
```

#### Ã­â„¢â€¢Ã¬ÂÂ¸ Ã«â€¹Â¨ÃªÂ³â€ž

- [ ] OWASP ÃªÂ·Å“Ã¬Â¹â„¢Ã¬Å“Â¼Ã«Â¡Å“ WAF Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨
- [ ] Ã¬â€ ÂÃ«Ââ€ž Ã¬Â Å“Ã­â€¢Å“ ÃªÂµÂ¬Ã¬â€žÂ±Ã«ÂÂ¨
- [ ] Ã«Â´â€¡ Ã«Â³Â´Ã­ËœÂ¸ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨
- [ ] DDoS Ã«Â³Â´Ã­ËœÂ¸ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨
- [ ] Ã«Â³Â´Ã¬â€¢Ë† Ã­â€”Â¤Ã«Ââ€ ÃªÂµÂ¬Ã¬â€žÂ±Ã«ÂÂ¨
- [ ] SSL/TLS Ã¬â€”â€žÃªÂ²Â© Ã«ÂªÂ¨Ã«â€œÅ“ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨

### 7. Ã«Â°Â±Ã¬â€”â€¦ Ã«Â°Â Ã¬Å¾Â¬Ã­â€¢Â´ Ã«Â³ÂµÃªÂµÂ¬

#### Ã¬Å¾ÂÃ«Ââ„¢ Ã«Â°Â±Ã¬â€”â€¦

```terraform
# PASS: CORRECT: Automated RDS backups
resource "aws_db_instance" "main" {
  allocated_storage     = 20
  engine               = "postgres"

  backup_retention_period = 30  # 30 days retention
  backup_window          = "03:00-04:00"
  maintenance_window     = "mon:04:00-mon:05:00"

  enabled_cloudwatch_logs_exports = ["postgresql"]

  deletion_protection = true  # Prevent accidental deletion
}
```

#### Ã­â„¢â€¢Ã¬ÂÂ¸ Ã«â€¹Â¨ÃªÂ³â€ž

- [ ] Ã¬Å¾ÂÃ«Ââ„¢ Ã¬ÂÂ¼Ã¬ÂÂ¼ Ã«Â°Â±Ã¬â€”â€¦ ÃªÂµÂ¬Ã¬â€žÂ±Ã«ÂÂ¨
- [ ] Ã«Â°Â±Ã¬â€”â€¦ Ã«Â³Â´Ã¬Â¡Â´ ÃªÂ¸Â°ÃªÂ°â€žÃ¬ÂÂ´ ÃªÂ·Å“Ã¬Â â€¢ Ã¬Â¤â‚¬Ã¬Ë†Ëœ Ã¬Å¡â€ÃªÂµÂ¬Ã¬â€šÂ¬Ã­â€¢Â­Ã¬Ââ€ž Ã¬Â¶Â©Ã¬Â¡Â±
- [ ] Ã­Å Â¹Ã¬Â â€¢ Ã¬â€¹Å“Ã¬Â Â Ã«Â³ÂµÃªÂµÂ¬ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨
- [ ] Ã«Â¶â€žÃªÂ¸Â°Ã«Â³â€ž Ã«Â°Â±Ã¬â€”â€¦ Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸ Ã¬Ë†ËœÃ­â€“â€°
- [ ] Ã¬Å¾Â¬Ã­â€¢Â´ Ã«Â³ÂµÃªÂµÂ¬ ÃªÂ³â€žÃ­Å¡Â Ã«Â¬Â¸Ã¬â€žÅ“Ã­â„¢â€Ã«ÂÂ¨
- [ ] RPO Ã«Â°Â RTOÃªÂ°â‚¬ Ã¬Â â€¢Ã¬ÂËœÃ«ÂËœÃªÂ³Â  Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«ÂÂ¨

## Ã«Â°Â°Ã­ÂÂ¬ Ã¬Â â€ž Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã«Â³Â´Ã¬â€¢Ë† Ã¬Â²Â´Ã­ÂÂ¬Ã«Â¦Â¬Ã¬Å Â¤Ã­Å Â¸

Ã«ÂªÂ¨Ã«â€œÂ  Ã­â€â€žÃ«Â¡Å“Ã«Ââ€¢Ã¬â€¦Ëœ Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã«Â°Â°Ã­ÂÂ¬ Ã¬Â â€ž:

- [ ] **IAM**: Ã«Â£Â¨Ã­Å Â¸ ÃªÂ³â€žÃ¬Â â€¢ Ã«Â¯Â¸Ã¬â€šÂ¬Ã¬Å¡Â©, MFA Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€, Ã¬ÂµÅ“Ã¬â€ Å’ ÃªÂ¶Å’Ã­â€¢Å“ Ã¬Â â€¢Ã¬Â±â€¦
- [ ] **Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿**: Ã«ÂªÂ¨Ã«â€œÂ  Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿Ã¬ÂÂ´ Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã«Â§Â¤Ã«â€¹Ë†Ã¬Â â‚¬Ã¬â€”Â ÃªÂµÂÃ¬Â²Â´Ã¬â„¢â‚¬ Ã­â€¢Â¨ÃªÂ»Ëœ Ã¬Â â‚¬Ã¬Å¾Â¥Ã«ÂÂ¨
- [ ] **Ã«â€žÂ¤Ã­Å Â¸Ã¬â€ºÅ’Ã­ÂÂ¬**: Ã«Â³Â´Ã¬â€¢Ë† ÃªÂ·Â¸Ã«Â£Â¹ Ã¬Â Å“Ã­â€¢Å“Ã«ÂÂ¨, ÃªÂ³ÂµÃªÂ°Å“ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ°Ã«Â²Â Ã¬ÂÂ´Ã¬Å Â¤ Ã¬â€”â€ Ã¬ÂÅ’
- [ ] **Ã«Â¡Å“ÃªÂ¹â€¦**: CloudWatch/Ã«Â¡Å“ÃªÂ¹â€¦Ã¬ÂÂ´ Ã«Â³Â´Ã¬Â¡Â´ ÃªÂ¸Â°ÃªÂ°â€žÃªÂ³Â¼ Ã­â€¢Â¨ÃªÂ»Ëœ Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨
- [ ] **Ã«ÂªÂ¨Ã«â€¹Ë†Ã­â€žÂ°Ã«Â§Â**: Ã¬ÂÂ´Ã¬Æ’Â Ã¬Â§â€¢Ã­â€ºâ€žÃ¬â€”Â Ã«Å’â‚¬Ã­â€¢Å“ Ã¬â€¢Å’Ã«Â¦Â¼ ÃªÂµÂ¬Ã¬â€žÂ±Ã«ÂÂ¨
- [ ] **CI/CD**: OIDC Ã¬ÂÂ¸Ã¬Â¦Â, Ã¬â€¹Å“Ã­ÂÂ¬Ã«Â¦Â¿ Ã¬Å Â¤Ã¬ÂºÂÃ«â€¹Â, Ã¬ÂËœÃ¬Â¡Â´Ã¬â€žÂ± ÃªÂ°ÂÃ¬â€šÂ¬
- [ ] **CDN/WAF**: OWASP ÃªÂ·Å“Ã¬Â¹â„¢Ã¬Å“Â¼Ã«Â¡Å“ Cloudflare WAF Ã­â„¢Å“Ã¬â€žÂ±Ã­â„¢â€Ã«ÂÂ¨
- [ ] **Ã¬â€¢â€Ã­ËœÂ¸Ã­â„¢â€**: Ã¬Â â‚¬Ã¬Å¾Â¥ Ã«Â°Â Ã¬Â â€žÃ¬â€ Â¡ Ã¬Â¤â€˜ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬â€¢â€Ã­ËœÂ¸Ã­â„¢â€
- [ ] **Ã«Â°Â±Ã¬â€”â€¦**: Ã­â€¦Å’Ã¬Å Â¤Ã­Å Â¸Ã«ÂÅ“ Ã«Â³ÂµÃªÂµÂ¬Ã¬â„¢â‚¬ Ã­â€¢Â¨ÃªÂ»Ëœ Ã¬Å¾ÂÃ«Ââ„¢ Ã«Â°Â±Ã¬â€”â€¦
- [ ] **ÃªÂ·Å“Ã¬Â â€¢ Ã¬Â¤â‚¬Ã¬Ë†Ëœ**: GDPR/HIPAA Ã¬Å¡â€ÃªÂµÂ¬Ã¬â€šÂ¬Ã­â€¢Â­ Ã¬Â¶Â©Ã¬Â¡Â± (Ã­â€¢Â´Ã«â€¹Â¹Ã­â€¢ËœÃ«Å â€ ÃªÂ²Â½Ã¬Å¡Â°)
- [ ] **Ã«Â¬Â¸Ã¬â€žÅ“Ã­â„¢â€**: Ã¬ÂÂ¸Ã­â€â€žÃ«ÂÂ¼ Ã«Â¬Â¸Ã¬â€žÅ“Ã­â„¢â€, Ã«Å¸Â°Ã«Â¶Â Ã¬Å¾â€˜Ã¬â€žÂ±Ã«ÂÂ¨
- [ ] **Ã¬ÂÂ¸Ã¬â€¹Å“Ã«ÂËœÃ­Å Â¸ Ã«Å’â‚¬Ã¬Ââ€˜**: Ã«Â³Â´Ã¬â€¢Ë† Ã¬ÂÂ¸Ã¬â€¹Å“Ã«ÂËœÃ­Å Â¸ ÃªÂ³â€žÃ­Å¡Â Ã«Â§Ë†Ã«Â Â¨

## Ã¬ÂÂ¼Ã«Â°ËœÃ¬Â ÂÃ¬ÂÂ¸ Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã«Â³Â´Ã¬â€¢Ë† Ã¬Å¾ËœÃ«ÂªÂ»Ã«ÂÅ“ ÃªÂµÂ¬Ã¬â€žÂ±

### S3 Ã«Â²â€žÃ­â€šÂ· Ã«â€¦Â¸Ã¬Â¶Å“

```bash
# FAIL: WRONG: Public bucket
aws s3api put-bucket-acl --bucket my-bucket --acl public-read

# PASS: CORRECT: Private bucket with specific access
aws s3api put-bucket-acl --bucket my-bucket --acl private
aws s3api put-bucket-policy --bucket my-bucket --policy file://policy.json
```

### RDS ÃªÂ³ÂµÃªÂ°Å“ Ã¬Â â€˜ÃªÂ·Â¼

```terraform
# FAIL: WRONG
resource "aws_db_instance" "bad" {
  publicly_accessible = true  # NEVER do this!
}

# PASS: CORRECT
resource "aws_db_instance" "good" {
  publicly_accessible = false
  vpc_security_group_ids = [aws_security_group.db.id]
}
```

## Ã¬Â°Â¸ÃªÂ³Â  Ã¬Å¾ÂÃ«Â£Å’

- [AWS Security Best Practices](https://aws.amazon.com/security/best-practices/)
- [CIS AWS Foundations Benchmark](https://www.cisecurity.org/benchmark/amazon_web_services)
- [Cloudflare Security Documentation](https://developers.cloudflare.com/security/)
- [OWASP Cloud Security](https://owasp.org/www-project-cloud-security/)
- [Terraform Security Best Practices](https://www.terraform.io/docs/cloud/guides/recommended-practices/)

**ÃªÂ¸Â°Ã¬â€“ÂµÃ­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€**: Ã­ÂÂ´Ã«ÂÂ¼Ã¬Å¡Â°Ã«â€œÅ“ Ã¬Å¾ËœÃ«ÂªÂ»Ã«ÂÅ“ ÃªÂµÂ¬Ã¬â€žÂ±Ã¬Ââ‚¬ Ã«ÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬Å“Â Ã¬Â¶Å“Ã¬ÂËœ Ã¬Â£Â¼Ã¬Å¡â€ Ã¬â€ºÂÃ¬ÂÂ¸Ã¬Å¾â€¦Ã«â€¹Ë†Ã«â€¹Â¤. Ã­â€¢ËœÃ«â€šËœÃ¬ÂËœ Ã«â€¦Â¸Ã¬Â¶Å“Ã«ÂÅ“ S3 Ã«Â²â€žÃ­â€šÂ·Ã¬ÂÂ´Ã«â€šËœ ÃªÂ³Â¼Ã«Ââ€žÃ­â€¢ËœÃªÂ²Å’ Ã­â€”Ë†Ã¬Å¡Â©Ã¬Â ÂÃ¬ÂÂ¸ IAM Ã¬Â â€¢Ã¬Â±â€¦Ã¬ÂÂ´ Ã¬Â â€žÃ¬Â²Â´ Ã¬ÂÂ¸Ã­â€â€žÃ«ÂÂ¼Ã«Â¥Â¼ Ã¬Â¹Â¨Ã­â€¢Â´Ã­â€¢Â  Ã¬Ë†Ëœ Ã¬Å¾Ë†Ã¬Å ÂµÃ«â€¹Ë†Ã«â€¹Â¤. Ã­â€¢Â­Ã¬Æ’Â Ã¬ÂµÅ“Ã¬â€ Å’ ÃªÂ¶Å’Ã­â€¢Å“ Ã¬â€ºÂÃ¬Â¹â„¢ÃªÂ³Â¼ Ã¬â€¹Â¬Ã¬Â¸Âµ Ã«Â°Â©Ã¬â€“Â´Ã«Â¥Â¼ Ã«â€Â°Ã«Â¥Â´Ã¬â€žÂ¸Ã¬Å¡â€.
