// 创建userinfo的表规则
// 第三方包bcryptjs: npm i bcryptjs(用于加密密码)
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const Schema = mongoose.Schema
const userSchema = new Schema({
    // 姓名：
    username: {
        type: String,
        require: true,
        unique: true
    },
    //密码
    password: {
        type: String,
        require: true,  //保存密码的同时 转为加密值存入数据库中
        set(value) {
            return bcryptjs.hashSync(value, 10)  //加盐处理 value加盐的值 参数2加盐程度
        }
    },
    // 管理员
    admin: {
        type: Boolean,
        default: false
    },
    // 照片
    photo: {
        type: String,
        default: '/images/love.jpg'//默认图片
    }
})
module.exports = mongoose.model('userinfo', userSchema)