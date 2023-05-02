const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
// const history = require('connect-history-api-fallback')
// app.use(history())

// 不是中间件直接引入
require('./middle/mongoose')  //引入连接数据库的配置项
require('./addData')

// json的解析
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./dist'))

//cookie的解析
app.use(cookieParser())
// 作为中间价导入session(session中间件的使用)
app.use(require('./middle/session'))

app.use('/', require('./router'))
app.listen(5252, () => {
    console.log('http://localhost:5252');
})