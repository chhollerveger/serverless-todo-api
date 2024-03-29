import type { AWS } from '@serverless/typescript';
import { makeDynamoDbTables, makeFunctions } from './resources';

const serverlessConfiguration: AWS = {
  service: 'serverless-todo-api',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
    region: '${opt:region, self:provider.region}',
    stage: '${opt:stage, self:provider.stage}',
    list_table: '${self:service}-list-table-${opt:stage, self:provider.stage}',
    tasks_table: '${self:service}-tasks-table-${opt:stage, self:provider.stage}',
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        inMemory: true,
        heapInitial: '200m',
        heapMax: '1g',
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        // Uncomment only if you already have a DynamoDB running locally
        // noStart: true
      }
    },
    ['serverless-offline']: {
      httpPort: 3000,
      websocketPort: 3001,
      lambdaPort: 3002
    }
  },
  plugins: [
    'serverless-esbuild',
    'serverless-dynamodb-local',
    'serverless-offline',
    'serverless-dotenv-plugin'
  ],
  package: {
    individually: true,
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: '${env:ENV}',
    region: 'sa-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      REGION: '${self:custom.region}',
      STAGE: '${self:custom.stage}',
      DYNAMO_ENDPOINT: '${env:DYNAMO_ENDPOINT, "http://localhost:8000"}',
      LIST_TABLE: '${self:custom.list_table}',
      TASKS_TABLE: '${self:custom.tasks_table}',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:DescribeTable',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem'
        ],
        Resource: [
          { "Fn::GetAtt": ['ListTable', 'Arn'] },
          { "Fn::GetAtt": ['TasksTable', 'Arn'] }
        ]
      }
    ]
  },
  functions: makeFunctions(),
  resources: {
    Resources: makeDynamoDbTables()
  }
};

module.exports = serverlessConfiguration;
