// session的配置项  连接至数据库
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
module.exports = expressSession({
    name: '$lyf',
    secret: 'asdf', //秘钥随便给
    cookie: { maxAge: 1000 * 60 * 60 }, //过期时间 ms
    // 是否重置时间
    rolling:true,
    // 是否强制保存session
    resave:false,
    // 是否在session还未初始化就存储
    saveUninitialized:true,
    // 把session存储到数据库中
    store:connectMongo.create({
            mongoUrl:'mongodb://127.0.0.1:27017/cms'
    })
})