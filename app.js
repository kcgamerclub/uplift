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




// CREATE CLICKABLE WORKOUTS

function createWorkoutList(workouts){

return workouts
.map(item =>

`
<label class="workout-item">

<input type="checkbox">

${item}

</label>
`

)
.join("");

}



document.getElementById("morning-workout").innerHTML =
createWorkoutList(workoutToday.morning);



document.getElementById("night-workout").innerHTML =
createWorkoutList(workoutToday.night);





// CHECKBOX EFFECT

document.querySelectorAll(".workout-item input").forEach(box => {


box.addEventListener("change", function(){


if(this.checked){

this.parentElement.style.textDecoration = "line-through";


}

else{


this.parentElement.style.textDecoration = "none";


}


});


});







// PAGE NAVIGATION


function hideAllPages() {

document.getElementById("home-page").classList.add("hidden");

document.getElementById("training-page").classList.add("hidden");

document.getElementById("progress-page").classList.add("hidden");

document.getElementById("badges-page").classList.add("hidden");

document.getElementById("profile-page").classList.add("hidden");

}





function startTraining(){

hideAllPages();

document.getElementById("training-page").classList.remove("hidden");

}




function openProgress(){

hideAllPages();

document.getElementById("progress-page").classList.remove("hidden");

}




function openBadges(){

hideAllPages();

document.getElementById("badges-page").classList.remove("hidden");

}




function openProfile(){

hideAllPages();

document.getElementById("profile-page").classList.remove("hidden");

}




function goHome(){

hideAllPages();

document.getElementById("home-page").classList.remove("hidden");

}
