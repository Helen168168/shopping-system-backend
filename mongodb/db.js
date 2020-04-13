const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('../config/config')

const option = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferCommands: false, //mongoose离线时不缓存数据
    bufferMaxEntries: 0 //if not connected, return errors immediately rather than waiting for reconnect
}

mongoose.connect(config.url, option)
.then(res => {
    console.log(chalk.green('数据库连接成功'));
}),
err => {
    console.log(chalk.red('数据库连接失败!'));
    mongoose.disconnect();
}