//创建表规则 得到表操作对象 
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const classSchema = new Schema({
  // 课程名称
  courseName: {
    type: String,
    required: true,
  },
  // 班期名称 
  className: {
    type: String,
    required: true,
    unique: true
  },
  // 招生时间
  enrollTime: {
    type: Array,
    required: true
  },
  // 学员人数 
  studentNum: {
    type: Number,
    default: 0
  },
  // 更新人 
  updatePeople: {
    type: String
  },
  //更新时间
  updateTime: {
    type: String,
  },
  // 直播列表 和直播表进行表关联  目的是为了拿到当前班期的直播列表 
  liveList: {
    type: Schema.Types.ObjectId,
    ref: "live"  //关联live表规则  live表名
  }
})


module.exports = mongoose.model('class', classSchema)