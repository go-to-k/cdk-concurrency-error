## Reproduction Steps

```bash
cdk deploy --all --concurrency 2
```

Then the following message is shown:

```

✨  Synthesis time: 3.07s

CdkConcurrencyErrorStack-us
CdkConcurrencyErrorStack-ap
This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).
Please confirm you intend to make the following modifications:

IAM Statement Changes
┌───┬───────────────────────────────────┬────────┬────────────────┬──────────────────────────────┬───────────┐
│   │ Resource                          │ Effect │ Action         │ Principal                    │ Condition │
├───┼───────────────────────────────────┼────────┼────────────────┼──────────────────────────────┼───────────┤
│ + │ ${LambdaFunction/ServiceRole.Arn} │ Allow  │ sts:AssumeRole │ Service:lambda.amazonaws.com │           │
└───┴───────────────────────────────────┴────────┴────────────────┴──────────────────────────────┴───────────┘
IAM Policy Changes
┌───┬───────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────┐
│   │ Resource                      │ Managed Policy ARN                                                                 │
├───┼───────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────┤
│ + │ ${LambdaFunction/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole     │
│ + │ ${LambdaFunction/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole │
│ + │ ${LambdaFunction/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaRole                   │
│ + │ ${LambdaFunction/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/AWSXRayDaemonWriteAccess                     │
└───┴───────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).
Please confirm you intend to make the following modifications:

IAM Statement Changes
┌───┬───────────────────────────────────┬────────┬────────────────┬──────────────────────────────┬───────────┐
│   │ Resource                          │ Effect │ Action         │ Principal                    │ Condition │
├───┼───────────────────────────────────┼────────┼────────────────┼──────────────────────────────┼───────────┤
│ + │ ${LambdaFunction/ServiceRole.Arn} │ Allow  │ sts:AssumeRole │ Service:lambda.amazonaws.com │           │
└───┴───────────────────────────────────┴────────┴────────────────┴──────────────────────────────┴───────────┘
IAM Policy Changes
┌───┬───────────────────────────────┬────────────────────────────────────────────────────────────────────────────────────┐
│   │ Resource                      │ Managed Policy ARN                                                                 │
├───┼───────────────────────────────┼────────────────────────────────────────────────────────────────────────────────────┤
│ + │ ${LambdaFunction/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole     │
│ + │ ${LambdaFunction/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole │
│ + │ ${LambdaFunction/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaRole                   │
│ + │ ${LambdaFunction/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/AWSXRayDaemonWriteAccess                     │
└───┴───────────────────────────────┴────────────────────────────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)


 ❌ Deployment failed: Error: "--require-approval" is enabled and stack includes security-sensitive updates, but concurrency is greater than 1 so we are unable to get a confirmation from the user
    at /Users/goto/pc/github/cdk-concurrency-error/node_modules/aws-cdk/lib/index.js:470:179289
    at withCorkedLogging (/Users/goto/pc/github/cdk-concurrency-error/node_modules/aws-cdk/lib/index.js:1:34861)
    at Object.deployStack2 [as deployStack] (/Users/goto/pc/github/cdk-concurrency-error/node_modules/aws-cdk/lib/index.js:470:179026)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async /Users/goto/pc/github/cdk-concurrency-error/node_modules/aws-cdk/lib/index.js:470:163159

"--require-approval" is enabled and stack includes security-sensitive updates, but concurrency is greater than 1 so we are unable to get a confirmation from the user
```

## --require-approval

- never
  - Approval is never required
- any-change
  - Requires approval on any IAM or security-group-related change
- broadening (default)
  - Requires approval when IAM statements or traffic rules are added; removals don't require approval

A default value is `broadening` (so it is **enabled**).

A concurrency is also greater than 1 and the stack includes security-sensitive updates, so the error occurred.
