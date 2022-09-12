import {EventBridgeClient, ActivateEventSourceCommand} from '@aws-sdk/client-eventbridge';

const client = new EventBridgeClient({region: 'eu-north-1'});
const params = {name:'test'};
const command = new ActivateEventSourceCommand(params);

const fun = async function() {
    try {
        const result = await client.send(command);
        console.log(result);
    } catch(err) {
        console.error(err);
    }
};
fun();