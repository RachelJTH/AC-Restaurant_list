const express = require('express')
const router = express.Router()

// setting external dataset
// const restList = require('./models/seeds/restaurant.json')
const RestInfo = require('../../models/restInfo')

// Add a new restaurant
//// show the form
router.get('/new', (req, res) => {  
    res.render('new')
})

//// storage the details into database
router.post('/', (req, res) => {
    const {id, name, name_en, category, image, location, phone, google_map, rating, description} = req.body
    RestInfo.create({id, name, name_en, category, image, location, phone, google_map, rating, description})
    .then(() => res.redirect('/main')) 
    .catch(error => console.log(error))
})

// show the details
router.get('/:id', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
    const uniqueID = req.params.id
    RestInfo.findById(uniqueID)
        .lean() // returns a JavaScript object instead of a Mongoose document.
        .then(detail => {
            res.render('edit', { detail, uniqueID})
        })
        .catch(error => console.error(error))
})

// Edit and Save
router.put('/:id', (req, res) => {
    const uniqueID = req.params.id
    const {id, name, name_en, category, location, phone, rating, description, image} = req.body
    RestInfo.findById(uniqueID)
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
        .then(() => res.redirect('/main'))
        .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
    const uniqueID = req.params.id
    RestInfo.findById(uniqueID)
        .then(detail => {
            detail.remove()  
        })
        .then(() => res.redirect('/main'))
        .catch(error => console.log(error))
})

module.exports = router