const express = require('express')
const router = express.Router()

const classDB = require('../../schemas/class')
const liveDB = require('../../schemas/lIve')
// 新增直播
router.post('/addLive', async (req, res) => {
    const {
        // 直播标题 
        liveName,
        // 直播时长
        liveDuration,
        // 直播讲师
        teacher,
        // 直播时间
        liveTime,
        className,
        courseName,
        _id
    } = req.body
    if (className && liveTime && _id && liveName && liveDuration && teacher && courseName) {
        // 哪个为空都不行 全都有值才能走进来
        try {
            //根据id 向liveList添加数据
            await liveDB.findByIdAndUpdate({ _id }, {
                $push: {
                    liveList: {
                        className,
                        courseName,
                        liveName,
                        teacher,
                        liveTime: new Date(liveTime) / 1,
                        liveDuration: liveDuration / 1
                    }
                }
            })
        } catch (err) {
            return res.send({
                code: 1,
                txt: '新增直播失败'
            })
        }
        res.send({ code: 0, txt: '新增直播成功' })
    } else {

        res.send({ code: 2, txt: '新增直播失败' })

    }
})

// 删除直播接口
router.post('/deleteLive', async (req, res) => {
    const {
        // 外侧的id
        _id,
        // 内侧的id
        id } = req.body
    try {
        // 根据外侧的id来删除liveList内侧的id对应的项
        await liveDB.findByIdAndUpdate({ _id }, {
            $pull: {
                liveList: { _id: id }
            }
        })
    } catch (error) {
        return res.send({ code: 1, txt: '删除失败' })
    }
    res.send({ code: 0, txt: '删除成功' })
})

// 修改直播
router.post('/reviseLive', async (req, res) => {
    const {
        // 直播标题 
        liveName,
        // 直播时长
        liveDuration,
        // 直播讲师
        teacher,
        // 直播时间
        liveTime,
        // 外层id
        _id,
        // 内层id
        id
    } = req.body
    if (liveTime && _id && liveName && liveDuration && teacher && id) {
        // 哪个为空都不行 全都有值才能走进来
        const data = await liveDB.findById({ _id })
        if (data) {
            const reviseObj = data.liveList.find(item => item._id.toString() === id)
            reviseObj.liveDuration = liveDuration
            reviseObj.teacher = teacher
            reviseObj.liveTime = liveTime
            reviseObj.liveName = liveName

            liveDB.findByIdAndUpdate({ _id }, { liveList: data.liveList }).then(() => {
                res.send({ code: 0, txt: '修改直播成功' })
            }).catch(() => {
                res.send({ code: 1, txt: '修改直播失败' })
            })
        }
    } else {
        res.send({ code: 2, txt: '修改直播失败' })
    }
})

// 获取直播 
router.get('/liveList', async (req, res) => {
    const { liveName, liveTime, pageSize, currentPage } = req.query
    let data = await liveDB.find()
  
    data = data.filter(item => item.liveList[0].className === 'web-前端进阶框架-朱雀')[0]
    // 8.15
  
    // 7.15 9.15
    // 筛选时间  
    if (liveTime) {
      let startTime = new Date(liveTime[0]) / 1
      let endTime = new Date(liveTime[1]) / 1
  
      data.liveList = data.liveList.filter(item => item.liveTime >= startTime && item.liveTime <= endTime)
    }
    // 筛选直播名
    if (liveName) {
      data.liveList = data.liveList.filter(item => item.liveName.includes(liveName))
    }
  
    const total = data.liveList.length
  
    data.liveList= data.liveList.sort((a, b) => b.liveTime - a.liveTime)
  
    data.liveList = data.liveList.splice((currentPage - 1) * pageSize, pageSize)
  
    res.send({
      code: 0,
      total,
      data
    })
  })
module.exports = router