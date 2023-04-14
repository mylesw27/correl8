const rating1 = document.getElementById("rating1div")
const rating2 = document.getElementById("rating2div")
const rating3 = document.getElementById("rating3div")
const rating4 = document.getElementById("rating4div")
const rating5 = document.getElementById("rating5div")
const starOutline1 = document.getElementById("starOutline1")
const starOutline2 = document.getElementById("starOutline2")
const starOutline3 = document.getElementById("starOutline3")
const starOutline4 = document.getElementById("starOutline4")
const starOutline5 = document.getElementById("starOutline5")
const starSolid1 = document.getElementById("starSolid1")
const starSolid2 = document.getElementById("starSolid2")
const starSolid3 = document.getElementById("starSolid3")
const starSolid4 = document.getElementById("starSolid4")
const starSolid5 = document.getElementById("starSolid5")
const faceOutlineAmPositive = document.getElementById("faceOutlineAmPositive")
const faceSolidAmPositive = document.getElementById("faceSolidAmPositive")
const faceOutlineAmNeutral = document.getElementById("faceOutlineAmNeutral")
const faceSolidAmNeutral = document.getElementById("faceSolidAmNeutral")
const faceOutlineAmNegative = document.getElementById("faceOutlineAmNegative")
const faceSolidAmNegative = document.getElementById("faceSolidAmNegative")
const faceOutlinePmPositive = document.getElementById("faceOutlinePmPositive")
const faceSolidPmPositive = document.getElementById("faceSolidPmPositive")
const faceOutlinePmNeutral = document.getElementById("faceOutlinePmNeutral")
const faceSolidPmNeutral = document.getElementById("faceSolidPmNeutral")
const faceOutlinePmNegative = document.getElementById("faceOutlinePmNegative")
const faceSolidPmNegative = document.getElementById("faceSolidPmNegative")

let rated = 0

const starOutlineArray = [starOutline1,starOutline2,starOutline3,starOutline4,starOutline5]
const starSolidArray = [starSolid1,starSolid2,starSolid3,starSolid4,starSolid5]


const ratingCheck = function (rate) {
    starOutlineArray.forEach((element,i) => {
        if (i < rated) {
            starOutlineArray[i].style.display = "none"
            starSolidArray[i].style.display = "block"
            console.log("invoked")
        } else if (i >= rated) { 
            starOutlineArray[i].style.display = "block"
            starSolidArray[i].style.display = "none"
        }
   }); 
}


starOutline1.addEventListener("click", function (rating) {
    rated = 1
    ratingCheck()
    console.log("click")
})
starOutline2.addEventListener("click", function (rating) {
    rated = 2
    ratingCheck()
    console.log("click")
})
starOutline3.addEventListener("click", function (rating) {
    rated = 3
    ratingCheck()
    console.log("click")
})
starOutline4.addEventListener("click", function (rating) {
    rated = 4
    ratingCheck()
    console.log("click")
})
starOutline5.addEventListener("click", function (rating) {
    rated = 5
    ratingCheck()
    console.log("click")
})
starSolid1.addEventListener("click", function (rating) {
    rated = 1
    ratingCheck()
    console.log("click")
})
starSolid2.addEventListener("click", function (rating) {
    rated = 2
    ratingCheck()
    console.log("click")
})
starSolid3.addEventListener("click", function (rating) {
    rated = 3
    ratingCheck()
    console.log("click")
})
starSolid4.addEventListener("click", function (rating) {
    rated = 4
    ratingCheck()
    console.log("click")
})
starSolid5.addEventListener("click", function (rating) {
    rated = 5
    ratingCheck()
    console.log("click")
})

faceOutlineAmPositive.addEventListener("click", function() {
    faceOutlineAmPositive.style.display = "none"
    faceSolidAmPositive.style.display = "block"
    faceOutlineAmNeutral.style.display = "block"
    faceSolidAmNeutral.style.display = "none"
    faceOutlineAmNegative.style.display = "block"
    faceSolidAmNegative.style.display = "none"
})

faceOutlineAmNeutral.addEventListener("click", function() {
    faceOutlineAmPositive.style.display = "block"
    faceSolidAmPositive.style.display = "none"
    faceOutlineAmNeutral.style.display = "none"
    faceSolidAmNeutral.style.display = "block"
    faceOutlineAmNegative.style.display = "block"
    faceSolidAmNegative.style.display = "none"
})

faceOutlineAmNegative.addEventListener("click", function() {
    faceOutlineAmPositive.style.display = "block"
    faceSolidAmPositive.style.display = "none"
    faceOutlineAmNeutral.style.display = "block"
    faceSolidAmNeutral.style.display = "none"
    faceOutlineAmNegative.style.display = "none"
    faceSolidAmNegative.style.display = "block"
})
faceOutlinePmPositive.addEventListener("click", function() {
    faceOutlinePmPositive.style.display = "none"
    faceSolidPmPositive.style.display = "block"
    faceOutlinePmNeutral.style.display = "block"
    faceSolidPmNeutral.style.display = "none"
    faceOutlinePmNegative.style.display = "block"
    faceSolidPmNegative.style.display = "none"
})

faceOutlinePmNeutral.addEventListener("click", function() {
    faceOutlinePmPositive.style.display = "block"
    faceSolidPmPositive.style.display = "none"
    faceOutlinePmNeutral.style.display = "none"
    faceSolidPmNeutral.style.display = "block"
    faceOutlinePmNegative.style.display = "block"
    faceSolidPmNegative.style.display = "none"
})

faceOutlinePmNegative.addEventListener("click", function() {
    faceOutlinePmPositive.style.display = "block"
    faceSolidPmPositive.style.display = "none"
    faceOutlinePmNeutral.style.display = "block"
    faceSolidPmNeutral.style.display = "none"
    faceOutlinePmNegative.style.display = "none"
    faceSolidPmNegative.style.display = "block"
})