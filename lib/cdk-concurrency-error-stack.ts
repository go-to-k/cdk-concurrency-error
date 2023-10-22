import * as cdk from 'aws-cdk-lib';
import { aws_iam, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CdkConcurrencyErrorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new aws_lambda.Function(this, "LambdaFunction", {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromInline('// dummy'),
      handler: "bootstrap",
    });

    lambda.role?.addManagedPolicy(
      aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaVPCAccessExecutionRole",
      ),
    );

    lambda.role?.addManagedPolicy(
      aws_iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaRole"),
    );

    lambda.role?.addManagedPolicy(
      aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AWSXRayDaemonWriteAccess"),
    );
  }
}
