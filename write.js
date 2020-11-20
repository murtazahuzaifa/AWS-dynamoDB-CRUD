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

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
// for saving single items
const save = () => {

    var input = {
        id: '3', name: "flower pot", price: 150
    };
    var params = {
        TableName: "products",
        Item: input
    };
    documentClient.put(params, function (err, data) {

        if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::save::success", JSON.stringify(data, null, 2));
        }
    });
}
// save();



// for saving multiple items
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#batchGet-property
const writeMultipleItems = () => {
    documentClient.batchWrite({
        RequestItems: {
            "products": [
                { PutRequest: { Item: { id: '4', name: "Bag", price: 250, } } },
                { PutRequest: { Item: { id: '5', name: "Shoes", price: 350 } } },
            ]
        }

    }, (err, data) => {
        if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::save::success", JSON.stringify(data, null, 2));
        }
    });
}
writeMultipleItems();