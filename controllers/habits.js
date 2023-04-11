const express = require('express')
const router = express.Router()
const db = require('../models')


router.get('/', async (req, res) => {
    const habits = await db.habit.findAll({
        where: {
            userId: res.locals.user.id
        }
    })
    console.log(habits)
    res.render('habits/index.ejs', {habits})
})


router.post('/', async (req, res) => {
    const newHabit = await db.habit.findOrCreate({
        where: {
            habit_name: req.body.habit,
            userId: res.locals.user.id
        }
    })
    res.redirect('/habits')
})

router.put('/', (req, res) => {
    res.send('updates a user\'s habits')
})

router.delete('/', async (req, res) => {
    const destroyHabit = await db.habit.destroy({
        where: {
            id: req.body.habitId
        }
    })
    res.redirect('/habits')
})

module.exports = router