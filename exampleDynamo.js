import { CreateTableCommand, ExecuteStatementCommand, PutItemCommand, DescribeTableCommand, DeleteTableCommand } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddbClient } from './dynamoDbClient.js';
export const params = {
  TableName: 'EPISODES',
  AttributeDefinitions: [
    {
      AttributeName: 'Season',
      AttributeType: 'N',
    },
    {
      AttributeName: 'Episode',
      AttributeType: 'N',
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
  StreamSpecification: {
    StreamEnabled: false,
  },
};

export const createTable = async () => {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log('Table created', data);
  } catch (err) {
    console.error(err);
  }
};

export const addElement = async () => {
    try {
        const data = await ddbClient.send(new PutItemCommand(
            {
                TableName: 'EPISODES', 
                Item: {
                    Season: {N: "001"}, 
                    Episode: {N: "003"}, 
                    Transmitted: {BOOL: false}
                }
            }
        ));
        console.log(data); 
    } catch (err) {
        console.error(err);
    }
};
export const readElement = async() => {
    try {
        const data = await ddbClient.send(new ExecuteStatementCommand({
            Statement: "SELECT * FROM EPISODES WHERE Episode = ?", 
            Parameters: [{
                N: '003'
            }],
        }));
        console.log(data.Items);
        return "CIAO!"
    } catch(err) {
        console.error(err);
    }
}

export const updateElement = async() => {
    try {
        const data = await ddbClient.send(new ExecuteStatementCommand({
            Statement: "UPDATE EPISODES SET Transmitted=? WHERE Season=? AND Episode=?", 
            Parameters: [{
                BOOL: true}, 
                {N: '001'},
                {N: '001'}
            ],
        }));
        console.log(data.Items);
        return "CIAO!"
    } catch(err) {
        console.error(err);
    }
}

export const readAllElement = async() => {
    try {
        const data = await ddbClient.send(new ExecuteStatementCommand({
            Statement: "SELECT * FROM EPISODES"
        }));
        data.Items.forEach(function (element, index, array){
            console.log('Episode number: '+element.Episode.N+ ' of season number: '+element.Season.N+(
            element.Transmitted.BOOL? ' was transmitted' : ' was not transmitted'));
        });
    } catch(err) {
        console.error(err);
    }
}

export const describeTable = async() => {
    try {
        const data = await ddbClient.send(new DescribeTableCommand({
            TableName: 'EPISODES', 
        }));
        console.log(data);
        return console.log("CIAO!");
    } catch(err) {
        console.error(err);
    }
}

export const deleteItem = async() => {
    const params = {
        TableName: 'EPISODES', 
        Key: {
            'Season': {N:'1'},
            'Episode': {N:'3'}
        },
    }
    /* var params = {};
    params.TableName = "EPISODES";
    var key = {'Season' : '1', 'Episode' : '3'};
    params.Key = key; */
    try {
        const data = await ddbClient.send(new DeleteCommand(params));
        console.log(data);
    } catch(err) {
        console.error(err);
    }
} 

export const deleteTable = async() => {
    const params = {
        TableName: "EPISODES"
    };

    try {
        const data = await ddbClient.send(new DeleteTableCommand(params));
        console.log("success: ", data);
    } catch(err) {
        console.error("error:", err);
    } 
};
//deleteItem();
//createTable(); 
//addElement();
//readElement();
//updateElement(); 
//readAllElement();
describeTable();
//deleteTable(); 