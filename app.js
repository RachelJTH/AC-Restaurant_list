
// initiate and basic setting
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

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

// setting external dataset
// const restList = require('./models/seeds/restaurant.json')
const RestInfo = require('./models/restInfo')

// setting every routes to use the static file, 'public' which includes bootstrap and popper, etc.
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended:true }))

// set the main page
app.get('/restaurants', (req, res) => {
    RestInfo.find()
        .lean() // 轉為js物件
        .then(rests => res.render('index', { rests:rests }))  
        .catch(error => console.error(error))
})

// new restaurant
app.get('/restaurants/new', (req, res) => {
    res.render('new')
})

// add a new restaurant
app.post('/restaurants/new', (req, res) => {
    const restInfo = req.body
    // console.log(req.body)
    // method 1 === method 2
    // method 1: 產生一個實例(是一筆資料的形式，但還沒有塞到資料庫裡); 再存進資料庫
    // const todo = new Todo({ name:name })
    // return todo.save()
    //     .then(() => res.redirect('/'))
    //     .catch(error => console.log(error))

    // method 2: 直接命令mongoose去建立一個新的Todo物件並新增至資料庫
    // return Todo.create({ name:name })
    RestInfo.create({ restInfo })
        .then(() => res.redirect('/restaurants')) // 重新導回首頁
        .catch(error => console.log(error))
})

// show the details
app.get('/restaurants/:id', (req, res) => {
    const restId = req.params.id
    RestInfo.findById(restId)
        .lean()
        .then(detail => {
            res.render('show', { detail:detail })
        })
        .catch(error => console.error(error))
})

// 


// edit or update
app.get('/restaurants/:id/edit', (req, res) => {
    const restId = req.params
    // console.log(req)
    RestInfo.findById(restId)
        .lean()
        .then(detail => {
            res.render('edit', { info:detail })
        })
        .catch(error => console.error(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
    // console.log(req.params)
    const restId = req.params
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const google_maps = req.body.google_maps
    const rating = req.body.rating
    const description = req.body.description

    RestInfo.findById(restId)
        .lean()
        .then(detail => {
            detail.name = name
            detail.name_en = name_en
            detail.category = category
            detail.image = image
            detail.location = location
            detail.phone = phone
            detail.google_map = google_maps
            detail.rating = rating.toString()
            detail.description = description
            console.log(detail)
            // return detail.save()
        })  
        .then(() => res.redirect('/restaurants'))
        .catch(error => console.log(error))
})

// req.query (of Express package)
app.get('/search', (req,res) =>{
    console.log('line 109')
    const keyword = req.query.keyword.toLowerCase()
    RestInfo.find()
        .lean()
        .then(detail => {
            const filteredList = detail.filter(rest => {return (rest.name.toLowerCase()).includes(keyword.toLowerCase())})
            const categoryList = detail.filter(rest => {return (rest.category.toLowerCase()).includes(keyword.toLowerCase())})
            const searchResult = filteredList.concat(categoryList)
            return res.render('index', {rests: searchResult, keyword: keyword})
        })
})

// start and listen on the Express Server
app.listen(port, () => {
    console.log(`Express is listened on localhost:${port}`)
})
