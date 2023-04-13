module.exports.dateCountInt = (passedDate) => {
    const monthDays = (month) => {
        if (month == 0){
            return 0
        } else if (month == 1) {
            return 28
        } else if (month == 2) {
            return 59
        } else if (month == 3) {
            return 90
        } else if (month == 4) {
            return 120
        } else if (month == 5) {
            return 151
        } else if (month == 6) {
            return 181
        } else if (month == 7) {
            return 212
        } else if (month == 8) {
            return 243
        } else if (month == 9) {
            return 273
        } else if (month == 10) {
            return 304
        } else if (month == 11) {
            return 334
        } 
    }
    const date = new Date(passedDate)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return (year * 365)+(monthDays(month))+day
}

