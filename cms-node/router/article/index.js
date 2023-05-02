const express = require('express')
const router = express.Router()
const articleDB = require('../../schemas/article')

// 新增文章
router.post('/addArticle', async (req, res) => {
    const {
        title,
        description,
        content
    } = req.body

    if (!title || !description || !content) {
        //一个为空
        return res.send({
            code: 1,
            txt: "文章创建失败"
        })
    }
    let data = await articleDB.find()
    await articleDB.create({
        title,
        content,
        description,
        author: "郑依韩",
        date: Date.now(),
        rank: data.length + 1
    })
    res.send({
        code: 0,
        txt: '文章创建成功'
    })
})

// 获取文章列表
router.get('/articleList', async (req, res) => {
    const { pageSize, currentPage } = req.query

    let data = await articleDB.find()
    const total = data.length  //文章总条数

    data = data.splice((currentPage - 1) * pageSize, pageSize)
    // //    升序
    data.sort((a, b) =>  a.rank - b.rank)
    // console.log(data);
    res.send({
        code: 0,
        total,
        data
    })
})

// 修改文章排名
router.post('/reviseRank', async (req, res) => {
    const {
        man,
        woman
    } = req.body
    let manRank = man.rank
    let womanRank = woman.rank
    await articleDB.findByIdAndUpdate({ _id: man._id }, { rank: womanRank })
    await articleDB.findByIdAndUpdate({ _id: woman._id }, { rank: manRank })
    res.send({
        code: 0,
        txt: '排序成功'
    })

})

// 删除文章
router.post('/deleteArticle', async (req, res) => {
    const { _id } = req.body
    const data = await articleDB.find()
    // 被删除的项
    const deleteObj= data.find(item => item._id.toString() === _id)  //找到数据库与传来的_id相同的下标
    let  reviseArr = data.filter(item=>item.rank>deleteObj.rank)

    //1,2,3，4 删除第二名 1,2,3
    reviseArr.forEach(async item => {  //遍历 剩余的文章项
        await articleDB.findByIdAndUpdate({ _id: item._id }, { rank: item.rank - 1 })
    })
    //删除与找到数据库与传来的_id相同的下标
    await articleDB.findByIdAndDelete({ _id })

    res.send({
        code: 0,
        txt: '删除成功'
    })

})
module.exports = router