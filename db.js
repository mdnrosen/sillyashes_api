require('dotenv').config()
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb"); // CommonJS import




const client = new DynamoDBClient({
    region: process.env.AWS_REGION
})

const db = DynamoDBDocumentClient.from(client)





module.exports = { db }