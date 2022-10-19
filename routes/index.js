// 總路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restInfo = require('./modules/restInfo')
const search = require('./modules/search')

// 如果request執行的路徑為"/"．就把執行導向'./modules/home'
router.use('/', home)
// 如果request執行的路徑為"/restaurants"．就把執行導向'./modules/restInfo 模組'
router.use('/restaurants', restInfo)
// 如果request執行的路徑為"/search"．就把執行導向'./modules/search 模組'
router.use('/search', search)


module.exports = router