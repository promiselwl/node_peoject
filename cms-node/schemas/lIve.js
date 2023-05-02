//创建表规则 得到表操作对象 
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const liveSchema = new Schema({
  liveList: [
    {
      // 课程名称
      courseName: {
        type: String,
        required: true,
      },
      // 班期名称
      className: {
        type: String,
        required: true,
      },
      // 直播标题
      liveName: {
        type: String,
        required: true,
      },
      // 直播时间
      liveTime: {
        type: Number,
        required: true,
      },
      // 直播时长
      liveDuration: {
        type: Number,
        default: 0
      },
      // 讲师 
      teacher: {
        type: String,
      }
    }
  ]
})


module.exports = mongoose.model('live', liveSchema) 