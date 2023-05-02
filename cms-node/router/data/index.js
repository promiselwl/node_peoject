//菜单路由
const express = require('express')
const router = express.Router()
const  path =  require('path')

// 获取前端菜单路由/data/route
router.get('/route',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../dataJson/menuRoute.json'))
})

// 获取个人中心页面的功能数据 /data/feature
router.get('/feature',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../dataJson/feature.json'))
})

// 

module.exports = router