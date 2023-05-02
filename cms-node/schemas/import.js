//创建表规则 得到表操作对象 
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const importSchema = new Schema({
  // 文件名 
  filename: {
    type: String,
    required: true
  },
  // 导入时间
  time: {
    type: Number,
    required: true
  },
  // 导入人
  importPeople: {
    type: String,
    required: true
  },
  // 导入状态  0 1 2
  status: {
    type: Number,
    required: true
  },
  // 导入数据的总数
  total: {
    type: Number,
    required: true
  },
  // 成功存入数据库的数据数量
  succeedNum: {
    type: Number,
    required: true
  },
  // 存入数据库失败的数据数量
  errNum: {
    type: Number,
    required: true
  },
  // 不符合规则以及存入失败的数组
  errorStudent: {
    type: Array
  },
  // 成功上传至数据库的数组
  succeedStudent: {
    type: Array
  }
})


module.exports = mongoose.model('import', importSchema)