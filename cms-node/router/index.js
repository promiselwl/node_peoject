const express = require('express')
const router = express.Router()
// 登录 
router.use('/login', require('./login'))

// 前端菜单路由
router.use('/data', require('./data'))

// 学员管理
router.use('/student', require('./student'))

// 学员导入
router.use('/import', require('./import'))

// 课程
router.use('/course', require('./course'))

// 班期
router.use('/class', require('./class'))

// 直播
router.use('/live', require('./live'))

// 文章
router.use('/article',require('./article'))

module.exports = router