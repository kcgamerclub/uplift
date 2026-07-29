const today = new Date().getDay();


const workouts = {

0: {
day: "Sunday",

morning: [
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],

night: [
"Lilly Sabri Glutes",
"Full Backspot Strength"
]

},


1: {
day: "Monday",

morning: [
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],

night: [
"Lilly Sabri Glutes",
"Lower Body Workout",
"Upper Body Workout"
]

},


2: {
day: "Tuesday",

morning: [
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],

night: [
"Lilly Sabri Glutes",
"Full Backspot Strength"
]

},


3: {
day: "Wednesday",

morning: [
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],

night: [
"Lilly Sabri Glutes",
"Lower Body Workout",
"Strength Workout"
]

},


4: {
day: "Thursday",

morning: [
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],

night: [
"Lilly Sabri Glutes",
"Full Backspot Strength"
]

},


5: {
day: "Friday",

morning: [
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],

night: [
"Lilly Sabri Glutes",
"Upper Body Workout",
"Strength Workout"
]

}

};



const workoutToday = workouts[today];



document.getElementById("day-title").innerHTML =
"🩷 " + workoutToday.day + "'s Training";



document.getElementById("morning-workout").innerHTML =
workoutToday.morning
.map(item => "⬜ " + item)
.join("<br><br>");



document.getElementById("night-workout").innerHTML =
workoutToday.night
.map(item => "⬜ " + item)
.join("<br><br>");
