import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./dynamoDbClient";
const params = {
    AttributeDefinitons: [
        {
            AttributeName: "Season",
            AttributeType: "N"
        }, 
        {
            AttributeName: "Episode",
            AttributeType:"N"
        },
        {
            AttributeName: "Transmitted",
            AttributeType: "BOOL"
        }
    ], 
    KeySchema: [
        
    ]
}