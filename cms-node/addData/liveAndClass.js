const liveDB = require('../schemas/live')
const classDB = require('../schemas/class')
// 2 代表3月份 3.6.20:30  
let date = new Date(2023, 2, 6, 20, 30)
// 朱雀的直播列表和班期
liveDB.create({
  liveList: [
    {
      // 课程名称
      courseName: 'web前端全栈进阶班',
      // 班期名称
      className: 'web-前端进阶框架-朱雀',
      // 标题
      liveName: '01 vue启程',
      // 直播时间
      liveTime: date - 1000 * 60 * 60 * 24 * 7,//过去七天
      // 直播时长
      liveDuration: 120,
      // 讲师
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '02 Vue指令',
      liveTime: date - 1000 * 60 * 60 * 24 * 6,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '03 Vue指令2',
      liveTime: date - 1000 * 60 * 60 * 24 * 5,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '04 Vue指令+配置项',
      liveTime: date - 1000 * 60 * 60 * 24 * 4,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '05 Vue选项',
      liveTime: date - 1000 * 60 * 60 * 24 * 3,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '06 生命周期',
      liveTime: date - 1000 * 60 * 60 * 24 * 2,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '07 组件',
      liveTime: date - 1000 * 60 * 60 * 24 * 1,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '08 组件通信',
      liveTime: date / 1,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '09 组件通信',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 1,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '10 Vue语法',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 2,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '11 Vue过渡',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 3,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '12 过渡动画',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 4,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '13 Vuex',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 5,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '14 vuex',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 6,
      liveDuration: 120,
      teacher: '朱雀',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '15 vue-router',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 7,
      liveDuration: 120,
      teacher: '朱雀',
    },
  ]
}).then(res => {
  let liveID = res._id
  // 拿到live的_id新建班期数据
  classDB.create({
    courseName: 'web前端全栈进阶班',
    className: 'web-前端进阶框架-朱雀',
    // 过去30-20的招生时间
    enrollTime: [date - 1000 * 60 * 60 * 24 * 30, date - 1000 * 60 * 60 * 24 * 20],
    studentNum: 100,
    updatePeople: '朱雀',
    // 创建班期的时间
    updateTime: date - 1000 * 60 * 60 * 24 * 30,
    liveList: liveID
  })
})

// 丸子的直播列表和班期
liveDB.create({
  liveList: [
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '01 vue启程',
      liveTime: date - 1000 * 60 * 60 * 24 * 7,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '02 Vue指令',
      liveTime: date - 1000 * 60 * 60 * 24 * 6,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '03 Vue指令2',
      liveTime: date - 1000 * 60 * 60 * 24 * 5,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '04 Vue指令+配置项',
      liveTime: date - 1000 * 60 * 60 * 24 * 4,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '05 Vue选项',
      liveTime: date - 1000 * 60 * 60 * 24 * 3,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '06 生命周期',
      liveTime: date - 1000 * 60 * 60 * 24 * 2,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '07 组件',
      liveTime: date - 1000 * 60 * 60 * 24 * 1,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '08 组件通信',
      liveTime: date / 1,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '09 组件通信',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 1,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '10 Vue语法',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 2,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '11 Vue过渡',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 3,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '12 过渡动画',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 4,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '13 Vuex',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 5,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '14 vuex',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 6,
      liveDuration: 120,
      teacher: '丸子',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-丸子',
      liveName: '15 vue-router',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 7,
      liveDuration: 120,
      teacher: '丸子',
    },
  ]
}).then(res => {
  let liveID = res._id
  // 班期
  classDB.create({
    courseName: 'web前端全栈进阶班',
    className: 'web-前端进阶框架-丸子',
    // 过去30-20的招生时间
    enrollTime: [date - 1000 * 60 * 60 * 24 * 30, date - 1000 * 60 * 60 * 24 * 20],
    studentNum: 100,
    updatePeople: '丸子',
    // 创建班期的时间
    updateTime: date - 1000 * 60 * 60 * 24 * 30,
    liveList: liveID
  })
})

// cherry的直播列表和班期
liveDB.create({
  liveList: [
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '01 vue启程',
      liveTime: date - 1000 * 60 * 60 * 24 * 7,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '02 Vue指令',
      liveTime: date - 1000 * 60 * 60 * 24 * 6,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '03 Vue指令2',
      liveTime: date - 1000 * 60 * 60 * 24 * 5,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '04 Vue指令+配置项',
      liveTime: date - 1000 * 60 * 60 * 24 * 4,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '05 Vue选项',
      liveTime: date - 1000 * 60 * 60 * 24 * 3,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '06 生命周期',
      liveTime: date - 1000 * 60 * 60 * 24 * 2,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '07 组件',
      liveTime: date - 1000 * 60 * 60 * 24 * 1,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '08 组件通信',
      liveTime: date / 1,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '09 组件通信',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 1,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '10 Vue语法',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 2,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '11 Vue过渡',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 3,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '12 过渡动画',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 4,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-朱雀',
      liveName: '13 Vuex',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 5,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '14 vuex',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 6,
      liveDuration: 120,
      teacher: 'cherry',
    },
    {
      courseName: 'web前端全栈进阶班',
      className: 'web-前端进阶框架-cherry',
      liveName: '15 vue-router',
      liveTime: date / 1 + 1000 * 60 * 60 * 24 * 7,
      liveDuration: 120,
      teacher: 'cherry',
    },
  ]
}).then(res => {
  let liveID = res._id
  // 班期
  classDB.create({
    courseName: 'web前端全栈进阶班',
    className: 'web-前端进阶框架-cherry',
    // 过去30-20的招生时间
    enrollTime: [date - 1000 * 60 * 60 * 24 * 30, date - 1000 * 60 * 60 * 24 * 20],
    studentNum: 100,
    updatePeople: 'cherry',
    // 创建班期的时间
    updateTime: date - 1000 * 60 * 60 * 24 * 30,
    liveList: liveID
  })
})