import type { AWS } from '@serverless/typescript';

export const makeDynamoDbTables = (): AWS['resources']['Resources'] => {
  return {
    ListTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: '${self:provider.environment.LIST_TABLE}',
        DeletionPolicy: 'Retain',
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' }
        ],
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 2,
          WriteCapacityUnits: 2
        }
      }
    },
    TasksTable: {
      Type: 'AWS::DynamoDB::Table',
      DeletionPolicy: 'Retain',
      Properties: {
        TableName: '${self:provider.environment.TASKS_TABLE}',
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
          { AttributeName: 'listId', AttributeType: 'S' }
        ],
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' },
          { AttributeName: 'listId', KeyType: 'RANGE' }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 2,
          WriteCapacityUnits: 2
        },
        GlobalSecondaryIndexes: [
          {
            IndexName: 'list_index',
            KeySchema: [
              { AttributeName: 'listId', KeyType: 'HASH' },
            ],
            Projection: { // attributes to project into the index
              ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
              ReadCapacityUnits: 2,
              WriteCapacityUnits: 2
            },
          }
        ]
      }
    }
  };
}