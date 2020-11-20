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


const delete_item = () => {
    var params = {
        TableName: 'products',
        Key: {
            id: '3'
        }
    };

    documentClient.delete(params, function (err, data) {
        if (err) {
            console.log("product::update::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("product::update::success " + JSON.stringify(data));
        }
    });
}
delete_item();