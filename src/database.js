const AWS = require('aws-sdk');

const client = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
});

function create(item) {
  const params = {
    TableName: 'Comments',
    Item: item,
    // Prevent overwritting an existing record
    ExpressionAttributeNames: { '#id': 'id' }, // don't think this rename is required?
    ExpressionAttributeValues: { ':id': item.id },
    ConditionExpression: '(#id <> :id)'
  };

  return new Promise((resolve, reject) => {
    client.put(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function read(id) {
  const params = {
    TableName: 'Comments',
    Key: { id }
  };

  return new Promise((resolve, reject) => {
    client.get(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function remove(id) {
  const params = {
    TableName: 'Comments',
    Key: { id }
  };

  return new Promise((resolve, reject) => {
    client.delete(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

module.exports = { create, delete: remove, read };
