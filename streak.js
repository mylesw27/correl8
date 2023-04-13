const db = require('./models')
const dateCount = require('./dateCount')

module.exports.calculateStreak = async (taco, todaysDate) => {
    try {
        // Get all habit responses that are true
        const findHabresponse = await db.habresponse.findAll({
            where: {
                habitId: taco,
                response: true
            }, order: [
                ['date', 'DESC']
            ]
        })
        // convert dates to integers using dateCount and store them in an array
        const responseDateArray = findHabresponse.map(response => {
            return dateCount.dateCountInt(response.date)
        })
        console.log(responseDateArray)
        let streak = 0
        const todaysDateCount = dateCount.dateCountInt(todaysDate)
        console.log(todaysDateCount, responseDateArray[0])
        if (todaysDateCount === responseDateArray[0] || (todaysDateCount - 1)=== responseDateArray[0]) {
            responseDateArray.forEach((day, i) => {
                if (day === (responseDateArray[i+1] + 1)) {
                    streak ++
                } 
            })
        }
        // update habit.current_streak with that amount 
        const findHabit = await db.habit.findOne ({
            where: {
                id: taco
            }
        })
        await findHabit.update({
            streak: streak
        })
    } catch(error) {
        console.log(error)
    }
}

module.exports.calculateCounts = async (taco, todaysDate) => {
    try {
        // Get all habit responses that are true
        const findHabresponse = await db.habresponse.findAll({
            where: {
                habitId: taco,
                response: true
            }, order: [
                ['date', 'DESC']
            ]
        })
        // convert dates to integers using dateCount and store them in an array
        const responseDateArray = findHabresponse.map(response => {
            return dateCount.dateCountInt(response.date)
        })
        // Get today's datecount
        const todaysDateCount = dateCount.dateCountInt(todaysDate)

        // for each function that calculates each true habit if it is > (today -30) if so, increment
        let monthCount = 0
        let weekCount = 0
        responseDateArray.forEach((habitDate) => {
            if (habitDate > todaysDateCount -7) {
                monthCount ++
                weekCount ++
                console.log(habitDate, todaysDateCount -8)
            } else if (habitDate >= todaysDateCount -30) {
                monthCount ++
            }
        })
        console.log(taco + ' month: ' + monthCount + ", week: " + weekCount)
        const findHabit = await db.habit.findOne ({
            where: {
                id: taco
            }
        })
        await findHabit.update({
            month: monthCount,
            week: weekCount
        })

        
    } catch(error) {
        console.log(error)
    }
}
