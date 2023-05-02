// 图片中间件
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    // 指定文件的储存位置
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../../dist/images/coverImage'))
    },
    // 指定文件名
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage
})


module.exports = upload