const express = require('express')
const router = express.Router()
const path = require('path')
const studentDB = require('../../schemas/student')

// 获取学员
router.get('/studentList', async (req, res) => {
    // 前端要 具体页数currentPage 具体的数据条数pageSize 筛选项: kindName(类别) courseName(课程) className(班期) 
    let {
        kindName,
        courseName,
        className,
        currentPage,
        pageSize } = req.query

    // console.log(
    //     kindName,
    //     courseName,
    //     className,
    //     currentPage, // 1 页码
    //     pageSize); // 10 一页数据条数 
    let data = await studentDB.find()
    // 总数
    const total = data.length
    //根据筛选条件进行数据的一轮筛选
    if (kindName) {
        // filter不改变原数组
        data = data.filter(item => item.kindName === kindName)
    }
    if (courseName) {
        data = data.filter(item => item.courseName)
    }
    if (className) {
        data = data.filter(item => item.className.includes(className))
    }
    // 对更新时间进行倒排序  sort改变原数组
    data.sort((a, b) => {
        return b.updateTime - a.updateTime
    })


    // 假设 currentpage(当前页)是1  pagesize(页面内容) 5   
    // currentpage是2 pagesize 5
    // currentpage是3
    // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21
    // 返回splice切下来的数组 数组下标从0开始
    data = data.splice((currentPage - 1) * pageSize, pageSize)
    // 0 5  (1 - 1) * 5
    // 5 5  (2 - 1) * 5
    // 10 5  (3 - 1) * 5
    // 15 5  (4 - 1) * 5
    // console.log(data.length);
    res.send({
        code: 0,
        data,
        total
    })
})

// 获取课程分类对象
router.get('/courseObj', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dataJson/courseObj.json'))
})

// 修改学员信息
router.post('/reviseStudent', async (req, res) => {
    // 前端传来的信息 : 
    // {
    // "phoneNumber": '14149140198', // 查询对象
    // "name": "",
    // "wechat": "",
    // "QQ": "",
    // "card": "",
    // "age": "",
    // "sex": "",
    // "location": "", // 湖南省/长沙市 ["河北省", "唐山市"]
    // "education": ""
    // }

    // "湖南省/长沙市" 
    const student = req.body
    // 判断是不是数组
    if (Array.isArray(student.location)) {
        // 是数组形式 ["河北省", "唐山市"] => "河北省/唐山市"
        student.location = student.location.join('/')
    }
    //根据电话号码来修改用户信息
    await studentDB.updateOne({ phoneNumber: student.phoneNumber }, { info: student })
    res.send({
        code: 0,
        txt: '修改成功'
    })
})

// 修改学员班期
router.post('/reviseStudentClass', async (req, res) => {
    const { className, phoneNumber } = req.body
    // 通过电话号码来更新班期 (属性名和属性值一样省略)
    await studentDB.updateOne({ phoneNumber }, { className })
    res.send({
        code: 0,
        txt: '修改成功'
    })
})

// 修改课程是否启用
router.post('/reviseIsEnable', async (req, res) => {
    const { phoneNumber, isEnable } = req.body
    await studentDB.updateOne({ phoneNumber }, { isEnable: !isEnable })
    // true =>false关闭成功
    //false =>true 开启成功
    let txt = ''
    if (isEnable) {
        txt = '关闭成功'
    } else {
        txt = '开启成功'
    }

    res.send({
        code: 0,
        txt
    })
})









module.exports = router