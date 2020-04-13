const mongoose  = require('mongoose')

const Schema = mongoose.Schema;
const adminSchema = new Schema({
    user_name: String, //用户名
    password: String, //密码
    id: Number, //id主键
    create_time: String, //创建时间
    admin: { type: String, default: '管理员' }, //管理员标识
    status: Number, // 超级管理员: 1, 普通管理员 : 2
    city: String //用户|管理员所在城市 
})

//索引分类: 字段级别 和 Schema级别
adminSchema.index({id: 1}) //定义索引(Schem级别)
module.exports = mongoose.model('admin', adminSchema) //把schema转换为一个model