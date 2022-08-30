import { CreateTableCommand } from '@aws-sdk/client-dynamodb';
import { ddbClient } from './dynamoDbClient';
const params = {
  AttributeDefinitons: [
    {
      AttributeName: 'Season',
      AttributeType: 'N',
    },
    {
      AttributeName: 'Episode',
      AttributeType: 'N',
    },
    {
      AttributeName: 'Transmitted',
      AttributeType: 'BOOL',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'Season',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'Episode',
      KeyType: 'RANGE',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: 'EPISODE',
  StreamSpecification: {
    StreamEnabled: false,
  },
};

export const run = async () => {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log('Table created', data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
run();
