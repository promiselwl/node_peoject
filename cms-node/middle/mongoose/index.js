const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/cms', {
    useNewUrlParser: true,  //防止莫名报错的两条配置项
    useUnifiedTopology: true
}).then(() => {
    console.log('连接数据库成功');
}).catch(() => {
    console.log("连接数据库失败");
})
