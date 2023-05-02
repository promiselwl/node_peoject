//新增student表 数据

const studentDB = require('../schemas/student')
// 随机取值来用
// 创建随机整数函数
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//创建 随机电话号码
const randomPhone = () => {
    let str = '1'
    // 十个随机的数字
    for (let i = 0; i < 10; i++) {
        str += randomNum(0, 9)
    }
    return str
}

const arr = [
    {
        // 类别 
        kindName: '后端',
        // 课程名
        courseName: 'Python基础核心语法',
        // 班期名
        className: [
            "55期开发基础班",
            "53期开发基础班",
            "52期开发基础班",
            "51期开发基础班"
        ]
    },
    {
        kindName: '后端',
        courseName: 'Python全栈开发',
        className: [
            "6-7全栈开发班",
            "4-28全栈开发班",
            "3-17全栈开发班"
        ]
    },
    {
        kindName: '前端',
        courseName: 'web前端基础班',
        className: [
            "三十七期javacript",
            "三十九期javacript"
        ]
    },
    {
        kindName: '前端',
        courseName: 'web前端全栈进阶班',
        className: [
            "web-前端进阶框架-朱雀",
            "web-前端进阶框架-cherry ",
            "web-前端进阶框架-丸子"
        ]
    },
]

for (let index = 0; index < 500; index++) {
    const num = randomNum(0, arr.length - 1)  //取出数据的下标
    const randomPhoneNumber = randomPhone()  //取出电话号码
    const item = arr[num]  //取出对象
    const classNum = randomNum(0, item.className.length - 1)  //取出班期对象
    // 创建数据
    studentDB.create({
        phoneNumber: randomPhoneNumber,
        kindName: item.kindName,
        courseName: item.courseName,
        className: item.className[classNum],
        updatePeople: '郑依韩',
        updateTime: Date.now(), //获取当前的时间戳
        info: {
            phoneNumber: randomPhoneNumber
        }
    })

}


console.log(randomPhone());