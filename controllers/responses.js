require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios'); 
const weatherDecoder = require('../weatherDecoder')
const streak = require('../streak')

const date = new Date()
const month = ('0' + (date.getMonth() + 1)).slice(-2)
const todaysDate = `${date.getFullYear()}-${month}-${date.getDate()}`
const todaysDateMMDDYYY = `${date.getMonth() + 1}${date.getDate()}${date.getFullYear()}`

router.get('/', async (req, res) => {
    try {const responses = await db.daily.findAll({
            where: {
                userId: res.locals.user.id
            }, order: [
                ['date', 'DESC']
            ]
        })
        const habitresponses = await db.habresponse.findAll({
            include: {
                model: db.habit
            }
        })
        let i = 0
        res.render('responses/index.ejs', {responses, habitresponses, i})
    } catch (error) {
        console.log(error)
    }
})

router.get('/new', async (req, res) => {
    try { 
        const habits = await db.habit.findAll({
        where: {
            userId: res.locals.user.id
        }
        })
        // Weather data - 2 APIs Mapbox (for long&lat) & Open-Mateo (for weather)
        // First, get user's zip code
        const zip = res.locals.user.zipcode
        // send zip code to Mabpox
        const mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${zip}.json?access_token=${process.env.MAP_KEY}`
        const mapboxResponse = await axios.get(mapbox)
        // pull out longitude & latitude
        const long = mapboxResponse.data.features[0].center[0].toFixed(3)
        const lat = mapboxResponse.data.features[0].center[1].toFixed(3)
        // send long & lat to Open-Mateo for weather JSON
        const openMateo = `https://api.open-meteo.com/v1/forecast?latitude=${lat}8&longitude=${long}&daily=weathercode&daily=temperature_2m_max&daily=temperature_2m_min&daily=apparent_temperature_max&daily=apparent_temperature_min&daily=sunrise&daily=sunset&daily=precipitation_sum&daily=precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=iso8601&past_days=0&forecast_days=7&start_date=${todaysDate}&end_date=${todaysDate}&timezone=America%2FLos_Angeles`
        const weatherData = await axios.get(openMateo)
        const weatherCondition = weatherDecoder.decode(weatherData.data.daily.weathercode)
        res.render('responses/new.ejs', {
            habits, 
            todaysDate, 
            todaysDateMMDDYYY, 
            weatherData: weatherData.data.daily,
            weatherCondition
        })
    } catch(error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
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
            weather_conditions: req.body.weather_conditions,
            weather_high: req.body.weather_high,
            weather_low: req.body.weather_low,
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
        streak.calculateStreak(taco.id, todaysDate)
        streak.calculateCounts(taco.id, todaysDate)
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
        const foundDay = await db.daily.findOne({
            where: {
                id: req.params.id,
                userId: res.locals.user.id
            }
        })
        await foundDay.update({
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
            const findHabresponse = await db.habresponse.findOrCreate({
                where: {
                    userId: res.locals.user.id,
                    dailyId: foundDay.id,
                    habitId: taco.id,
                    date: req.body.date
                }
            })
            if (yesHabits.includes(taco.id)) {
                findHabresponse[0].update({
                    response: true,
                })
            } else {
                findHabresponse[0].update({
                    response: false,
                })

            }
            streak.calculateStreak(taco.id, todaysDate)
            streak.calculateCounts(taco.id, todaysDate)
        })
    } catch(error) {
        console.log(error)
    }

    res.redirect('/responses')
})

router.delete('/', async (req, res) => {
    try { 
        const destroyResponse = await db.daily.destroy({
        where: {
            id: req.body.id,
            userId: res.locals.user.id
        }
        })
    } catch (error) {
        console.log(error)
    }
    res.redirect('/responses')
})

module.exports = router