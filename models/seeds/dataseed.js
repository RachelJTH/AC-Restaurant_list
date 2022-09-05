const RestInfo = require('../restInfo')
const mongoose = require('mongoose')
const seedData = require('./restaurant.json')

mongoose.connect(process.env.MONGODB_URI2, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected')
    seedData.results.forEach(
        info => {
            RestInfo.create({
                id: info.id ,
                name: info.name, 
                name_en: info.name_en,
                category: info.category,
                image: info.image,
                location: info.location,
                phone: info.phone,
                google_map: info.google_map,
                rating: info.rating,
                description: info.description,
            })
        }
    )
    console.log('done')
})