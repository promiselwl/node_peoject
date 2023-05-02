const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const userinfoDB = require('../../schemas/userinfo')
// 登录 /login
router.post('/', async (req, res) => {
  let { username, password } = req.body

  // 检查格式是否规范 
  // 校验username的正则 0-7的字符 
  let regUser = /^[\u4E00-\u9FA5A-Za-z][\u4E00-\u9FA5A-Za-z0-9]{0,7}$/
  // 密码至少包含 数字和英文 长度6-20
  let regpass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

  if (regUser.test(username) && regpass.test(password)) {
    // 都为真 走进来 格式校验成功  
    // 查询userinfo数据表中 是否存在该用户名  
    let result = await userinfoDB.findOne({ username })

    if (result) {
      // 存在该用户 
      // 验证密码    原始值 加盐的值 比对成功就 返回 true 失败 false 
      const isPasswordSame = bcryptjs.compareSync(password, result.password)
      if (isPasswordSame) {
        // 密码匹配
        req.session.userinfo = {
          username: result.username,
          admin: result.admin,
          _id: result._id,
          photo: result.photo
        }

        res.send({
          code: 0,
          txt: '登录成功',
          data: {
            photo: result.photo,
            username: result.username,
          }
        })

      } else {
        // 密码不匹配
        res.send({
          code: 3,
          txt: "密码不正确,请检查之后重试"
        })
      }

    } else {
      // 不存在该用户
      res.send({
        code: 2,
        txt: "用户名不存在,请先注册"
      })
    }

  } else {
    // 格式有误
    res.send({
      code: 1,
      txt: "格式有误"
    })
  }
})

// 检查登录/checkLogin
router.get('/checkLogin', (req, res) => {
  let userinfo = req.session.userinfo
  if (userinfo) {
    res.send({
      code: 0,
      txt: '已经登录',
      data: userinfo
    })
  } else {
    res.send({
      code: 1,
      txt: '用户未登录'
    })
  }
})

// 退出登录/logout
router.get('/logout', (req, res) => [
  req.session.destroy(), //清空数据库的sessioin数据
  res.send({
    code: 0,
    txt: '退出登录'
  })

])
module.exports = router