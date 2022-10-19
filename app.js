
// initiate and basic setting
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const routes = require('./routes') // 預設會尋找./routes底下的index.js

// setting the main template
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars') // to set the template engine, handlebars

// mongodb 連線
mongoose.connect(process.env.MONGODB_URI2, { useNewUrlParser: true, useUnifiedTopology: true}) // set connection to mongoDB
const dbStatus = mongoose.connection
// 連線異常警示
dbStatus.on('error', () => {
    console.log('mongodb error!')
})

// 連線成功提示; once表示僅執行第一次，後續符合條件也不會再執行
dbStatus.once('open', () => {
    console.log('mongodb connected')
})

// setting every routes to use the static file, 'public' which includes bootstrap and popper, etc.
app.use(express.static('public'))

// 設定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended:true }))

// 設定每一筆請求都先透過 method override 進行前置處理
app.use(methodOverride('_method'))

// 使用路由器
app.use(routes)

// start and listen on the Express Server
app.listen(port, () => {
    console.log(`Express is listened on localhost:${port}`)
})