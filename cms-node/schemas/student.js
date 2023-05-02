// 创建 student表规则
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// student的表规则
const studentSchema = new Schema({
  // 电话号码
  phoneNumber: {
    type: Number,
    required: true,
    unique: true
  },
  // 课程类别  前端 后端 
  kindName: {
    type: String,
    required: true,
  },
  // 课程名称 前端全栈班
  courseName: {
    type: String,
    required: true,
  },
  // 班期名称 : 39期鲁班老师...
  className: {
    type: String,
    required: true,
  },
  // 来源 : 后台导入?自主注册
  origin: {
    type: String,
    default: '自主注册'
  },
  // 是否启用课程 : true?false
  isEnable: {
    type: Boolean,
    default: true
  },
  // 更新人
  updatePeople: {
    type: String,
    required: true
  },
  // 更新时间
  updateTime: {
    type: Number,
    required: true
  },
  info: {
    // 电话号码
    phoneNumber: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      default: ''
    },
    // 微信
    wechat: {
      type: String,
      default: ''
    },
    QQ: {
      type: String,
      default: ''
    },
    // 身份证
    card: {
      type: String,
      default: ''
    },
    // 年龄
    age: {
      type: String,
      default: ''
    },
    // 性别
    sex: {
      type: String,
      default: ''
    },
    // 地理位置
    location: {
      type: String,
      default: ''
    },
    // 学历信息
    education: {
      type: String,
      default: ''
    },

  }
})
module.exports = mongoose.model('student', studentSchema) 