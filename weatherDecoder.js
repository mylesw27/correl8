
module.exports.decode = (code) => {
    // 0	Clear sky
    if (code == 0) {
        return "Sunny"
    }
    // 1, 2, 3	Mainly clear, partly cloudy, and overcast
    else if (code == 1) {
        return "Mostly Sunny"
    } else if (code == 2) {
        return "Partly Cloudy"
    } else if (code == 3) {
        return "Overcast"
    }
    // 45, 48	Fog and depositing rime fog
    else if (code == 45 || code == 48) {
        return "Foggy"
    }
    // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
    else if (code == 51 || code == 53 || code == 55) {
        return "Drizzle"
    }
    // 56, 57	Freezing Drizzle: Light and dense intensity
    else if (code == 56 || code == 57) {
        return "Freezing Drizzle"
    }
    // 61, 63, 65	Rain: Slight, moderate and heavy intensity
    // 80, 81, 82	Rain showers: Slight, moderate, and violent
    else if (code == 61 || code == 63 || code == 65 || code == 80 || code == 81 || code == 82) {
        return "Rain"
    }
    // 66, 67	Freezing Rain: Light and heavy intensity
    else if (code == 66 || code == 67) {
        return "Freezing Rain"
    }

    // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
    // 77	Snow grains
    // 85, 86	Snow showers slight and heavy
    else if (code == 71 || code == 73 || code == 75 || code == 77 || code == 85 || code == 86) {
        return "Snow"
    }
    // 95 *	Thunderstorm: Slight or moderate
    else if (code == 95) {
        return "Freezing Drizzle"
    }
    else {
        return "-"
    }

}

