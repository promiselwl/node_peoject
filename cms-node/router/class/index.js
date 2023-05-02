const express = require('express')
const router = express.Router()
const classDB = require('../../schemas/class')
const liveDB = require('../../schemas/lIve')

router.get('/classList', async (req, res) => {
    const {
        pageSize,
        currentPage,
        // 班期
        className,
        // 招生时间
        enrollTime
    } = req.query
    // 深度取值
    let data = await classDB.find().populate('liveList')
    // 8.15   8.25 招生时间  
    // 7.15  9.15 筛选项 要包含 招生时间 对象才能被找到 

    if (enrollTime) {
        // console.log(enrollTime);
        const startTime = new Date(enrollTime[0]) / 1
        const endTime = new Date(enrollTime[1]) / 1
        data = data.filter(item => startTime <= item.enrollTime[0] && endTime >= item.enrollTime[1])
    }
    if (className) {
        data = data.filter(item => item.className.includes(className))
    }

    const total = data.length
    data = data.splice((currentPage - 1) * pageSize, pageSize)

    res.send({
        code: 0,
        total,
        data
    })
})

module.exports = router