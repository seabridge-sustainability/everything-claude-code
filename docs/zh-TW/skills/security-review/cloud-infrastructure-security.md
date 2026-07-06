| name | description |
|------|-------------|
| cloud-infrastructure-security | Use this skill when deploying to cloud platforms, configuring infrastructure, managing IAM policies, setting up logging/monitoring, or implementing CI/CD pipelines. Provides cloud security checklist aligned with best practices. |

# Ã©â€ºÂ²Ã§Â«Â¯Ã¨Ë†â€¡Ã¥Å¸ÂºÃ§Â¤Å½Ã¨Â¨Â­Ã¦â€“Â½Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å â‚¬Ã¨Æ’Â½

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


Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã§Â¢ÂºÃ¤Â¿ÂÃ©â€ºÂ²Ã§Â«Â¯Ã¥Å¸ÂºÃ§Â¤Å½Ã¨Â¨Â­Ã¦â€“Â½Ã£â‚¬ÂCI/CD Ã§Â®Â¡Ã§Â·Å¡Ã¥â€™Å’Ã©Æ’Â¨Ã§Â½Â²Ã¨Â¨Â­Ã¥Â®Å¡Ã©ÂÂµÃ¥Â¾ÂªÃ¥Â®â€°Ã¥â€¦Â¨Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â¯Â¦Ã¥â€¹â„¢Ã¤Â¸Â¦Ã§Â¬Â¦Ã¥ÂË†Ã¦Â¥Â­Ã§â€¢Å’Ã¦Â¨â„¢Ã¦Âºâ€“Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â„¢â€šÃ¥â€¢Å¸Ã§â€Â¨

- Ã©Æ’Â¨Ã§Â½Â²Ã¦â€¡â€°Ã§â€Â¨Ã§Â¨â€¹Ã¥Â¼ÂÃ¥Ë†Â°Ã©â€ºÂ²Ã§Â«Â¯Ã¥Â¹Â³Ã¥ÂÂ°Ã¯Â¼Ë†AWSÃ£â‚¬ÂVercelÃ£â‚¬ÂRailwayÃ£â‚¬ÂCloudflareÃ¯Â¼â€°
- Ã¨Â¨Â­Ã¥Â®Å¡ IAM Ã¨Â§â€™Ã¨â€°Â²Ã¥â€™Å’Ã¦Â¬Å Ã©â„¢Â
- Ã¨Â¨Â­Ã§Â½Â® CI/CD Ã§Â®Â¡Ã§Â·Å¡
- Ã¥Â¯Â¦Ã¤Â½Å“Ã¥Å¸ÂºÃ§Â¤Å½Ã¨Â¨Â­Ã¦â€“Â½Ã¥ÂÂ³Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¯Â¼Ë†TerraformÃ£â‚¬ÂCloudFormationÃ¯Â¼â€°
- Ã¨Â¨Â­Ã¥Â®Å¡Ã¦â€”Â¥Ã¨ÂªÅ’Ã¥â€™Å’Ã§â€ºÂ£Ã¦Å½Â§
- Ã¥Å“Â¨Ã©â€ºÂ²Ã§Â«Â¯Ã§â€™Â°Ã¥Â¢Æ’Ã§Â®Â¡Ã§Ââ€ Ã¥Â¯â€ Ã©â€˜Â°
- Ã¨Â¨Â­Ã§Â½Â® CDN Ã¥â€™Å’Ã©â€šÅ Ã§Â·Â£Ã¥Â®â€°Ã¥â€¦Â¨
- Ã¥Â¯Â¦Ã¤Â½Å“Ã§ÂÂ½Ã©â€ºÂ£Ã¥Â¾Â©Ã¥Å½Å¸Ã¥â€™Å’Ã¥â€šâ„¢Ã¤Â»Â½Ã§Â­â€“Ã§â€¢Â¥

## Ã©â€ºÂ²Ã§Â«Â¯Ã¥Â®â€°Ã¥â€¦Â¨Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥â€“Â®

### 1. IAM Ã¨Ë†â€¡Ã¥Â­ËœÃ¥Ââ€“Ã¦Å½Â§Ã¥Ë†Â¶

#### Ã¦Å“â‚¬Ã¥Â°ÂÃ¦Â¬Å Ã©â„¢ÂÃ¥Å½Å¸Ã¥â€°â€¡

```yaml
# PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã¦Å“â‚¬Ã¥Â°ÂÃ¦Â¬Å Ã©â„¢Â
iam_role:
  permissions:
    - s3:GetObject  # Ã¥ÂÂªÃ¦Å“â€°Ã¨Â®â‚¬Ã¥Ââ€“Ã¥Â­ËœÃ¥Ââ€“
    - s3:ListBucket
  resources:
    - arn:aws:s3:::my-bucket/*  # Ã¥ÂÂªÃ¦Å“â€°Ã§â€°Â¹Ã¥Â®Å¡ bucket

# FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡Ã©ÂÅ½Ã¦â€“Â¼Ã¥Â»Â£Ã¦Â³â€ºÃ§Å¡â€žÃ¦Â¬Å Ã©â„¢Â
iam_role:
  permissions:
    - s3:*  # Ã¦â€°â‚¬Ã¦Å“â€° S3 Ã¥â€¹â€¢Ã¤Â½Å“
  resources:
    - "*"  # Ã¦â€°â‚¬Ã¦Å“â€°Ã¨Â³â€¡Ã¦ÂºÂ
```

#### Ã¥Â¤Å¡Ã¥â€ºÂ Ã§Â´Â Ã¨ÂªÂÃ¨Â­â€°Ã¯Â¼Ë†MFAÃ¯Â¼â€°

```bash
# Ã§Â¸Â½Ã¦ËœÂ¯Ã§â€šÂº root/admin Ã¥Â¸Â³Ã¦Ë†Â¶Ã¥â€¢Å¸Ã§â€Â¨ MFA
aws iam enable-mfa-device \
  --user-name admin \
  --serial-number arn:aws:iam::123456789:mfa/admin \
  --authentication-code1 123456 \
  --authentication-code2 789012
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸

- [ ] Ã§â€Å¸Ã§â€Â¢Ã§â€™Â°Ã¥Â¢Æ’Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ root Ã¥Â¸Â³Ã¦Ë†Â¶
- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã§â€°Â¹Ã¦Â¬Å Ã¥Â¸Â³Ã¦Ë†Â¶Ã¥â€¢Å¸Ã§â€Â¨ MFA
- [ ] Ã¦Å“ÂÃ¥â€¹â„¢Ã¥Â¸Â³Ã¦Ë†Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¨Â§â€™Ã¨â€°Â²Ã¯Â¼Å’Ã©ÂÅ¾Ã©â€¢Â·Ã¦Å“Å¸Ã¦â€ â€˜Ã¨Â­â€°
- [ ] IAM Ã¦â€Â¿Ã§Â­â€“Ã©ÂÂµÃ¥Â¾ÂªÃ¦Å“â‚¬Ã¥Â°ÂÃ¦Â¬Å Ã©â„¢Â
- [ ] Ã¥Â®Å¡Ã¦Å“Å¸Ã©â‚¬Â²Ã¨Â¡Å’Ã¥Â­ËœÃ¥Ââ€“Ã¥Â¯Â©Ã¦Å¸Â¥
- [ ] Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã¦â€ â€˜Ã¨Â­â€°Ã¥Â·Â²Ã¨Â¼ÂªÃ¦Ââ€ºÃ¦Ë†â€“Ã§Â§Â»Ã©â„¢Â¤

### 2. Ã¥Â¯â€ Ã©â€˜Â°Ã§Â®Â¡Ã§Ââ€ 

#### Ã©â€ºÂ²Ã§Â«Â¯Ã¥Â¯â€ Ã©â€˜Â°Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨

```typescript
// PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã¤Â½Â¿Ã§â€Â¨Ã©â€ºÂ²Ã§Â«Â¯Ã¥Â¯â€ Ã©â€˜Â°Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨
import { SecretsManager } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManager({ region: 'us-east-1' });
const secret = await client.getSecretValue({ SecretId: 'prod/api-key' });
const apiKey = JSON.parse(secret.SecretString).key;

// FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡Ã¥Â¯Â«Ã¦Â­Â»Ã¦Ë†â€“Ã¥ÂÂªÃ¥Å“Â¨Ã§â€™Â°Ã¥Â¢Æ’Ã¨Â®Å Ã¦â€¢Â¸
const apiKey = process.env.API_KEY; // Ã¦Å“ÂªÃ¨Â¼ÂªÃ¦Ââ€ºÃ£â‚¬ÂÃ¦Å“ÂªÃ§Â¨Â½Ã¦Â Â¸
```

#### Ã¥Â¯â€ Ã©â€˜Â°Ã¨Â¼ÂªÃ¦Ââ€º

```bash
# Ã§â€šÂºÃ¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦â€ â€˜Ã¨Â­â€°Ã¨Â¨Â­Ã¥Â®Å¡Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¨Â¼ÂªÃ¦Ââ€º
aws secretsmanager rotate-secret \
  --secret-id prod/db-password \
  --rotation-lambda-arn arn:aws:lambda:region:account:function:rotate \
  --rotation-rules AutomaticallyAfterDays=30
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸

- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â¯â€ Ã©â€˜Â°Ã¥â€žÂ²Ã¥Â­ËœÃ¥Å“Â¨Ã©â€ºÂ²Ã§Â«Â¯Ã¥Â¯â€ Ã©â€˜Â°Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¯Â¼Ë†AWS Secrets ManagerÃ£â‚¬ÂVercel SecretsÃ¯Â¼â€°
- [ ] Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¦â€ â€˜Ã¨Â­â€°Ã¥â€¢Å¸Ã§â€Â¨Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¨Â¼ÂªÃ¦Ââ€º
- [ ] API Ã©â€¡â€˜Ã©â€˜Â°Ã¨â€¡Â³Ã¥Â°â€˜Ã¦Â¯ÂÃ¥Â­Â£Ã¨Â¼ÂªÃ¦Ââ€º
- [ ] Ã§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã£â‚¬ÂÃ¦â€”Â¥Ã¨ÂªÅ’Ã¦Ë†â€“Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¨Å Ã¦ÂÂ¯Ã¤Â¸Â­Ã§â€žÂ¡Ã¥Â¯â€ Ã©â€˜Â°
- [ ] Ã¥Â¯â€ Ã©â€˜Â°Ã¥Â­ËœÃ¥Ââ€“Ã¥â€¢Å¸Ã§â€Â¨Ã§Â¨Â½Ã¦Â Â¸Ã¦â€”Â¥Ã¨ÂªÅ’

### 3. Ã§Â¶Â²Ã¨Â·Â¯Ã¥Â®â€°Ã¥â€¦Â¨

#### VPC Ã¥â€™Å’Ã©ËœÂ²Ã§ÂÂ«Ã§â€°â€ Ã¨Â¨Â­Ã¥Â®Å¡

```terraform
# PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã©â„¢ÂÃ¥Ë†Â¶Ã§Å¡â€žÃ¥Â®â€°Ã¥â€¦Â¨Ã§Â¾Â¤Ã§Âµâ€ž
resource "aws_security_group" "app" {
  name = "app-sg"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]  # Ã¥ÂÂªÃ¦Å“â€°Ã¥â€¦Â§Ã©Æ’Â¨ VPC
  }

  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Ã¥ÂÂªÃ¦Å“â€° HTTPS Ã¨Â¼Â¸Ã¥â€¡Âº
  }
}

# FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡Ã¥Â°ÂÃ§Â¶Â²Ã©Å¡â€ºÃ§Â¶Â²Ã¨Â·Â¯Ã©â€“â€¹Ã¦â€Â¾
resource "aws_security_group" "bad" {
  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Å¸Â Ã£â‚¬ÂÃ¦â€°â‚¬Ã¦Å“â€° IPÃ¯Â¼Â
  }
}
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸

- [ ] Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«Ã¤Â¸ÂÃ¥ÂÂ¯Ã¥â€¦Â¬Ã©â€“â€¹Ã¥Â­ËœÃ¥Ââ€“
- [ ] SSH/RDP Ã¥Å¸Â Ã©â„¢ÂÃ¥Ë†Â¶Ã§â€šÂº VPN/Ã¥Â Â¡Ã¥Â£ËœÃ¦Â©Å¸
- [ ] Ã¥Â®â€°Ã¥â€¦Â¨Ã§Â¾Â¤Ã§Âµâ€žÃ©ÂÂµÃ¥Â¾ÂªÃ¦Å“â‚¬Ã¥Â°ÂÃ¦Â¬Å Ã©â„¢Â
- [ ] Ã§Â¶Â²Ã¨Â·Â¯ ACL Ã¥Â·Â²Ã¨Â¨Â­Ã¥Â®Å¡
- [ ] VPC Ã¦ÂµÂÃ©â€¡ÂÃ¦â€”Â¥Ã¨ÂªÅ’Ã¥Â·Â²Ã¥â€¢Å¸Ã§â€Â¨

### 4. Ã¦â€”Â¥Ã¨ÂªÅ’Ã¨Ë†â€¡Ã§â€ºÂ£Ã¦Å½Â§

#### CloudWatch/Ã¦â€”Â¥Ã¨ÂªÅ’Ã¨Â¨Â­Ã¥Â®Å¡

```typescript
// PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã¥â€¦Â¨Ã©ÂÂ¢Ã¦â€”Â¥Ã¨ÂªÅ’Ã¨Â¨ËœÃ©Å’â€ž
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
        // Ã¦Â°Â¸Ã©ÂÂ Ã¤Â¸ÂÃ¨Â¦ÂÃ¨Â¨ËœÃ©Å’â€žÃ¦â€¢ÂÃ¦â€žÅ¸Ã¨Â³â€¡Ã¦â€“â„¢
      })
    }]
  });
};
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸

- [ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å“ÂÃ¥â€¹â„¢Ã¥â€¢Å¸Ã§â€Â¨ CloudWatch/Ã¦â€”Â¥Ã¨ÂªÅ’Ã¨Â¨ËœÃ©Å’â€ž
- [ ] Ã¥Â¤Â±Ã¦â€¢â€”Ã§Å¡â€žÃ¨ÂªÂÃ¨Â­â€°Ã¥Ëœâ€”Ã¨Â©Â¦Ã¨Â¢Â«Ã¨Â¨ËœÃ©Å’â€ž
- [ ] Ã§Â®Â¡Ã§Ââ€ Ã¥â€œÂ¡Ã¥â€¹â€¢Ã¤Â½Å“Ã¨Â¢Â«Ã§Â¨Â½Ã¦Â Â¸
- [ ] Ã¦â€”Â¥Ã¨ÂªÅ’Ã¤Â¿ÂÃ§â€¢â„¢Ã¥Â·Â²Ã¨Â¨Â­Ã¥Â®Å¡Ã¯Â¼Ë†Ã¥ÂË†Ã¨Â¦ÂÃ©Å“â‚¬ 90+ Ã¥Â¤Â©Ã¯Â¼â€°
- [ ] Ã¥ÂÂ¯Ã§â€“â€˜Ã¦Â´Â»Ã¥â€¹â€¢Ã¨Â¨Â­Ã¥Â®Å¡Ã¨Â­Â¦Ã¥Â Â±
- [ ] Ã¦â€”Â¥Ã¨ÂªÅ’Ã©â€ºâ€ Ã¤Â¸Â­Ã¥Å’â€“Ã¤Â¸â€Ã©ËœÂ²Ã§Â¯Â¡Ã¦â€Â¹

### 5. CI/CD Ã§Â®Â¡Ã§Â·Å¡Ã¥Â®â€°Ã¥â€¦Â¨

#### Ã¥Â®â€°Ã¥â€¦Â¨Ã§Â®Â¡Ã§Â·Å¡Ã¨Â¨Â­Ã¥Â®Å¡

```yaml
# PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã§Å¡â€ž GitHub Actions Ã¥Â·Â¥Ã¤Â½Å“Ã¦ÂµÂÃ§Â¨â€¹
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read  # Ã¦Å“â‚¬Ã¥Â°ÂÃ¦Â¬Å Ã©â„¢Â

    steps:
      - uses: actions/checkout@v4

      # Ã¦Å½Æ’Ã¦ÂÂÃ¥Â¯â€ Ã©â€˜Â°
      - name: Secret scanning
        uses: trufflesecurity/trufflehog@main

      # Ã¤Â¾ÂÃ¨Â³Â´Ã§Â¨Â½Ã¦Â Â¸
      - name: Audit dependencies
        run: npm audit --audit-level=high

      # Ã¤Â½Â¿Ã§â€Â¨ OIDCÃ¯Â¼Å’Ã©ÂÅ¾Ã©â€¢Â·Ã¦Å“Å¸ tokens
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole
          aws-region: us-east-1
```

#### Ã¤Â¾â€ºÃ¦â€¡â€°Ã©ÂË†Ã¥Â®â€°Ã¥â€¦Â¨

```json
// package.json - Ã¤Â½Â¿Ã§â€Â¨ lock Ã¦Âªâ€Ã¦Â¡Ë†Ã¥â€™Å’Ã¥Â®Å’Ã¦â€¢Â´Ã¦â‚¬Â§Ã¦ÂªÂ¢Ã¦Å¸Â¥
{
  "scripts": {
    "install": "npm ci",  // Ã¤Â½Â¿Ã§â€Â¨ ci Ã¤Â»Â¥Ã§ÂÂ²Ã¥Â¾â€”Ã¥ÂÂ¯Ã©â€¡ÂÃ§ÂÂ¾Ã¥Â»ÂºÃ§Â½Â®
    "audit": "npm audit --audit-level=moderate",
    "check": "npm outdated"
  }
}
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸

- [ ] Ã¤Â½Â¿Ã§â€Â¨ OIDC Ã¨â‚¬Å’Ã©ÂÅ¾Ã©â€¢Â·Ã¦Å“Å¸Ã¦â€ â€˜Ã¨Â­â€°
- [ ] Ã§Â®Â¡Ã§Â·Å¡Ã¤Â¸Â­Ã§Å¡â€žÃ¥Â¯â€ Ã©â€˜Â°Ã¦Å½Æ’Ã¦ÂÂ
- [ ] Ã¤Â¾ÂÃ¨Â³Â´Ã¦Â¼ÂÃ¦Â´Å¾Ã¦Å½Æ’Ã¦ÂÂ
- [ ] Ã¥Â®Â¹Ã¥â„¢Â¨Ã¦ËœÂ Ã¥Æ’ÂÃ¦Å½Æ’Ã¦ÂÂÃ¯Â¼Ë†Ã¥Â¦â€šÃ©ÂÂ©Ã§â€Â¨Ã¯Â¼â€°
- [ ] Ã¥Â¼Â·Ã¥Ë†Â¶Ã¥Å¸Â·Ã¨Â¡Å’Ã¥Ë†â€ Ã¦â€Â¯Ã¤Â¿ÂÃ¨Â­Â·Ã¨Â¦ÂÃ¥â€°â€¡
- [ ] Ã¥ÂË†Ã¤Â½ÂµÃ¥â€°ÂÃ©Å“â‚¬Ã¨Â¦ÂÃ§Â¨â€¹Ã¥Â¼ÂÃ§Â¢Â¼Ã¥Â¯Â©Ã¦Å¸Â¥
- [ ] Ã¥Â¼Â·Ã¥Ë†Â¶Ã¥Å¸Â·Ã¨Â¡Å’Ã§Â°Â½Ã§Â½Â² commits

### 6. Cloudflare Ã¨Ë†â€¡ CDN Ã¥Â®â€°Ã¥â€¦Â¨

#### Cloudflare Ã¥Â®â€°Ã¥â€¦Â¨Ã¨Â¨Â­Ã¥Â®Å¡

```typescript
// PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã¥Â¸Â¶Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¨â„¢Ã©Â Â­Ã§Å¡â€ž Cloudflare Workers
export default {
  async fetch(request: Request): Promise<Response> {
    const response = await fetch(request);

    // Ã¦â€“Â°Ã¥Â¢Å¾Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¨â„¢Ã©Â Â­
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

#### WAF Ã¨Â¦ÂÃ¥â€°â€¡

```bash
# Ã¥â€¢Å¸Ã§â€Â¨ Cloudflare WAF Ã§Â®Â¡Ã§Ââ€ Ã¨Â¦ÂÃ¥â€°â€¡
# - OWASP Ã¦Â Â¸Ã¥Â¿Æ’Ã¨Â¦ÂÃ¥â€°â€¡Ã©â€ºâ€ 
# - Cloudflare Ã§Â®Â¡Ã§Ââ€ Ã¨Â¦ÂÃ¥â€°â€¡Ã©â€ºâ€ 
# - Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶Ã¨Â¦ÂÃ¥â€°â€¡
# - Bot Ã¤Â¿ÂÃ¨Â­Â·
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸

- [ ] WAF Ã¥â€¢Å¸Ã§â€Â¨ OWASP Ã¨Â¦ÂÃ¥â€°â€¡
- [ ] Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶Ã¥Â·Â²Ã¨Â¨Â­Ã¥Â®Å¡
- [ ] Bot Ã¤Â¿ÂÃ¨Â­Â·Ã¥â€¢Å¸Ã§â€Â¨
- [ ] DDoS Ã¤Â¿ÂÃ¨Â­Â·Ã¥â€¢Å¸Ã§â€Â¨
- [ ] Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â¨â„¢Ã©Â Â­Ã¥Â·Â²Ã¨Â¨Â­Ã¥Â®Å¡
- [ ] SSL/TLS Ã¥Å¡Â´Ã¦Â Â¼Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥â€¢Å¸Ã§â€Â¨

### 7. Ã¥â€šâ„¢Ã¤Â»Â½Ã¨Ë†â€¡Ã§ÂÂ½Ã©â€ºÂ£Ã¥Â¾Â©Ã¥Å½Å¸

#### Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¥â€šâ„¢Ã¤Â»Â½

```terraform
# PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã¨â€¡ÂªÃ¥â€¹â€¢ RDS Ã¥â€šâ„¢Ã¤Â»Â½
resource "aws_db_instance" "main" {
  allocated_storage     = 20
  engine               = "postgres"

  backup_retention_period = 30  # 30 Ã¥Â¤Â©Ã¤Â¿ÂÃ§â€¢â„¢
  backup_window          = "03:00-04:00"
  maintenance_window     = "mon:04:00-mon:05:00"

  enabled_cloudwatch_logs_exports = ["postgresql"]

  deletion_protection = true  # Ã©ËœÂ²Ã¦Â­Â¢Ã¦â€žÂÃ¥Â¤â€“Ã¥Ë†ÂªÃ©â„¢Â¤
}
```

#### Ã©Â©â€”Ã¨Â­â€°Ã¦Â­Â¥Ã©Â©Å¸

- [ ] Ã¥Â·Â²Ã¨Â¨Â­Ã¥Â®Å¡Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¦Â¯ÂÃ¦â€”Â¥Ã¥â€šâ„¢Ã¤Â»Â½
- [ ] Ã¥â€šâ„¢Ã¤Â»Â½Ã¤Â¿ÂÃ§â€¢â„¢Ã§Â¬Â¦Ã¥ÂË†Ã¥ÂË†Ã¨Â¦ÂÃ¨Â¦ÂÃ¦Â±â€š
- [ ] Ã¥Â·Â²Ã¥â€¢Å¸Ã§â€Â¨Ã¦â„¢â€šÃ©â€“â€œÃ©Â»Å¾Ã¥Â¾Â©Ã¥Å½Å¸
- [ ] Ã¦Â¯ÂÃ¥Â­Â£Ã¥Å¸Â·Ã¨Â¡Å’Ã¥â€šâ„¢Ã¤Â»Â½Ã¦Â¸Â¬Ã¨Â©Â¦
- [ ] Ã§ÂÂ½Ã©â€ºÂ£Ã¥Â¾Â©Ã¥Å½Å¸Ã¨Â¨Ë†Ã§â€¢Â«Ã¥Â·Â²Ã¨Â¨ËœÃ©Å’â€ž
- [ ] RPO Ã¥â€™Å’ RTO Ã¥Â·Â²Ã¥Â®Å¡Ã§Â¾Â©Ã¤Â¸Â¦Ã¦Â¸Â¬Ã¨Â©Â¦

## Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ©â€ºÂ²Ã§Â«Â¯Ã¥Â®â€°Ã¥â€¦Â¨Ã¦ÂªÂ¢Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥â€“Â®

Ã¤Â»Â»Ã¤Â½â€¢Ã§â€Å¸Ã§â€Â¢Ã©â€ºÂ²Ã§Â«Â¯Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ¯Â¼Å¡

- [ ] **IAM**Ã¯Â¼Å¡Ã¤Â¸ÂÃ¤Â½Â¿Ã§â€Â¨ root Ã¥Â¸Â³Ã¦Ë†Â¶Ã£â‚¬ÂÃ¥â€¢Å¸Ã§â€Â¨ MFAÃ£â‚¬ÂÃ¦Å“â‚¬Ã¥Â°ÂÃ¦Â¬Å Ã©â„¢ÂÃ¦â€Â¿Ã§Â­â€“
- [ ] **Ã¥Â¯â€ Ã©â€˜Â°**Ã¯Â¼Å¡Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â¯â€ Ã©â€˜Â°Ã¥Å“Â¨Ã©â€ºÂ²Ã§Â«Â¯Ã¥Â¯â€ Ã©â€˜Â°Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¤Â¸Â¦Ã¦Å“â€°Ã¨Â¼ÂªÃ¦Ââ€º
- [ ] **Ã§Â¶Â²Ã¨Â·Â¯**Ã¯Â¼Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã§Â¾Â¤Ã§Âµâ€žÃ¥Ââ€”Ã©â„¢ÂÃ£â‚¬ÂÃ§â€žÂ¡Ã¥â€¦Â¬Ã©â€“â€¹Ã¨Â³â€¡Ã¦â€“â„¢Ã¥ÂºÂ«
- [ ] **Ã¦â€”Â¥Ã¨ÂªÅ’**Ã¯Â¼Å¡CloudWatch/Ã¦â€”Â¥Ã¨ÂªÅ’Ã¥â€¢Å¸Ã§â€Â¨Ã¤Â¸Â¦Ã¦Å“â€°Ã¤Â¿ÂÃ§â€¢â„¢
- [ ] **Ã§â€ºÂ£Ã¦Å½Â§**Ã¯Â¼Å¡Ã§â€¢Â°Ã¥Â¸Â¸Ã¨Â¨Â­Ã¥Â®Å¡Ã¨Â­Â¦Ã¥Â Â±
- [ ] **CI/CD**Ã¯Â¼Å¡OIDC Ã¨ÂªÂÃ¨Â­â€°Ã£â‚¬ÂÃ¥Â¯â€ Ã©â€˜Â°Ã¦Å½Æ’Ã¦ÂÂÃ£â‚¬ÂÃ¤Â¾ÂÃ¨Â³Â´Ã§Â¨Â½Ã¦Â Â¸
- [ ] **CDN/WAF**Ã¯Â¼Å¡Cloudflare WAF Ã¥â€¢Å¸Ã§â€Â¨ OWASP Ã¨Â¦ÂÃ¥â€°â€¡
- [ ] **Ã¥Å Â Ã¥Â¯â€ **Ã¯Â¼Å¡Ã¨Â³â€¡Ã¦â€“â„¢Ã©ÂÅ“Ã¦â€¦â€¹Ã¥â€™Å’Ã¥â€šÂ³Ã¨Â¼Â¸Ã¤Â¸Â­Ã¥Å Â Ã¥Â¯â€ 
- [ ] **Ã¥â€šâ„¢Ã¤Â»Â½**Ã¯Â¼Å¡Ã¨â€¡ÂªÃ¥â€¹â€¢Ã¥â€šâ„¢Ã¤Â»Â½Ã¤Â¸Â¦Ã¦Â¸Â¬Ã¨Â©Â¦Ã¥Â¾Â©Ã¥Å½Å¸
- [ ] **Ã¥ÂË†Ã¨Â¦Â**Ã¯Â¼Å¡Ã§Â¬Â¦Ã¥ÂË† GDPR/HIPAA Ã¨Â¦ÂÃ¦Â±â€šÃ¯Â¼Ë†Ã¥Â¦â€šÃ©ÂÂ©Ã§â€Â¨Ã¯Â¼â€°
- [ ] **Ã¦â€“â€¡Ã¤Â»Â¶**Ã¯Â¼Å¡Ã¥Å¸ÂºÃ§Â¤Å½Ã¨Â¨Â­Ã¦â€“Â½Ã¥Â·Â²Ã¨Â¨ËœÃ©Å’â€žÃ£â‚¬ÂÃ¥Â»ÂºÃ§Â«â€¹Ã¦â€œÂÃ¤Â½Å“Ã¦â€°â€¹Ã¥â€ Å 
- [ ] **Ã¤Âºâ€¹Ã¤Â»Â¶Ã¥â€ºÅ¾Ã¦â€¡â€°**Ã¯Â¼Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã¤Âºâ€¹Ã¤Â»Â¶Ã¨Â¨Ë†Ã§â€¢Â«Ã¥Â°Â±Ã¤Â½Â

## Ã¥Â¸Â¸Ã¨Â¦â€¹Ã©â€ºÂ²Ã§Â«Â¯Ã¥Â®â€°Ã¥â€¦Â¨Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¨Â­Ã¥Â®Å¡

### S3 Bucket Ã¦Å¡Â´Ã©Å“Â²

```bash
# FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤Ã¯Â¼Å¡Ã¥â€¦Â¬Ã©â€“â€¹ bucket
aws s3api put-bucket-acl --bucket my-bucket --acl public-read

# PASS: Ã¦Â­Â£Ã§Â¢ÂºÃ¯Â¼Å¡Ã§Â§ÂÃ¦Å“â€° bucket Ã¤Â¸Â¦Ã¦Å“â€°Ã§â€°Â¹Ã¥Â®Å¡Ã¥Â­ËœÃ¥Ââ€“
aws s3api put-bucket-acl --bucket my-bucket --acl private
aws s3api put-bucket-policy --bucket my-bucket --policy file://policy.json
```

### RDS Ã¥â€¦Â¬Ã©â€“â€¹Ã¥Â­ËœÃ¥Ââ€“

```terraform
# FAIL: Ã©Å’Â¯Ã¨ÂªÂ¤
resource "aws_db_instance" "bad" {
  publicly_accessible = true  # Ã§Âµâ€¢Ã¤Â¸ÂÃ©â‚¬â„¢Ã¦Â¨Â£Ã¥ÂÅ¡Ã¯Â¼Â
}

# PASS: Ã¦Â­Â£Ã§Â¢Âº
resource "aws_db_instance" "good" {
  publicly_accessible = false
  vpc_security_group_ids = [aws_security_group.db.id]
}
```

## Ã¨Â³â€¡Ã¦ÂºÂ

- [AWS Security Best Practices](https://aws.amazon.com/security/best-practices/)
- [CIS AWS Foundations Benchmark](https://www.cisecurity.org/benchmark/amazon_web_services)
- [Cloudflare Security Documentation](https://developers.cloudflare.com/security/)
- [OWASP Cloud Security](https://owasp.org/www-project-cloud-security/)
- [Terraform Security Best Practices](https://www.terraform.io/docs/cloud/guides/recommended-practices/)

**Ã¨Â¨ËœÃ¤Â½Â**Ã¯Â¼Å¡Ã©â€ºÂ²Ã§Â«Â¯Ã©Å’Â¯Ã¨ÂªÂ¤Ã¨Â¨Â­Ã¥Â®Å¡Ã¦ËœÂ¯Ã¨Â³â€¡Ã¦â€“â„¢Ã¥Â¤â€“Ã¦Â´Â©Ã§Å¡â€žÃ¤Â¸Â»Ã¨Â¦ÂÃ¥Å½Å¸Ã¥â€ºÂ Ã£â‚¬â€šÃ¥â€“Â®Ã¤Â¸â‚¬Ã¦Å¡Â´Ã©Å“Â²Ã§Å¡â€ž S3 bucket Ã¦Ë†â€“Ã©ÂÅ½Ã¦â€“Â¼Ã¥Â¯Â¬Ã©Â¬â€ Ã§Å¡â€ž IAM Ã¦â€Â¿Ã§Â­â€“Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥ÂÂ±Ã¥ÂÅ Ã¤Â½Â Ã§Å¡â€žÃ¦â€¢Â´Ã¥â‚¬â€¹Ã¥Å¸ÂºÃ§Â¤Å½Ã¨Â¨Â­Ã¦â€“Â½Ã£â‚¬â€šÃ§Â¸Â½Ã¦ËœÂ¯Ã©ÂÂµÃ¥Â¾ÂªÃ¦Å“â‚¬Ã¥Â°ÂÃ¦Â¬Å Ã©â„¢ÂÃ¥Å½Å¸Ã¥â€°â€¡Ã¥â€™Å’Ã¦Â·Â±Ã¥ÂºÂ¦Ã©ËœÂ²Ã§Â¦Â¦Ã£â‚¬â€š
