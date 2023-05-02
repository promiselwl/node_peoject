const express = require('express')
const router = express.Router()
const courseDB = require('../../schemas/course')
const upload = require('../../middle/multer/coverImage')
const path = require('path')
// 获取课程列表
router.get('/courseList', async (req, res) => {
  const {
    kindName,
    courseName,
    currentPage,
    pageSize
  } = req.query

  let data = await courseDB.find()
  let kindNameOptions = data.map(item => item.kindName)
  // 过滤数组
  kindNameOptions = kindNameOptions.filter((item, index) =>  kindNameOptions.indexOf(item) === index)

  // 根据筛选条件进行数据的一轮筛选 
  // 筛选类别 
  if (kindName) { // 有传值时走进来
    data = data.filter(item => item.kindName === kindName)
  }
  // 筛选课程
  if (courseName) {
    data = data.filter(item => item.courseName.includes(courseName))
  }

  // 按照更新时间倒序排序 
  data.sort((a, b) => {
    return b.updateTime - a.updateTime // 倒叙排序 
  })

  //总数
  const total = data.length


  // 返回splice切下来的数组 
  data = data.splice((currentPage - 1) * pageSize, pageSize)


  res.send({
    code: 0,
    data,
    total,
    kindNameOptions
  })
})
// 修改课程信息
router.post('/reviseCourseBase', async (req, res) => {
  const { courseName, downPrice, originalPrice, sellingPrice } = req.body
  await courseDB.findOneAndUpdate({ courseName }, { downPrice, originalPrice, sellingPrice }).then(data => {
    // 修改成功
    res.send({ code: 0, txt: "修改课程信息成功" })
  }).catch(err => {
    // 修改不成功
    res.send({ code: 1, txt: "修改课程信息失败" })
  })
})


// 修改课程封面接口
router.post('/reviseCourseCover', upload.single('file'), (req, res) => {
  const { courseName, description } = req.body
  if (description) {
    // 有描述 根据课程名称改描述
    courseDB.findOneAndUpdate({ courseName }, { description }).then(() => { })
  }
  if (req.file) {
    let coverImage = `/images/coverImage/${req.file.filename}`
    // 有上传文件  根据课程名称修改封面
    courseDB.findOneAndUpdate({ courseName }, { coverImage }).then(() => { })
  }
  res.send({
    code: 0,
    txt: '修改封面信息成功'
  })
})

module.exports = router

