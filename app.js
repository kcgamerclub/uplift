// =====================
// LEVEL UP SAVE SYSTEM 🩷
// UPDATE 1/3
// =====================


let xp = Number(localStorage.getItem("xp")) || 0;

let level = Number(localStorage.getItem("level")) || 1;


let todayCompleted = JSON.parse(
localStorage.getItem("todayCompleted")
) || [];


let workoutHistory = JSON.parse(
localStorage.getItem("workoutHistory")
) || [];


let unlockedBadges = JSON.parse(
localStorage.getItem("unlockedBadges")
) || [];



// =====================
// WORKOUT INTELLIGENCE 🧠
// =====================


let workoutStats = JSON.parse(
localStorage.getItem("workoutStats")
) || {

total:0,

abs:0,

backspot:0,

flexibility:0,

glutes:0,

legs:0,

upperBody:0,

strength:0,

streak:0

};



let todayDate = new Date().toDateString();



if(localStorage.getItem("lastWorkoutDate") !== todayDate){

todayCompleted = [];

localStorage.setItem(
"todayCompleted",
JSON.stringify(todayCompleted)
);

}



// =====================
// WORKOUT DATABASE 🧠
// =====================


const workoutDatabase = {


"Lilly Sabri Abs":{

category:"abs"

},


"Deep Core Activation":{

category:"abs"

},


"Jumps & Flexibility":{

category:"flexibility"

},


"Lilly Sabri Glutes":{

category:"glutes"

},


"Full Backspot Strength":{

category:"backspot"

},


"Lower Body Workout":{

category:"legs"

},


"Upper Body Workout":{

category:"upperBody"

},


"Strength Workout":{

category:"strength"

}


};





// =====================
// TRAINING PLAN
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

},


6:{
day:"Saturday",

morning:[
"Lilly Sabri Abs",
"Deep Core Activation",
"Jumps & Flexibility"
],

night:[
"Lilly Sabri Glutes",
"Full Backspot Strength"
]

}


};



const workoutToday = workouts[today];



document.getElementById("day-title").innerHTML =

"🩷 " + workoutToday.day + "'s Training";





// =====================
// CREATE WORKOUT BOXES
// =====================


function createWorkoutList(list){


return list.map(workout=>{


let checked =
todayCompleted.includes(workout)
?
"checked"
:
"";


return `

<label class="workout-item">

<input type="checkbox" ${checked}>

${workout}

</label>

`;


}).join("");



}



document.getElementById("morning-workout").innerHTML =
createWorkoutList(workoutToday.morning);


document.getElementById("night-workout").innerHTML =
createWorkoutList(workoutToday.night);





// =====================
// TRACK CATEGORIES
// =====================


function addWorkoutStat(workout){


let data = workoutDatabase[workout];


if(!data)return;


workoutStats.total++;


workoutStats[data.category]++;


localStorage.setItem(
"workoutStats",
JSON.stringify(workoutStats)
);


}





function removeWorkoutStat(workout){


let data = workoutDatabase[workout];


if(!data)return;


if(workoutStats.total > 0)
workoutStats.total--;


if(workoutStats[data.category] > 0)
workoutStats[data.category]--;


localStorage.setItem(
"workoutStats",
JSON.stringify(workoutStats)
);


}





// =====================
// CHECKBOX SYSTEM
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


addWorkoutStat(workout);



workoutHistory.push({

date:todayDate,

workout:workout,

category:
workoutDatabase[workout]?.category

});


}


this.parentElement.style.textDecoration =
"line-through";


}



else{


todayCompleted =
todayCompleted.filter(
item=>item !== workout
);


xp -= 25;


removeWorkoutStat(workout);


workoutHistory =
workoutHistory.filter(
entry=>
!(entry.date===todayDate &&
entry.workout===workout)
);


this.parentElement.style.textDecoration =
"none";


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



checkBadges();


updateXP();


});


});
// =====================
// XP + LEVEL SYSTEM ⭐
// UPDATE 2/3
// =====================


function updateLevel(){


let neededXP = level * 500;



while(xp >= neededXP){


xp -= neededXP;


level++;


alert(
"🎉 LEVEL UP!\nYou reached Level " + level
);



neededXP = level * 500;


}



localStorage.setItem(
"level",
level
);


localStorage.setItem(
"xp",
xp
);


}




function updateXP(){


updateLevel();



let display =
document.getElementById("xp-display");



if(display){


display.innerHTML =

xp +
" / "
+
(level * 500)
+
" XP";


}


}



updateXP();






// =====================
// BADGE DATABASE 🏆
// =====================



const badges = [



// 🔥 CONSISTENCY


{
id:"first_step",
name:"First Step",
icon:"🏆",
category:"Consistency",
description:"Complete your first workout",
type:"total",
requirement:1
},


{
id:"seven_fire",
name:"7 Day Fire",
icon:"🔥",
category:"Consistency",
description:"Complete 7 workouts",
type:"total",
requirement:7
},


{
id:"two_week",
name:"Two Week Warrior",
icon:"⚡",
category:"Consistency",
description:"Complete 14 workouts",
type:"total",
requirement:14
},


{
id:"month",
name:"30 Day Queen",
icon:"👑",
category:"Consistency",
description:"Complete 30 workouts",
type:"total",
requirement:30
},


{
id:"legend",
name:"100 Workout Legend",
icon:"💎",
category:"Consistency",
description:"Complete 100 workouts",
type:"total",
requirement:100
},




// 💪 BACKSPOT


{
id:"backspot_start",
name:"Backspot Beginner",
icon:"👐",
category:"Backspot Power",
description:"Complete 5 backspot workouts",
type:"backspot",
requirement:5
},


{
id:"backspot_builder",
name:"Backspot Builder",
icon:"💪",
category:"Backspot Power",
description:"Complete 10 backspot workouts",
type:"backspot",
requirement:10
},


{
id:"flyer_helper",
name:"Flyer Helper",
icon:"🦾",
category:"Backspot Power",
description:"Complete 25 backspot workouts",
type:"backspot",
requirement:25
},


{
id:"ankle_pro",
name:"Ankle Pull Pro",
icon:"🏋️",
category:"Backspot Power",
description:"Complete 50 backspot workouts",
type:"backspot",
requirement:50
},


{
id:"elite_backspot",
name:"Elite Backspot",
icon:"👑",
category:"Backspot Power",
description:"Complete 100 backspot workouts",
type:"backspot",
requirement:100
},




// ⚡ CORE


{
id:"core_start",
name:"Core Starter",
icon:"⚡",
category:"Core",
description:"Complete 5 ab workouts",
type:"abs",
requirement:5
},


{
id:"ab_apprentice",
name:"Ab Apprentice",
icon:"🔥",
category:"Core",
description:"Complete 20 ab workouts",
type:"abs",
requirement:20
},


{
id:"core_crusher",
name:"Core Crusher",
icon:"💎",
category:"Core",
description:"Complete 50 ab workouts",
type:"abs",
requirement:50
},


{
id:"six_pack",
name:"Six Pack Strength",
icon:"👑",
category:"Core",
description:"Complete 100 ab workouts",
type:"abs",
requirement:100
},




// 🍑 GLUTES


{
id:"glute_start",
name:"Glute Starter",
icon:"🍑",
category:"Lower Body",
description:"Complete 5 glute workouts",
type:"glutes",
requirement:5
},


{
id:"glute_goddess",
name:"Glute Goddess",
icon:"🔥",
category:"Lower Body",
description:"Complete 20 glute workouts",
type:"glutes",
requirement:20
},


{
id:"lower_power",
name:"Lower Body Power",
icon:"🦵",
category:"Lower Body",
description:"Complete 50 glute workouts",
type:"glutes",
requirement:50
},



// 🤸 FLEXIBILITY


{
id:"jump_start",
name:"Jump Starter",
icon:"🤸",
category:"Flexibility",
description:"Complete 5 flexibility sessions",
type:"flexibility",
requirement:5
},


{
id:"jump_master",
name:"Jump Master",
icon:"⭐",
category:"Flexibility",
description:"Complete 25 flexibility sessions",
type:"flexibility",
requirement:25
},


{
id:"flex_queen",
name:"Flexibility Queen",
icon:"🎀",
category:"Flexibility",
description:"Complete 50 flexibility sessions",
type:"flexibility",
requirement:50
},


];
// =====================
// MORE BADGES 🏆
// UPDATE 3/3
// =====================


// 🏋️ STRENGTH


badges.push(

{
id:"strength_start",
name:"Strength Starter",
icon:"🏋️",
category:"Strength",
description:"Complete 5 strength workouts",
type:"strength",
requirement:5
},


{
id:"power_player",
name:"Power Player",
icon:"💪",
category:"Strength",
description:"Complete 25 strength workouts",
type:"strength",
requirement:25
},


{
id:"athlete_mode",
name:"Athlete Mode",
icon:"🔥",
category:"Strength",
description:"Complete 50 strength workouts",
type:"strength",
requirement:50
},



// 🦵 LEGS


{
id:"leg_power",
name:"Leg Power",
icon:"🦵",
category:"Legs",
description:"Complete 25 leg workouts",
type:"legs",
requirement:25
},


{
id:"explosive",
name:"Explosive Athlete",
icon:"⚡",
category:"Legs",
description:"Complete 50 leg workouts",
type:"legs",
requirement:50
},



// 🎀 CHEER JOURNEY


{
id:"first_stunt",
name:"First Stunt",
icon:"🎀",
category:"Cheer",
description:"Complete your first cheer strength session",
type:"backspot",
requirement:1
},


{
id:"team_player",
name:"Team Player",
icon:"📣",
category:"Cheer",
description:"Complete 25 total workouts",
type:"total",
requirement:25
},


{
id:"competition_ready",
name:"Competition Ready",
icon:"🏆",
category:"Cheer",
description:"Complete 75 workouts",
type:"total",
requirement:75
},



// 💎 SPECIAL


{
id:"dedication",
name:"Diamond Dedication",
icon:"💎",
category:"Special",
description:"Complete 150 workouts",
type:"total",
requirement:150
},


{
id:"level_up_legend",
name:"LEVEL UP Legend",
icon:"👑",
category:"Special",
description:"Complete 250 workouts",
type:"total",
requirement:250
}


);




// =====================
// BADGE CHECKER 🏆
// =====================


function checkBadges(){


badges.forEach(badge=>{


let progress =
workoutStats[badge.type] || 0;



if(
progress >= badge.requirement &&
!unlockedBadges.includes(badge.id)

){


unlockedBadges.push(badge.id);



alert(

"🏆 BADGE UNLOCKED!\n\n"

+

badge.icon

+

" "

+

badge.name

);



}


});



localStorage.setItem(

"unlockedBadges",

JSON.stringify(unlockedBadges)

);



displayBadges();


}







// =====================
// BADGE GALLERY DISPLAY
// =====================


function displayBadges(){


let area =
document.getElementById("badge-list");



if(!area)return;



area.innerHTML = "";



let categories = {};



badges.forEach(badge=>{


if(!categories[badge.category]){

categories[badge.category]=[];

}


categories[badge.category].push(badge);


});




Object.keys(categories).forEach(category=>{


area.innerHTML +=

`

<h2 class="badge-category">

${category}

</h2>

`;



categories[category].forEach(badge=>{


let unlocked =
unlockedBadges.includes(badge.id);



area.innerHTML +=


`

<div class="badge-card ${
unlocked
?
"unlocked"
:
"locked"
}">


<div class="badge-icon">

${badge.icon}

</div>



<h3>

${badge.name}

</h3>



<p>

${badge.description}

</p>



<p>

${
unlocked
?
"✨ UNLOCKED"
:
"🔒 LOCKED"

}

</p>



</div>

`;



});


});



}





displayBadges();







// =====================
// PAGE NAVIGATION
// =====================


function hideAllPages(){


let pages=[

"home-page",

"training-page",

"progress-page",

"badges-page",

"profile-page"

];



pages.forEach(page=>{


let element =
document.getElementById(page);



if(element){

element.classList.add("hidden");

}


});


}





function startTraining(){


hideAllPages();


document
.getElementById("training-page")
.classList.remove("hidden");


}





function openProgress(){


hideAllPages();


document
.getElementById("progress-page")
.classList.remove("hidden");


}





function openBadges(){


hideAllPages();


document
.getElementById("badges-page")
.classList.remove("hidden");


displayBadges();


}





function openProfile(){


hideAllPages();


document
.getElementById("profile-page")
.classList.remove("hidden");


}





function goHome(){


hideAllPages();


document
.getElementById("home-page")
.classList.remove("hidden");


}






// =====================
// PROFILE STATS
// =====================


function updateStatsDisplay(){


let stats =
document.getElementById("stats-display");



if(!stats)return;



stats.innerHTML = `


<h3>📊 Your Stats</h3>


<p>Total Workouts: ${workoutStats.total}</p>

<p>🔥 Abs: ${workoutStats.abs}</p>

<p>💪 Backspot: ${workoutStats.backspot}</p>

<p>🤸 Flexibility: ${workoutStats.flexibility}</p>

<p>🍑 Glutes: ${workoutStats.glutes}</p>

<p>🦵 Legs: ${workoutStats.legs}</p>

<p>🏋️ Strength: ${workoutStats.strength}</p>


`;



  // =====================
// TEST RESET BUTTON 🛠️
// =====================

function resetProgress(){

let confirmReset = confirm(
"Reset all LEVEL UP progress?"
);


if(confirmReset){

localStorage.removeItem("xp");

localStorage.removeItem("level");

localStorage.removeItem("todayCompleted");

localStorage.removeItem("workoutHistory");

localStorage.removeItem("workoutStats");

localStorage.removeItem("unlockedBadges");


alert(
"✨ LEVEL UP reset! Fresh start!"
);


location.reload();

}

}
}



updateStatsDisplay();
