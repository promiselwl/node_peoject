// 新增userinfo表数据 addData文件夹中index.js专门用来生成数据(后端手动运行)
const userinfoDB = require('../schemas/userinfo')  //引入表规则对象
// 新增数据
userinfoDB.create({
    username:'郑依韩',
    password:'zyh123456',
    admin:true
})