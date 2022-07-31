
// initiate and basic setting
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000


// setting the main template
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars') // to set the template engine, handlebars

// setting external dataset
const restList = require('./restaurant.json')

// setting every routes to use the static file, 'public' which includes bootstrap and popper, etc.
app.use(express.static('public'))


// set the main page
app.get('/restaurants', (req, res) => {

    res.render('index', {rests:restList.results})
})

// show the details
app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id

    const detail = restList.results.find(rest => rest.id.toString() === id)
    console.log(detail)
    res.render('show', {detail: detail})
})

// req.query (of Express package)
app.get('/search', (req,res) =>{
    const keyword = req.query.keyword.toLowerCase()
    const filteredList = restList.results.filter(rest => {return (rest.name.toLowerCase()).includes(keyword.toLowerCase())})
    const categoryList = restList.results.filter(rest => {return (rest.category.toLowerCase()).includes(keyword.toLowerCase())})
    const searchResult = filteredList.concat(categoryList)
    res.render('index', {rests: searchResult, keyword: keyword})
})

// start and listen on the Express Server
app.listen(port, () => {
    console.log(`Express is listened on localhost:${port}`)
})
