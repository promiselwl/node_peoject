const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    // 指定导入的文件储存的位置
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../../dist/excel'))
    },
    // 指定文件名
    filename(req, file, cb) {
        // 随机名称
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage
})
module.exports = upload