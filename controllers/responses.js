const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', async (req, res) => {
    try {const responses = await db.daily.findAll({
            where: {
                userId: res.locals.user.id
            }, //order: ['date', 'DESC']
        })
        await console.log(responses)
        res.render('responses/index.ejs', {responses})
    } catch (error) {
        console.log(error)
    }
})

router.get('/new', async (req, res) => {
    const habits = await db.habit.findAll({
        where: {
            userId: res.locals.user.id
        }
    })
    const date = new Date()
    const todaysDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    res.render('responses/new.ejs', {habits, todaysDate})
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const newDay = await db.daily.findOrCreate({
        where: {
            date: req.body.date,
            userId: res.locals.user.id
        }, defaults: {
            rating: req.body.rating,
            mood_am: req.body.mood_am,
            mood_pm: req.body.mood_pm,
            stress: req.body.stress,
            activity: req.body.activity,
            diet: req.body.diet,
            woke_up: req.body.woke_up,
            bed: req.body.bed,
            water: req.body.water,
            affirmations: req.body.affirmations,
            notes: req.body.notes,
        } 
    })
    res.render('/responses')
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