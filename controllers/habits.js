const express = require('express')
const router = express.Router()
const db = require('../models')


router.get('/', (req, res) => {
    res.render('habits/index.ejs')
})


router.post('/',(req, res) => {
    res.send('Defines user\'s daily habits during setup')
})

router.put('/', (req, res) => {
    res.send('updates a user\'s habits')
})

module.exports = router