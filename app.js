
// initiate and basic setting
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
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
app.use(express.urlencoded({ extended:true }))

// set the main page
app.get('/restaurants', (req, res) => {
    RestInfo.find()
        .lean() // 轉為js物件
        .then(rests => 
            res.render('index', { rests }))  
        .catch(error => console.error(error))
})

// Add a new restaurant
//// show the form
app.get('/restaurants/new', (req, res) => {
    res.render('new')
})

//// storage the details into database
app.post('/restaurants/new', (req, res) => {
    const {id, name, name_en, category, image, location, phone, google_map, rating, description} = req.body
    RestInfo.create({id, name, name_en, category, image, location, phone, google_map, rating, description})
    .then(() => res.redirect('/restaurants')) 
    .catch(error => console.log(error))
})

// show the details
app.get('/restaurants/:id', (req, res) => {
    const restId = req.params.id
    RestInfo.find()
        .lean()
        .then(details => {
            const detail = details.find(detail => restId === detail._id.toString())
            res.render('show', { detail:detail })
        })
        .catch(error => console.error(error))
})  

// turn to Edit page
app.get('/restaurants/:id/edit', (req, res) => {
    const uniqueID = req.params.id
    RestInfo.findById(uniqueID)
        .lean() // returns a JavaScript object instead of a Mongoose document.
        .then(detail => {
            res.render('edit', { detail, uniqueID})
        })
        .catch(error => console.error(error))
})

// Edit and Save
app.post('/restaurants/:id/edit', (req, res) => {
    const uniqueID = req.params.id
    const {id, name, name_en, category, location, phone, rating, description, image} = req.body
    RestInfo.findById(uniqueID)
        // .lean()
        .then(detail => {
            detail.id = id
            detail.name = name
            detail.name_en = name_en
            detail.category = category
            detail.location = location
            detail.phone = phone
            detail.rating = rating
            detail.description = description
            detail.image = image
            detail.save()
        })  
        .then(() => res.redirect('/restaurants'))
        .catch(error => console.log(error))
})

// Delete
app.post('/restaurants/:id/delete', (req, res) => {
    const uniqueID = req.params.id
    RestInfo.findById(uniqueID)
        .then(detail => {
            detail.remove()  
        })
        .then(() => res.redirect('/restaurants'))
        .catch(error => console.log(error))
})

// Search 
app.get('/search', (req,res) =>{
    const keyword = req.query.keyword.toLowerCase()
    RestInfo.find()
        .lean()
        .then(detail => {
            const filteredList = detail.filter(rest => {return (rest.name.toLowerCase()).includes(keyword.toLowerCase())})
            const categoryList = detail.filter(rest => {return (rest.category.toLowerCase()).includes(keyword.toLowerCase())})
            const searchResult = filteredList.concat(categoryList)
            if (searchResult.length ===0){
                let alertInfo = `沒有符合的搜尋結果`
                res.render('index', {keyword, alertInfo})
            }else{
                return res.render('index', {rests: searchResult, keyword: keyword})
            }
        })
})

// start and listen on the Express Server
app.listen(port, () => {
    console.log(`Express is listened on localhost:${port}`)
})