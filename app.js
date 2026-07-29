// =====================
// PLAYER SAVE SYSTEM
// =====================

let xp = Number(localStorage.getItem("xp")) || 0;

let level = Number(localStorage.getItem("level")) || 1;

let workoutHistory = JSON.parse(
    localStorage.getItem("workoutHistory")
) || [];

let todayCompleted = JSON.parse(
    localStorage.getItem("todayCompleted")
) || [];

let lastWorkoutDate =
    localStorage.getItem("lastWorkoutDate") || "";



// =====================
// DAILY RESET SYSTEM
// =====================

let todayDate = new Date().toDateString();


if(lastWorkoutDate !== todayDate){

    todayCompleted = [];

    localStorage.setItem(
        "todayCompleted",
        JSON.stringify(todayCompleted)
    );

}



// =====================
// WORKOUT DATA
// =====================


const today = new Date().getDay();


const workouts = {

0:{
day:"Sunday",
morning:[
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],
night:[
"Lilly Sabri Glutes",
"Full Backspot Strength"
]
},


1:{
day:"Monday",
morning:[
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],
night:[
"Lilly Sabri Glutes",
"Lower Body Workout",
"Upper Body Workout"
]
},


2:{
day:"Tuesday",
morning:[
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],
night:[
"Lilly Sabri Glutes",
"Full Backspot Strength"
]
},


3:{
day:"Wednesday",
morning:[
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],
night:[
"Lilly Sabri Glutes",
"Lower Body Workout",
"Strength Workout"
]
},


4:{
day:"Thursday",
morning:[
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],
night:[
"Lilly Sabri Glutes",
"Full Backspot Strength"
]
},


5:{
day:"Friday",
morning:[
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],
night:[
"Lilly Sabri Glutes",
"Upper Body Workout",
"Strength Workout"
]
}

};



const workoutToday = workouts[today];



document.getElementById("day-title").innerHTML =
"🩷 " + workoutToday.day + "'s Training";




// =====================
// CREATE WORKOUTS
// =====================


function createWorkoutList(list){

return list.map(item=>{


let checked =
todayCompleted.includes(item)
? "checked"
: "";


return `

<label class="workout-item">

<input type="checkbox" ${checked}>

${item}

</label>

`;

}).join("");

}



document.getElementById("morning-workout").innerHTML =
createWorkoutList(workoutToday.morning);


document.getElementById("night-workout").innerHTML =
createWorkoutList(workoutToday.night);




// =====================
// XP + SAVING
// =====================


document.querySelectorAll(".workout-item input")
.forEach(box=>{


box.addEventListener("change",function(){


let workout =
this.parentElement.innerText.trim();



if(this.checked){


if(!todayCompleted.includes(workout)){


todayCompleted.push(workout);


xp += 25;


workoutHistory.push({

date: todayDate,

workout: workout

});


}


}


else{


todayCompleted =
todayCompleted.filter(
item=>item !== workout
);


xp -= 25;


}



localStorage.setItem(
"xp",
xp
);


localStorage.setItem(
"todayCompleted",
JSON.stringify(todayCompleted)
);


localStorage.setItem(
"workoutHistory",
JSON.stringify(workoutHistory)
);


localStorage.setItem(
"lastWorkoutDate",
todayDate
);


updateXP();


});


});




// =====================
// LEVEL SYSTEM
// =====================


function updateLevel(){


let neededXP = level * 500;


if(xp >= neededXP){


level++;

xp = 0;


localStorage.setItem(
"level",
level
);


localStorage.setItem(
"xp",
xp
);


alert(
"🎉 LEVEL UP! You reached Level " + level
);


}


}





function updateXP(){


updateLevel();


document.getElementById("xp-display").innerHTML =

xp + " / " + (level * 500) + " XP";


}



updateXP();




// =====================
// PAGE NAVIGATION
// =====================


function hideAllPages(){

document.getElementById("home-page").classList.add("hidden");

document.getElementById("training-page").classList.add("hidden");

document.getElementById("progress-page").classList.add("hidden");

document.getElementById("badges-page").classList.add("hidden");

document.getElementById("profile-page").classList.add("hidden");

}



function startTraining(){

hideAllPages();

document.getElementById("training-page")
.classList.remove("hidden");

}


function openProgress(){

hideAllPages();

document.getElementById("progress-page")
.classList.remove("hidden");

}


function openBadges(){

hideAllPages();

document.getElementById("badges-page")
.classList.remove("hidden");

}


function openProfile(){

hideAllPages();

document.getElementById("profile-page")
.classList.remove("hidden");

}


function goHome(){

hideAllPages();

document.getElementById("home-page")
.classList.remove("hidden");

}
