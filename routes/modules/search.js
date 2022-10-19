// initiate and basic setting
const express = require('express')
const router = express.Router()

// 使用model
const RestInfo = require('../../models/restInfo')   

// Search 
router.get('/', (req,res) =>{
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

module.exports = router