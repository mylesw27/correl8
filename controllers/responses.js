const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', async (req, res) => {
    try {const responses = await db.daily.findAll({
            where: {
                userId: res.locals.user.id
            }, order: [
                ['date', 'DESC']
            ]
        })
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
    // console.log(req.body)
    const [newDay, created] = await db.daily.findOrCreate({
        where: {
            date: req.body.date,
            userId: res.locals.user.id
        }, defaults: {
            rating: req.body.rating,
            mood_AM: req.body.mood_am,
            mood_PM: req.body.mood_pm,
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
    const foundHabits = await db.habit.findAll({
        where: {
            userId: res.locals.user.id
        }
    })
    const responseArray = Object.entries(req.body)

    let habitArray = []
    responseArray.forEach((response, i) => {
        let splitResponse = response[0].split("_")
        if (splitResponse[0] === "habit" ) {
            habitArray.push(splitResponse)
        }
        
    })
    let yesHabits = habitArray.map(habit => Number(habit[1]))
    
    foundHabits.forEach( async (taco,i) => {
        console.log(`Yes habits: ${yesHabits} foundHabitsID: ${taco.id}`)
        if (yesHabits.includes(taco.id)) {
            await db.habresponse.findOrCreate({
                where: {
                    date: req.body.date,
                    userId: res.locals.user.id,
                    habitId: taco.id,
                }, defaults: {
                    response: true,
                    dailyId: newDay.id
                }
            })
        } else {
            await db.habresponse.findOrCreate({
                where: {
                    date: req.body.date,
                    userId: res.locals.user.id,
                    habitId: taco.id,
                }, defaults: {
                    response: false,
                    dailyId: newDay.id
                }
            })

        }
    })
    
    res.redirect ('/responses')
})

router.get('/:id', async (req, res) => {
    const foundDaily = await db.daily.findOne({
        where: {
            id: req.params.id,
            userId: res.locals.user.id
        }
    })
    const habits = await db.habit.findAll({
        where: {
            userId: res.locals.user.id,
        }, 
        include: [{
            model: db.habresponse,
            where: {
                dailyId: req.params.id
            }
        }]
    })
    res.render('responses/show.ejs', {foundDaily, habits})
})

router.put('/:id', async (req, res) => {
    try {
        const updateDay = await db.daily.findOne({
            where: {
                id: req.params.id,
            }
        })
        updateDay.update({
            rating: req.body.rating,
            mood_AM: req.body.mood_am,
            mood_PM: req.body.mood_pm,
            stress: req.body.stress,
            activity: req.body.activity,
            diet: req.body.diet,
            woke_up: req.body.woke_up,
            bed: req.body.bed,
            water: req.body.water,
            affirmations: req.body.affirmations,
            notes: req.body.notes,
        })
        updateDay.save()
        await console.log(updateDay.rating)
    //     const foundHabresponse = await db.user.findOrCreate({
    //         where: {
    //             dailyId: req.params.id
    //         }
    //     })
    //     const foundHabits = await db.habit.findAll({
    //     where: {
    //         userId: res.locals.user.id
    //     }
    // })
    // const responseArray = Object.entries(req.body)

    // let habitArray = []
    // responseArray.forEach((response, i) => {
    //     let splitResponse = response[0].split("_")
    //     if (splitResponse[0] === "habit" ) {
    //         habitArray.push(splitResponse)
    //     }
        
    // })
    // let yesHabits = habitArray.map(habit => Number(habit[1]))
    
    // foundHabits.forEach( async (taco,i) => {
    //     console.log(`Yes habits: ${yesHabits} foundHabitsID: ${taco.id}`)
    //     if (yesHabits.includes(taco.id)) {
    //         await db.habresponse.findOrCreate({
    //             where: {
    //                 date: req.body.date,
    //                 userId: res.locals.user.id,
    //                 habitId: taco.id,
    //             }, defaults: {
    //                 response: true,
    //                 dailyId: newDay.id
    //             }
    //         })
    //     } else {
    //         await db.habresponse.findOrCreate({
    //             where: {
    //                 date: req.body.date,
    //                 userId: res.locals.user.id,
    //                 habitId: taco.id,
    //             }, defaults: {
    //                 response: false,
    //                 dailyId: newDay.id
    //             }
    //         })

    //     }
    // })
    } catch(error) {
        console.log(error)
    }

    res.redirect('/responses')
})

router.delete('/', (req, res) => {
    res.send('bye bye')
})

module.exports = router