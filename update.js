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


// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
const modify = () => {

    var params = {
        TableName: "products",
        Key: { "id": '5' },
        UpdateExpression: "set #name = :prodName, #price = :prodPrice",
        ExpressionAttributeNames: {'#name' : 'name', '#price' : 'price' },
        ExpressionAttributeValues: {
            ":prodName": "Sandles",
            ":prodPrice": 300
        },
        ReturnValues: "UPDATED_NEW" // NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW,

    };
    documentClient.update(params, function (err, data) {

        if (err) {
            console.log("product::update::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("product::update::success " + JSON.stringify(data));
        }
    });
}

modify();