/**
 * 连接mongoDB数据库
 */
let mongoClient = require('mongodb').MongoClient;
let assert = require('assert').strict; //断言，用来内部测试

//connection url
let url = 'mongodb://127.0.0.1:27017/shoppingDatabase'

mongoClient.connect(url, function(err, db) {
    assert.deepStrictEqual(null, err);
    console.log('connection successfully to server');
    db.close();
})