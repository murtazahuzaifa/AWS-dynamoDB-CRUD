const AWS = require('aws-sdk');
require('dotenv').config();

const awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": process.env.ACCESS_KEY_ID,
    'secretAccessKey': process.env.SECRET_ACCESS_KEY,
};
AWS.config.update(awsConfig);

const documentClient = new AWS.DynamoDB.DocumentClient();


// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
const fetchOneByKey = () => {
    const params = {
        TableName: 'products',
        Key: {
            id: '1'
        },
        AttributesToGet: ['name', 'price'], // optional, if we want specific fields from the table
        // ConsistentRead: true,
        // ReturnConsumedCapacity: "INDEXES"
    };
    documentClient.get(params, (err, data) => {
        if (err) console.log(err);
        else console.log(JSON.stringify(data, null, 2));
    });
}
// fetchOneByKey();


// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#scan-property
const fetchAllData = () => {

    documentClient.scan({
        TableName: 'products'
    }, (err, data) => {
        if (err) console.log(err);
        else console.log(JSON.stringify(data, null, 2));
    });
}
fetchAllData();