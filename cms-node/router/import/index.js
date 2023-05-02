const express = require('express')
const router = express.Router()
const path = require('path')
const upload = require('../../middle/multer/importFile')
const xlsx = require('node-xlsx')
const fs = require('fs')
const iconvLite = require('iconv-lite')
const studentDB = require('../../schemas/student')
const importDB = require('../../schemas/import')



//1.返回模板 
router.get('/template', async (req, res) => {
    // 配合前端的a标签使用 
    res.download(path.join(__dirname, '../../dist/excel/模板.xlsx'), (err) => {
        if (err) throw err
    })
})

//2.导入文件 
//upload.single('file')单个文件控件名为file
router.post('/student', upload.single('file'), (req, res) => {
    // console.log(req.file);
    // xlsx.parse()能够解析excel表格数据返回一个数组
    // filter筛选空数组
    // console.log(xlsx.parse(req.file.path)[0]);  取第一张表数据
    const arr = xlsx.parse(req.file.path)[0].data.filter(item => item.length) //通过路径来解析excle数据返回数组过滤掉空数组
    // console.log(arr);
    // property用于筛选出 中文属性 替换为 英文属性   
    const property = {
        手机号: 'phoneNumber',
        课程分类: 'kindName',
        课程名称: 'courseName',
        班期名称: 'className',
        是否开通权限: 'isEnable',
        姓名: 'name',
        微信: 'wechat',
        身份证号: 'card',
        年龄: 'age',
        地址: 'location',
        学历: 'education',
        性别: 'sex',
        QQ: 'QQ'
    }
    // arr数组中的值
    // [
    //   [
    //     '*手机号',      '*课程分类',
    //     '*课程名称',    '*班期名称',
    //     '是否开通权限', '姓名',
    //     '微信',         'QQ',
    //     '身份证号',     '年龄',
    //     '地址',         '学历',
    //     '性别'
    //   ], 
    //   [ 11223344556, '前端', 'web前端全栈进阶班', 'web-前端进阶框架-朱雀', '是' ],
    //   [ 12345678987, '前端', 'web前端全栈进阶班', 'web-前端进阶框架-丸子', '是' ]
    // ]

    // 把表头的中文替换为英文 
    let header = arr[0].map(item => {
        // 去除星号
        item = item.replace('*', '')
        // "*手机号"===>"phoneNumber"
        return property[item]
    })
    console.log(header);
    // 数据的主体
    let result = arr.slice(1)  //去除数组下标为0的元素
    let total = result.length
    if (!total) {
        // 如果数据为空
        return res.send({
            code: 1,
            txt: '空表无数据'
        })
    }
    // 格式化student对象  [{...},{...}]
    let resultStudent = []
    // 外层循环走一次内存循环走全部
    for (let i = 0; i < result.length; i++) {
        let student = {}
        for (let j = 0; j < header.length; j++) {
            if (header[j] === 'isEnable') {
                // 需要对isEnable进行处理
                student[header[j]] = result[i][j] === '是' ? true : false
            } else {
                student[header[j]] = result[i][j]
            }

        }
        resultStudent.push(student)
    }
    console.log(resultStudent);

    // 记录不符合规范的student对象以及数据库添加失败的student对象
    let errorStudent = []
    // 符合规范的student必填项都有的
    let successStudent = []
    // successStudent 10 ==〉数据库 ==〉8(succeedStudent)2条数据不成功(添加到errorStudent)

    // 记录数据库真正添加成功的student
    let succeedStudent = []

    let reg = /^(\d{11})$/
    let courseObj = JSON.parse(fs.readFileSync(path.join(__dirname, '../../dataJson/courseObj.json')))

    for (let k = 0; k < resultStudent.length; k++) {
        // 对里面的每一个对象进行规则筛选
        if (!resultStudent[k].phoneNumber && !resultStudent[k].kindName && !resultStudent[k].courseName) {
            // 如果每个项目都为空 有理由怀疑 这个表 根本就不对   
            return res.send({ // 结束响应
                code: 2,
                txt: '表格格式不对,请按模板要求填写'
            })
        }
        if (!resultStudent[k].phoneNumber || !resultStudent[k].kindName || !resultStudent[k].courseName || !resultStudent[k].className) {
            // 只要一个为空 就可以走进来 
            resultStudent[k].reason = '缺少必填项'
            errorStudent.push(resultStudent[k])
            continue;//终止此循环进入下一循环
        }
        if (!reg.test(resultStudent[k].phoneNumber)) {
            // 手机号不符合规范
            resultStudent[k].reason = '手机号不符合规范'
            errorStudent.push(resultStudent[k])
            continue
        }

        // 判断 类别是否是前端/后端  
        const kindNameIndex = courseObj.kindName.findIndex(item => {
            // findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1。
            // item 数组项  条件为true 返回当前item的index(就算有多个满足条件 也只找第一个)  条件全为 false  返回 -1
            return resultStudent[k].kindName === item.value
        })
        if (kindNameIndex === -1) {
            // 课程项目前端/后端分类不符合规范
            resultStudent[k].reason = "项目分类不符合规范"
            errorStudent.push(resultStudent[k])
            continue
        }
        // courseObj.kindName的值
        // [
        //     {
        //       "value": "web前端基础班",
        //       "className": ["三十七期javacript", "三十九期javacript"]
        //     },
        //     {
        //       "value": "web前端全栈进阶班",
        //       "className": [
        //         "web-前端进阶框架-朱雀",
        //         "web-前端进阶框架-cherry ",
        //         "web-前端进阶框架-丸子"
        //       ]
        //     }
        //   ] 
        const courseNameArr = courseObj.kindName[kindNameIndex].courseName
        const courseNameIndex = courseNameArr.findIndex(item => {
            return resultStudent[k].courseName === item.value
        })
        if (courseNameIndex === -1) {
            // 课程名称不在指定的分类中   
            resultStudent[k].reason = '课程不在指定的分类中'
            errorStudent.push(resultStudent[k])
            continue
        }
        //{
        //    "value": "web前端基础班",
        //    "className": ["三十七期javacript", "三十九期javacript"]
        //},
        // 走到这 幸存的符合规则的student对象 resultStudent[k] 
        const classNameArr = courseNameArr[courseNameIndex].className
        if (!classNameArr.includes(resultStudent[k].className)) {
            // 班期名称不在指定的课程中   
            resultStudent[k].reason = '班期名称不在指定的课程中 '
            errorStudent.push(resultStudent[k])
            continue
        }
        // 走到这 幸存的符合规则的student对象 resultStudent[k] 
        successStudent.push(resultStudent[k])
    }

    // 存到数据库中 
    // {
    //   phoneNumber: 12345678987,
    //   kindName: '前端',
    //   courseName: 'web前端全栈进阶班',
    //   className: 'web-前端进阶框架-丸子',
    //   isEnable: true,
    //   name: undefined,
    //   wechat: undefined,
    //   QQ: undefined,
    //   card: undefined,
    //   age: undefined,
    //   location: undefined,
    //   education: undefined,
    //   sex: undefined
    // }
    function addStudent() {
        const promiseAll = []
        // successStudent 2 
        successStudent.forEach(item => {
            promiseAll.push(new Promise((resolve, reject) => {
                studentDB.create({
                    phoneNumber: item.phoneNumber,
                    kindName: item.kindName,
                    courseName: item.courseName,
                    className: item.className,
                    origin: '后台导入',
                    updatePeople: '郑依韩',
                    updateTime: Date.now(),
                    isEnable: item.isEnable,
                    info: {
                        phoneNumber: item.phoneNumber,
                        name: item.name,
                        wechat: item.wechat,
                        QQ: item.QQ,
                        card: item.card,
                        age: item.age,
                        location: item.location,
                        education: item.education,
                        sex: item.sex
                    }
                }).then(() => {
                    // 数据上传成功 
                    succeedStudent.push(item)
                    resolve()
                }).catch(() => {
                    item.reason = '手机号重复'
                    errorStudent.push(item)
                    resolve()
                })

            }))

        })

        return Promise.all(promiseAll)
    }
    addStudent().then(() => {
        // 走到这 说明 所有的异步操作全部完成了 可以进行下一步操作了 
        // 处理信息  
        // 存入到 导入表中 
        // 给前端反馈 
        let filename = iconvLite.decode(req.file.originalname, 'utf8')
        // 处理信息  
        // 存入到 导入表中 
        // 给前端反馈 
        let status;

        let succeedNum = succeedStudent.length
        let errNum = errorStudent.length
        // succeedNum为0 !0 => true 
        if (!succeedNum) { // 成功数组内没有数据
            // 全部失败
            status = 2
        } else if (!errNum) { //失败数组内没有数据 !0 => true
            // 全部成功 
            status = 0
        } else {
            // succeedNum ≠ 0  errNum ≠ 0
            // 部分成功
            status = 1
        }
        let txt = `成功上传${succeedNum}条数据,失败${errNum}条数据`
        importDB.create({
            // 文件名
            filename,
            importPeople: '郑依韩',
            status,
            total,
            succeedNum,
            errNum,
            errorStudent,
            succeedStudent,
            time: Date.now()
        })

        res.send({
            code: status,
            txt
        }) // 把外面的res.send(哈哈哈) 删除

    })

})


// 3.返回导入列表数据
router.get('/importList', async (req, res) => {
    const {
        currentPage,
        pageSize
    } = req.query

    let data = await importDB.find()

    // 按照更新时间倒序排序 
    data.sort((a, b) => {
        return b.time - a.time // 倒叙排序 
    })

    //总数
    const total = data.length
    // 返回splice切下来的数组 
    data = data.splice((currentPage - 1) * pageSize, pageSize)
    res.send({
        code: 0,
        data,
        total
    })
})
module.exports = router