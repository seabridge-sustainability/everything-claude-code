| name | description |
|------|-------------|
| cloud-infrastructure-security | Ã¥Å“Â¨Ã©Æ’Â¨Ã§Â½Â²Ã¥Ë†Â°Ã¤Âºâ€˜Ã¥Â¹Â³Ã¥ÂÂ°Ã£â‚¬ÂÃ©â€¦ÂÃ§Â½Â®Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¨Â®Â¾Ã¦â€“Â½Ã£â‚¬ÂÃ§Â®Â¡Ã§Ââ€ IAMÃ§Â­â€“Ã§â€¢Â¥Ã£â‚¬ÂÃ¨Â®Â¾Ã§Â½Â®Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢/Ã§â€ºâ€˜Ã¦Å½Â§Ã¦Ë†â€“Ã¥Â®Å¾Ã§Å½Â°CI/CDÃ¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿Ã¦â€”Â¶Ã¤Â½Â¿Ã§â€Â¨Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã£â‚¬â€šÃ¦ÂÂÃ¤Â¾â€ºÃ§Â¬Â¦Ã¥ÂË†Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ§Å¡â€žÃ¤Âºâ€˜Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢Ã£â‚¬â€š |

# Ã¤Âºâ€˜Ã¤Â¸Å½Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¨Â®Â¾Ã¦â€“Â½Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å â‚¬Ã¨Æ’Â½

## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

1. Session authorization gate: at session start, request authorization through the team-approved secure channel before any write, destructive, or cost-incurring action.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Use the team-shared authorization password from your secure internal channel when approval is required; never store that password in code, docs, logs, or commits.


Ã¦Â­Â¤Ã¦Å â‚¬Ã¨Æ’Â½Ã§Â¡Â®Ã¤Â¿ÂÃ¤Âºâ€˜Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¨Â®Â¾Ã¦â€“Â½Ã£â‚¬ÂCI/CDÃ¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿Ã¥â€™Å’Ã©Æ’Â¨Ã§Â½Â²Ã©â€¦ÂÃ§Â½Â®Ã©ÂÂµÃ¥Â¾ÂªÃ¥Â®â€°Ã¥â€¦Â¨Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·ÂµÃ¥Â¹Â¶Ã§Â¬Â¦Ã¥ÂË†Ã¨Â¡Å’Ã¤Â¸Å¡Ã¦Â â€¡Ã¥â€¡â€ Ã£â‚¬â€š

## Ã¤Â½â€¢Ã¦â€”Â¶Ã¦Â¿â‚¬Ã¦Â´Â»

* Ã¥Â°â€ Ã¥Âºâ€Ã§â€Â¨Ã§Â¨â€¹Ã¥ÂºÂÃ©Æ’Â¨Ã§Â½Â²Ã¥Ë†Â°Ã¤Âºâ€˜Ã¥Â¹Â³Ã¥ÂÂ°Ã¯Â¼Ë†AWSÃ£â‚¬ÂVercelÃ£â‚¬ÂRailwayÃ£â‚¬ÂCloudflareÃ¯Â¼â€°
* Ã©â€¦ÂÃ§Â½Â®IAMÃ¨Â§â€™Ã¨â€°Â²Ã¥â€™Å’Ã¦ÂÆ’Ã©â„¢Â
* Ã¨Â®Â¾Ã§Â½Â®CI/CDÃ¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿
* Ã¥Â®Å¾Ã¦â€“Â½Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¨Â®Â¾Ã¦â€“Â½Ã¥ÂÂ³Ã¤Â»Â£Ã§Â ÂÃ¯Â¼Ë†TerraformÃ£â‚¬ÂCloudFormationÃ¯Â¼â€°
* Ã©â€¦ÂÃ§Â½Â®Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢Ã¥â€™Å’Ã§â€ºâ€˜Ã¦Å½Â§
* Ã¥Å“Â¨Ã¤Âºâ€˜Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã§Â®Â¡Ã§Ââ€ Ã¥Â¯â€ Ã©â€™Â¥
* Ã¨Â®Â¾Ã§Â½Â®CDNÃ¥â€™Å’Ã¨Â¾Â¹Ã§Â¼ËœÃ¥Â®â€°Ã¥â€¦Â¨
* Ã¥Â®Å¾Ã¦â€“Â½Ã§ÂÂ¾Ã©Å¡Â¾Ã¦ÂÂ¢Ã¥Â¤ÂÃ¥â€™Å’Ã¥Â¤â€¡Ã¤Â»Â½Ã§Â­â€“Ã§â€¢Â¥

## Ã¤Âºâ€˜Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢

### 1. IAM Ã¤Â¸Å½Ã¨Â®Â¿Ã©â€”Â®Ã¦Å½Â§Ã¥Ë†Â¶

#### Ã¦Å“â‚¬Ã¥Â°ÂÃ¦ÂÆ’Ã©â„¢ÂÃ¥Å½Å¸Ã¥Ë†â„¢

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

#### Ã¥Â¤Å¡Ã¥â€ºÂ Ã§Â´Â Ã¨Â®Â¤Ã¨Â¯Â (MFA)

```bash
# ALWAYS enable MFA for root/admin accounts
aws iam enable-mfa-device \
  --user-name admin \
  --serial-number arn:aws:iam::123456789:mfa/admin \
  --authentication-code1 123456 \
  --authentication-code2 789012
```

#### Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â­Â¥Ã©ÂªÂ¤

* \[ ] Ã§â€Å¸Ã¤ÂºÂ§Ã§Å½Â¯Ã¥Â¢Æ’Ã¤Â¸Â­Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã¦Â Â¹Ã¨Â´Â¦Ã¦Ë†Â·
* \[ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã§â€°Â¹Ã¦ÂÆ’Ã¨Â´Â¦Ã¦Ë†Â·Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨MFA
* \[ ] Ã¦Å“ÂÃ¥Å Â¡Ã¨Â´Â¦Ã¦Ë†Â·Ã¤Â½Â¿Ã§â€Â¨Ã¨Â§â€™Ã¨â€°Â²Ã¯Â¼Å’Ã¨â‚¬Å’Ã©ÂÅ¾Ã©â€¢Â¿Ã¦Å“Å¸Ã¥â€¡Â­Ã¨Â¯Â
* \[ ] IAMÃ§Â­â€“Ã§â€¢Â¥Ã©ÂÂµÃ¥Â¾ÂªÃ¦Å“â‚¬Ã¥Â°ÂÃ¦ÂÆ’Ã©â„¢ÂÃ¥Å½Å¸Ã¥Ë†â„¢
* \[ ] Ã¥Â®Å¡Ã¦Å“Å¸Ã¨Â¿â€ºÃ¨Â¡Å’Ã¨Â®Â¿Ã©â€”Â®Ã¥Â®Â¡Ã¦Å¸Â¥
* \[ ] Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã§Å¡â€žÃ¥â€¡Â­Ã¨Â¯ÂÃ¥Â·Â²Ã¨Â½Â®Ã¦ÂÂ¢Ã¦Ë†â€“Ã§Â§Â»Ã©â„¢Â¤

### 2. Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ 

#### Ã¤Âºâ€˜Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨

```typescript
// PASS: CORRECT: Use cloud secrets manager
import { SecretsManager } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManager({ region: 'us-east-1' });
const secret = await client.getSecretValue({ SecretId: 'prod/api-key' });
const apiKey = JSON.parse(secret.SecretString).key;

// FAIL: WRONG: Hardcoded or in environment variables only
const apiKey = process.env.API_KEY; // Not rotated, not audited
```

#### Ã¥Â¯â€ Ã©â€™Â¥Ã¨Â½Â®Ã¦ÂÂ¢

```bash
# Set up automatic rotation for database credentials
aws secretsmanager rotate-secret \
  --secret-id prod/db-password \
  --rotation-lambda-arn arn:aws:lambda:region:account:function:rotate \
  --rotation-rules AutomaticallyAfterDays=30
```

#### Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â­Â¥Ã©ÂªÂ¤

* \[ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â¯â€ Ã©â€™Â¥Ã¥Â­ËœÃ¥â€šÂ¨Ã¥Å“Â¨Ã¤Âºâ€˜Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¯Â¼Ë†AWS Secrets ManagerÃ£â‚¬ÂVercel SecretsÃ¯Â¼â€°Ã¤Â¸Â­
* \[ ] Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¥â€¡Â­Ã¨Â¯ÂÃ¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨Ã¨â€¡ÂªÃ¥Å Â¨Ã¨Â½Â®Ã¦ÂÂ¢
* \[ ] APIÃ¥Â¯â€ Ã©â€™Â¥Ã¨â€¡Â³Ã¥Â°â€˜Ã¦Â¯ÂÃ¥Â­Â£Ã¥ÂºÂ¦Ã¨Â½Â®Ã¦ÂÂ¢Ã¤Â¸â‚¬Ã¦Â¬Â¡
* \[ ] Ã¤Â»Â£Ã§Â ÂÃ£â‚¬ÂÃ¦â€”Â¥Ã¥Â¿â€”Ã¦Ë†â€“Ã©â€â„¢Ã¨Â¯Â¯Ã¦Â¶Ë†Ã¦ÂÂ¯Ã¤Â¸Â­Ã¦Â²Â¡Ã¦Å“â€°Ã¥Â¯â€ Ã©â€™Â¥
* \[ ] Ã¥Â¯â€ Ã©â€™Â¥Ã¨Â®Â¿Ã©â€”Â®Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨Ã¥Â®Â¡Ã¨Â®Â¡Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢

### 3. Ã§Â½â€˜Ã§Â»Å“Ã¥Â®â€°Ã¥â€¦Â¨

#### VPC Ã¥â€™Å’Ã©ËœÂ²Ã§ÂÂ«Ã¥Â¢â„¢Ã©â€¦ÂÃ§Â½Â®

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

#### Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â­Â¥Ã©ÂªÂ¤

* \[ ] Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œÃ¦Å“ÂªÃ¥â€¦Â¬Ã¥Â¼â‚¬Ã¨Â®Â¿Ã©â€”Â®
* \[ ] SSH/RDPÃ§Â«Â¯Ã¥ÂÂ£Ã¤Â»â€¦Ã©â„¢ÂVPN/Ã¥Â Â¡Ã¥Å¾â€™Ã¦Å“ÂºÃ¨Â®Â¿Ã©â€”Â®
* \[ ] Ã¥Â®â€°Ã¥â€¦Â¨Ã§Â»â€žÃ©ÂÂµÃ¥Â¾ÂªÃ¦Å“â‚¬Ã¥Â°ÂÃ¦ÂÆ’Ã©â„¢ÂÃ¥Å½Å¸Ã¥Ë†â„¢
* \[ ] Ã§Â½â€˜Ã§Â»Å“ACLÃ¥Â·Â²Ã©â€¦ÂÃ§Â½Â®
* \[ ] VPCÃ¦ÂµÂÃ¦â€”Â¥Ã¥Â¿â€”Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨

### 4. Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢Ã¤Â¸Å½Ã§â€ºâ€˜Ã¦Å½Â§

#### CloudWatch/Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢Ã©â€¦ÂÃ§Â½Â®

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

#### Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â­Â¥Ã©ÂªÂ¤

* \[ ] Ã¦â€°â‚¬Ã¦Å“â€°Ã¦Å“ÂÃ¥Å Â¡Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨CloudWatch/Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢
* \[ ] Ã¥Â¤Â±Ã¨Â´Â¥Ã§Å¡â€žÃ¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¥Â°ÂÃ¨Â¯â€¢Ã¥Â·Â²Ã¨Â®Â°Ã¥Â½â€¢
* \[ ] Ã§Â®Â¡Ã§Ââ€ Ã¥â€˜ËœÃ¦â€œÂÃ¤Â½Å“Ã¥Â·Â²Ã¥Â®Â¡Ã¨Â®Â¡
* \[ ] Ã¦â€”Â¥Ã¥Â¿â€”Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“Å¸Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®Ã¯Â¼Ë†Ã¥ÂË†Ã¨Â§â€žÃ¨Â¦ÂÃ¦Â±â€š90Ã¥Â¤Â©Ã¤Â»Â¥Ã¤Â¸Å Ã¯Â¼â€°
* \[ ] Ã¤Â¸ÂºÃ¥ÂÂ¯Ã§â€“â€˜Ã¦Â´Â»Ã¥Å Â¨Ã©â€¦ÂÃ§Â½Â®Ã¤Âºâ€ Ã¨Â­Â¦Ã¦Å Â¥
* \[ ] Ã¦â€”Â¥Ã¥Â¿â€”Ã¥Â·Â²Ã©â€ºâ€ Ã¤Â¸Â­Ã¥Â­ËœÃ¥â€šÂ¨Ã¤Â¸â€Ã©ËœÂ²Ã§Â¯Â¡Ã¦â€Â¹

### 5. CI/CD Ã¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿Ã¥Â®â€°Ã¥â€¦Â¨

#### Ã¥Â®â€°Ã¥â€¦Â¨Ã¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿Ã©â€¦ÂÃ§Â½Â®

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
        uses: trufflesecurity/trufflehog@main

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

#### Ã¤Â¾â€ºÃ¥Âºâ€Ã©â€œÂ¾Ã¥Â®â€°Ã¥â€¦Â¨

```json
// package.json - Use lock files and integrity checks
{
  "scripts": {
    "install": "npm ci",  // Use ci for reproducible builds
    "audit": "npm audit --audit-level=moderate",
    "check": "npm outdated"
  }
}
```

#### Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â­Â¥Ã©ÂªÂ¤

* \[ ] Ã¤Â½Â¿Ã§â€Â¨OIDCÃ¨â‚¬Å’Ã©ÂÅ¾Ã©â€¢Â¿Ã¦Å“Å¸Ã¥â€¡Â­Ã¨Â¯Â
* \[ ] Ã¦ÂµÂÃ¦Â°Â´Ã§ÂºÂ¿Ã¤Â¸Â­Ã¨Â¿â€ºÃ¨Â¡Å’Ã¥Â¯â€ Ã©â€™Â¥Ã¦â€°Â«Ã¦ÂÂ
* \[ ] Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¦Â¼ÂÃ¦Â´Å¾Ã¦â€°Â«Ã¦ÂÂ
* \[ ] Ã¥Â®Â¹Ã¥â„¢Â¨Ã©â€¢Å“Ã¥Æ’ÂÃ¦â€°Â«Ã¦ÂÂÃ¯Â¼Ë†Ã¥Â¦â€šÃ©â‚¬â€šÃ§â€Â¨Ã¯Â¼â€°
* \[ ] Ã¥Ë†â€ Ã¦â€Â¯Ã¤Â¿ÂÃ¦Å Â¤Ã¨Â§â€žÃ¥Ë†â„¢Ã¥Â·Â²Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’
* \[ ] Ã¥ÂË†Ã¥Â¹Â¶Ã¥â€°ÂÃ©Å“â‚¬Ã¨Â¦ÂÃ¤Â»Â£Ã§Â ÂÃ¥Â®Â¡Ã¦Å¸Â¥
* \[ ] Ã¥Â·Â²Ã¥Â¼ÂºÃ¥Ë†Â¶Ã¦â€°Â§Ã¨Â¡Å’Ã§Â­Â¾Ã¥ÂÂÃ¦ÂÂÃ¤ÂºÂ¤

### 6. Cloudflare Ã¤Â¸Å½ CDN Ã¥Â®â€°Ã¥â€¦Â¨

#### Cloudflare Ã¥Â®â€°Ã¥â€¦Â¨Ã©â€¦ÂÃ§Â½Â®

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

#### WAF Ã¨Â§â€žÃ¥Ë†â„¢

```bash
# Enable Cloudflare WAF managed rules
# - OWASP Core Ruleset
# - Cloudflare Managed Ruleset
# - Rate limiting rules
# - Bot protection
```

#### Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â­Â¥Ã©ÂªÂ¤

* \[ ] WAFÃ¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨Ã¥Â¹Â¶Ã©â€¦ÂÃ§Â½Â®OWASPÃ¨Â§â€žÃ¥Ë†â„¢
* \[ ] Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®Ã©â‚¬Å¸Ã§Å½â€¡Ã©â„¢ÂÃ¥Ë†Â¶
* \[ ] Ã¦Å“ÂºÃ¥â„¢Â¨Ã¤ÂºÂºÃ©ËœÂ²Ã¦Å Â¤Ã¥Â·Â²Ã¦Â¿â‚¬Ã¦Â´Â»
* \[ ] DDoSÃ©ËœÂ²Ã¦Å Â¤Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨
* \[ ] Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â â€¡Ã¥Â¤Â´Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®
* \[ ] SSL/TLSÃ¤Â¸Â¥Ã¦Â Â¼Ã¦Â¨Â¡Ã¥Â¼ÂÃ¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨

### 7. Ã¥Â¤â€¡Ã¤Â»Â½Ã¤Â¸Å½Ã§ÂÂ¾Ã©Å¡Â¾Ã¦ÂÂ¢Ã¥Â¤Â

#### Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¥Â¤â€¡Ã¤Â»Â½

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

#### Ã©ÂªÅ’Ã¨Â¯ÂÃ¦Â­Â¥Ã©ÂªÂ¤

* \[ ] Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¦Â¯ÂÃ¦â€”Â¥Ã¥Â¤â€¡Ã¤Â»Â½
* \[ ] Ã¥Â¤â€¡Ã¤Â»Â½Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“Å¸Ã§Â¬Â¦Ã¥ÂË†Ã¥ÂË†Ã¨Â§â€žÃ¨Â¦ÂÃ¦Â±â€š
* \[ ] Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨Ã¦â€”Â¶Ã©â€”Â´Ã§â€šÂ¹Ã¦ÂÂ¢Ã¥Â¤Â
* \[ ] Ã¦Â¯ÂÃ¥Â­Â£Ã¥ÂºÂ¦Ã¦â€°Â§Ã¨Â¡Å’Ã¥Â¤â€¡Ã¤Â»Â½Ã¦Âµâ€¹Ã¨Â¯â€¢
* \[ ] Ã§ÂÂ¾Ã©Å¡Â¾Ã¦ÂÂ¢Ã¥Â¤ÂÃ¨Â®Â¡Ã¥Ë†â€™Ã¥Â·Â²Ã¨Â®Â°Ã¥Â½â€¢
* \[ ] RPOÃ¥â€™Å’RTOÃ¥Â·Â²Ã¥Â®Å¡Ã¤Â¹â€°Ã¥Â¹Â¶Ã§Â»ÂÃ¨Â¿â€¡Ã¦Âµâ€¹Ã¨Â¯â€¢

## Ã©Æ’Â¨Ã§Â½Â²Ã¥â€°ÂÃ¤Âºâ€˜Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Â£â‚¬Ã¦Å¸Â¥Ã¦Â¸â€¦Ã¥Ââ€¢

Ã¥Å“Â¨Ã¤Â»Â»Ã¤Â½â€¢Ã§â€Å¸Ã¤ÂºÂ§Ã¤Âºâ€˜Ã©Æ’Â¨Ã§Â½Â²Ã¤Â¹â€¹Ã¥â€°ÂÃ¯Â¼Å¡

* \[ ] **IAM**Ã¯Â¼Å¡Ã¦Å“ÂªÃ¤Â½Â¿Ã§â€Â¨Ã¦Â Â¹Ã¨Â´Â¦Ã¦Ë†Â·Ã¯Â¼Å’Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨MFAÃ¯Â¼Å’Ã¦Å“â‚¬Ã¥Â°ÂÃ¦ÂÆ’Ã©â„¢ÂÃ§Â­â€“Ã§â€¢Â¥
* \[ ] **Ã¥Â¯â€ Ã©â€™Â¥**Ã¯Â¼Å¡Ã¦â€°â‚¬Ã¦Å“â€°Ã¥Â¯â€ Ã©â€™Â¥Ã©Æ’Â½Ã¥Å“Â¨Ã¤Âºâ€˜Ã¥Â¯â€ Ã©â€™Â¥Ã§Â®Â¡Ã§Ââ€ Ã¥â„¢Â¨Ã¤Â¸Â­Ã¥Â¹Â¶Ã¥Â·Â²Ã©â€¦ÂÃ§Â½Â®Ã¨Â½Â®Ã¦ÂÂ¢
* \[ ] **Ã§Â½â€˜Ã§Â»Å“**Ã¯Â¼Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã§Â»â€žÃ¥Ââ€”Ã©â„¢ÂÃ¯Â¼Å’Ã¦â€”Â Ã¥â€¦Â¬Ã¥Â¼â‚¬Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Âºâ€œ
* \[ ] **Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢**Ã¯Â¼Å¡Ã¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨CloudWatch/Ã¦â€”Â¥Ã¥Â¿â€”Ã¨Â®Â°Ã¥Â½â€¢Ã¥Â¹Â¶Ã©â€¦ÂÃ§Â½Â®Ã¤Â¿ÂÃ§â€¢â„¢Ã¦Å“Å¸
* \[ ] **Ã§â€ºâ€˜Ã¦Å½Â§**Ã¯Â¼Å¡Ã¤Â¸ÂºÃ¥Â¼â€šÃ¥Â¸Â¸Ã¦Æ’â€¦Ã¥â€ ÂµÃ©â€¦ÂÃ§Â½Â®Ã¤Âºâ€ Ã¨Â­Â¦Ã¦Å Â¥
* \[ ] **CI/CD**Ã¯Â¼Å¡OIDCÃ¨ÂºÂ«Ã¤Â»Â½Ã©ÂªÅ’Ã¨Â¯ÂÃ¯Â¼Å’Ã¥Â¯â€ Ã©â€™Â¥Ã¦â€°Â«Ã¦ÂÂÃ¯Â¼Å’Ã¤Â¾ÂÃ¨Âµâ€“Ã©Â¡Â¹Ã¥Â®Â¡Ã¨Â®Â¡
* \[ ] **CDN/WAF**Ã¯Â¼Å¡Cloudflare WAFÃ¥Â·Â²Ã¥ÂÂ¯Ã§â€Â¨Ã¥Â¹Â¶Ã©â€¦ÂÃ§Â½Â®OWASPÃ¨Â§â€žÃ¥Ë†â„¢
* \[ ] **Ã¥Å Â Ã¥Â¯â€ **Ã¯Â¼Å¡Ã©Ââ„¢Ã¦â‚¬ÂÃ¥â€™Å’Ã¤Â¼Â Ã¨Â¾â€œÃ¤Â¸Â­Ã§Å¡â€žÃ¦â€¢Â°Ã¦ÂÂ®Ã¥Ââ€¡Ã¥Â·Â²Ã¥Å Â Ã¥Â¯â€ 
* \[ ] **Ã¥Â¤â€¡Ã¤Â»Â½**Ã¯Â¼Å¡Ã¨â€¡ÂªÃ¥Å Â¨Ã¥Å’â€“Ã¥Â¤â€¡Ã¤Â»Â½Ã¥Â¹Â¶Ã¥Â·Â²Ã¦Âµâ€¹Ã¨Â¯â€¢Ã¦ÂÂ¢Ã¥Â¤Â
* \[ ] **Ã¥ÂË†Ã¨Â§â€žÃ¦â‚¬Â§**Ã¯Â¼Å¡Ã¦Â»Â¡Ã¨Â¶Â³GDPR/HIPAAÃ¨Â¦ÂÃ¦Â±â€šÃ¯Â¼Ë†Ã¥Â¦â€šÃ©â‚¬â€šÃ§â€Â¨Ã¯Â¼â€°
* \[ ] **Ã¦â€“â€¡Ã¦Â¡Â£**Ã¯Â¼Å¡Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¨Â®Â¾Ã¦â€“Â½Ã¥Â·Â²Ã¨Â®Â°Ã¥Â½â€¢Ã¯Â¼Å’Ã¥Â·Â²Ã¥Ë†â€ºÃ¥Â»ÂºÃ¦â€œÂÃ¤Â½Å“Ã¦â€°â€¹Ã¥â€ Å’
* \[ ] **Ã¤Âºâ€¹Ã¤Â»Â¶Ã¥â€œÂÃ¥Âºâ€**Ã¯Â¼Å¡Ã¥Â·Â²Ã¥Ë†Â¶Ã¥Â®Å¡Ã¥Â®â€°Ã¥â€¦Â¨Ã¤Âºâ€¹Ã¤Â»Â¶Ã¨Â®Â¡Ã¥Ë†â€™

## Ã¥Â¸Â¸Ã¨Â§ÂÃ¤Âºâ€˜Ã¥Â®â€°Ã¥â€¦Â¨Ã©â€¦ÂÃ§Â½Â®Ã©â€â„¢Ã¨Â¯Â¯

### S3 Ã¥Â­ËœÃ¥â€šÂ¨Ã¦Â¡Â¶Ã¦Å¡Â´Ã©Å“Â²

```bash
# FAIL: WRONG: Public bucket
aws s3api put-bucket-acl --bucket my-bucket --acl public-read

# PASS: CORRECT: Private bucket with specific access
aws s3api put-bucket-acl --bucket my-bucket --acl private
aws s3api put-bucket-policy --bucket my-bucket --policy file://policy.json
```

### RDS Ã¥â€¦Â¬Ã¥Â¼â‚¬Ã¨Â®Â¿Ã©â€”Â®

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

## Ã¨Âµâ€žÃ¦ÂºÂ

* [AWS Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ](https://aws.amazon.com/security/best-practices/)
* [CIS AWS Ã¥Å¸ÂºÃ§Â¡â‚¬Ã¥Å¸ÂºÃ¥â€¡â€ ](https://www.cisecurity.org/benchmark/amazon_web_services)
* [Cloudflare Ã¥Â®â€°Ã¥â€¦Â¨Ã¦â€“â€¡Ã¦Â¡Â£](https://developers.cloudflare.com/security/)
* [OWASP Ã¤Âºâ€˜Ã¥Â®â€°Ã¥â€¦Â¨](https://owasp.org/www-project-cloud-security/)
* [Terraform Ã¥Â®â€°Ã¥â€¦Â¨Ã¦Å“â‚¬Ã¤Â½Â³Ã¥Â®Å¾Ã¨Â·Âµ](https://www.terraform.io/docs/cloud/guides/recommended-practices/)

**Ã¨Â¯Â·Ã¨Â®Â°Ã¤Â½Â**Ã¯Â¼Å¡Ã¤Âºâ€˜Ã©â€¦ÂÃ§Â½Â®Ã©â€â„¢Ã¨Â¯Â¯Ã¦ËœÂ¯Ã¦â€¢Â°Ã¦ÂÂ®Ã¦Â³â€žÃ©Å“Â²Ã§Å¡â€žÃ¤Â¸Â»Ã¨Â¦ÂÃ¥Å½Å¸Ã¥â€ºÂ Ã£â‚¬â€šÃ¤Â¸â‚¬Ã¤Â¸ÂªÃ¦Å¡Â´Ã©Å“Â²Ã§Å¡â€žS3Ã¥Â­ËœÃ¥â€šÂ¨Ã¦Â¡Â¶Ã¦Ë†â€“Ã¤Â¸â‚¬Ã¤Â¸ÂªÃ¦ÂÆ’Ã©â„¢ÂÃ¨Â¿â€¡Ã¥Â¤Â§Ã§Å¡â€žIAMÃ§Â­â€“Ã§â€¢Â¥Ã¥Â°Â±Ã¥ÂÂ¯Ã¨Æ’Â½Ã¥ÂÂ±Ã¥ÂÅ Ã¦â€¢Â´Ã¤Â¸ÂªÃ¥Å¸ÂºÃ§Â¡â‚¬Ã¨Â®Â¾Ã¦â€“Â½Ã£â‚¬â€šÃ¥Â§â€¹Ã§Â»Ë†Ã©ÂÂµÃ¥Â¾ÂªÃ¦Å“â‚¬Ã¥Â°ÂÃ¦ÂÆ’Ã©â„¢ÂÃ¥Å½Å¸Ã¥Ë†â„¢Ã¥â€™Å’Ã¦Â·Â±Ã¥ÂºÂ¦Ã©ËœÂ²Ã¥Â¾Â¡Ã§Â­â€“Ã§â€¢Â¥Ã£â‚¬â€š
