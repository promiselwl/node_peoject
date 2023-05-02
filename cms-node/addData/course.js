const courseDB = require("../schemas/course")


courseDB.create({
  kindName: '前端',
  // 课程名称
  courseName: "web前端基础班",
  // 原价
  originalPrice: 1750,
  // 售价
  sellingPrice: 1300,

  // 底价
  downPrice: 1300,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: 'web前端基础班',
  // 封面图片
  coverImage: '/images/coverImage/01.png',
  updateTime: Date.now()
})
courseDB.create({
  updateTime: Date.now(),
  kindName: '前端',
  // 课程名称
  courseName: "web前端全栈进阶班",
  // 原价
  originalPrice: 4080,
  // 售价
  sellingPrice: 4080,

  // 底价
  downPrice: 4080,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: 'web-前端全栈学习课程',
  // 封面图片
  coverImage: '/images/coverImage/02.png',
})

courseDB.create({
  updateTime: Date.now(),
  kindName: '后端',
  // 课程名称
  courseName: "Python基础核心语法",
  // 原价
  originalPrice: 1590,
  // 售价
  sellingPrice: 1390,

  // 底价
  downPrice: 1390,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: 'Python基础核心语法课程',
  // 封面图片
  coverImage: '/images/coverImage/03.png'
})
courseDB.create({
  updateTime: Date.now(),
  kindName: '后端',
  // 课程名称
  courseName: "Python全栈开发",
  // 原价
  originalPrice: 7880,
  // 售价
  sellingPrice: 7880,

  // 底价
  downPrice: 7880,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: 'Python全栈开发课程',
  // 封面图片
  coverImage: '/images/coverImage/04.png'
})


courseDB.create({
  updateTime: Date.now(),
  kindName: '日语',
  // 课程名称
  courseName: "日语初级班",
  // 原价
  originalPrice: 2180,
  // 售价
  sellingPrice: 2180,

  // 底价
  downPrice: 2180,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: '日语初级课程',
  // 封面图片
  coverImage: '/images/coverImage/05.png'
})
courseDB.create({
  updateTime: Date.now(),
  kindName: '日语',
  // 课程名称
  courseName: "日语进阶班",
  // 原价
  originalPrice: 2880,
  // 售价
  sellingPrice: 2880,

  // 底价
  downPrice: 1880,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: '日语进阶课程',
  // 封面图片
  coverImage: '/images/coverImage/06.png'
})
courseDB.create({
  updateTime: Date.now(),
  kindName: '日语',
  // 课程名称
  courseName: "日语N3一对一",
  // 原价
  originalPrice: 1880,
  // 售价
  sellingPrice: 1880,
  // 底价
  downPrice: 1880,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: '日语一对一课程',
  // 封面图片
  coverImage: '/images/coverImage/07.png'
})
courseDB.create({
  updateTime: Date.now(),
  kindName: '日语',
  // 课程名称
  courseName: "日语发音班",
  // 原价
  originalPrice: 1000,
  // 售价
  sellingPrice: 1000,
  // 底价
  downPrice: 1000,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: '日语发音班',
  // 封面图片
  coverImage: '/images/coverImage/09.png'
})
courseDB.create({
  updateTime: Date.now(),
  kindName: '日语',
  // 课程名称
  courseName: "日语零基础直达N1班",
  // 原价
  originalPrice: 9380,
  // 售价
  sellingPrice: 9380,
  // 底价
  downPrice: 9380,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: '日语零基础直达N1班',
  // 封面图片
  coverImage: '/images/coverImage/10.png'
})

courseDB.create({
  updateTime: Date.now(),
  kindName: '原画',
  // 课程名称
  courseName: "绘画基础班",
  // 原价
  originalPrice: 9180,
  // 售价
  sellingPrice: 9180,
  // 底价
  downPrice: 9180,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: '绘画基础班',
  // 封面图片
  coverImage: '/images/coverImage/11.png'
})
courseDB.create({
  updateTime: Date.now(),
  kindName: '原画',
  // 课程名称
  courseName: "角色原画进阶班",
  // 原价
  originalPrice: 4100,
  // 售价
  sellingPrice: 4100,
  // 底价
  downPrice: 3800,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: '角色原画进阶班',
  // 封面图片
  coverImage: '/images/coverImage/12.png'
})

courseDB.create({
  updateTime: Date.now(),
  kindName: '原画',
  // 课程名称
  courseName: "厚涂头像班",
  // 原价
  originalPrice: 999,
  // 售价
  sellingPrice: 999,
  // 底价
  downPrice: 999,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: '厚涂头像班',
  // 封面图片
  coverImage: '/images/coverImage/13.png'
})
courseDB.create({
  updateTime: Date.now(),
  kindName: '原画',
  // 课程名称
  courseName: "二次元绘制",
  // 原价
  originalPrice: 4100,
  // 售价
  sellingPrice: 4100,
  // 底价
  downPrice: 3800,
  // 更新人
  updatePeople: "郑依韩",
  // 课程描述
  description: '二次元绘制',
  // 封面图片
  coverImage: '/images/coverImage/14.png'
})