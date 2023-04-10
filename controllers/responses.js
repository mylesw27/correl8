const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req, res) => {
    res.render('responses/index.ejs')
})

router.get('/new', (req, res) => {
    res.render('responses/new.ejs')
})

router.post('/',(req, res) => {
    res.send('Enters current day\s form to the db')
})

router.get('/:id', (req, res) => {
    res.render('responses/show.ejs')
})

router.put('/:id', (req, res) => {
    res.send('Update an existing record of a day')
})

router.delete('/', (req, res) => {
    res.send('bye bye')
})

module.exports = router