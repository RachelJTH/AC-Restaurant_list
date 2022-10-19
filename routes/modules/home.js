// initiate and basic setting
const express = require('express')
const router = express.Router()

// 使用model
const RestInfo = require('../../models/restInfo')

// set the main page
router.get('/main', (req, res) => {
    RestInfo.find()
        .lean() // 轉為js物件
        .then(rests => 
            res.render('index', { rests }))  
        .catch(error => console.error(error))
})

// Sorting
router.post('/sort', (req, res) => {

    if (req.body == "地區"){
        console.log(req.body)
        RestInfo.find()
        .lean()
        .sort({location: "desc"})
        .then(rests => 
            res.render('index', { rests }))  
        .catch(error => console.error(error))
    }else if(req.body == "Z > A"){
        RestInfo.find()
        .lean()
        .sort({en_name: "asc"})
        .then(rests => 
            res.render('index', { rests }))  
        .catch(error => console.error(error))
    }else if(req.boyd =="類別"){
        RestInfo.find()
        .lean()
        .sort({location: "desc"})
        .then(rests => 
            res.render('index', { rests }))  
        .catch(error => console.error(error))
    }else {
        RestInfo.find()
        .lean()
        .sort({en_name: "desc"})
        .then(rests => 
            res.render('index', { rests }))  
        .catch(error => console.error(error))
    }
   
})

module.exports = router