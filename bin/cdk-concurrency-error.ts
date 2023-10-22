#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkConcurrencyErrorStack } from '../lib/cdk-concurrency-error-stack';

const app = new cdk.App();
new CdkConcurrencyErrorStack(app, 'CdkConcurrencyErrorStack-us', { env: { region: 'us-east-1' } });
new CdkConcurrencyErrorStack(app, 'CdkConcurrencyErrorStack-ap', { env: { region: 'ap-northeast-1' } });