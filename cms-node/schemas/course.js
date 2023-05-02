//创建表规则 得到表操作对象 
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  // 前端\后端\日语\原画 
  // 项目类别
  kindName: {
    type: String,
    required: true
  },
  // 课程名称
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  // 售价
  sellingPrice: {
    type: Number,
    required: true
  },
  // 原价
  originalPrice: {
    type: Number,
    required: true
  },
  // 底价
  downPrice: {
    type: Number,
    required: true
  },
  // 是否在售
  isSale: {
    type: Boolean,
    default: true
  },
  // 更新人
  updatePeople: {
    type: String
  },
  // 更新时间
  updateTime: {
    type: Number,
  },
  // 课程描述
  description: {
    type: String,
  },
  // 封面图片
  coverImage: {
    type: String,
  }
})


module.exports = mongoose.model('course', courseSchema)