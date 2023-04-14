const db = require('./models')

const getPage = async () => {
    try {const responses = await db.daily.findAll({
            where: {
                userId: 2
            }, order: [
                ['date', 'DESC']
            ]
        })
        const habitresponses = await db.habresponse.findAll({
            include: {
                model: db.habit
            }
        })
        habitresponses.forEach(habitresponse => {
            if (habitresponse.habit != null) {
                console.log(habitresponse.habit.habit_name)
            } 
        })
    } catch (error) {
        console.log(error)
    }
}

getPage()
