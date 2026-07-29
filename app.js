// =====================
// LEVEL UP SAVE SYSTEM
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
// WORKOUT INTELLIGENCE STATS 🧠
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

strength:0

};



let todayDate = new Date().toDateString();


let lastWorkoutDate =
localStorage.getItem("lastWorkoutDate") || "";



if(lastWorkoutDate !== todayDate){

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
name:"Lilly Sabri Abs",
category:"abs"
},


"Deep Core Activation":{
name:"Deep Core Activation",
category:"abs"
},


"Jumps & Flexibility":{
name:"Jumps & Flexibility",
category:"flexibility"
},


"Lilly Sabri Glutes":{
name:"Lilly Sabri Glutes",
category:"glutes"
},


"Full Backspot Strength":{
name:"Full Backspot Strength",
category:"backspot"
},


"Lower Body Workout":{
name:"Lower Body Workout",
category:"legs"
},


"Upper Body Workout":{
name:"Upper Body Workout",
category:"upperBody"
},


"Strength Workout":{
name:"Strength Workout",
category:"strength"
}


};







// =====================
// WEEKLY TRAINING PLAN
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
// CREATE WORKOUT LIST
// =====================


function createWorkoutList(list){


return list.map(item=>{


let checked =
todayCompleted.includes(item)
? "checked"
:"";


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
// WORKOUT CATEGORY TRACKER 🧠
// =====================


function addWorkoutStat(workout){


let data = workoutDatabase[workout];


if(!data) return;



workoutStats.total++;



workoutStats[data.category]++;



localStorage.setItem(
"workoutStats",
JSON.stringify(workoutStats)
);


}






function removeWorkoutStat(workout){


let data = workoutDatabase[workout];


if(!data) return;



if(workoutStats.total > 0){

workoutStats.total--;

}



if(workoutStats[data.category] > 0){

workoutStats[data.category]--;

}



localStorage.setItem(
"workoutStats",
JSON.stringify(workoutStats)
);


}







// =====================
// CHECKBOX + XP SYSTEM
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
workoutDatabase[workout]?.category || "unknown"

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
entry => 
!(entry.date === todayDate && entry.workout === workout)
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
// XP + LEVEL SYSTEM
// =====================


function updateLevel(){


let neededXP =
level * 500;



while(xp >= neededXP){


xp -= neededXP;


level++;



localStorage.setItem(
"level",
level
);



alert(
"🎉 LEVEL UP!\nYou reached Level "
+
level
);



neededXP =
level * 500;


}



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


{
id:"first",
name:"First Step",
icon:"🏆",
description:"Complete your first workout",
type:"total",
requirement:1
},


{
id:"seven",
name:"Consistency Queen",
icon:"🔥",
description:"Complete 7 workouts",
type:"total",
requirement:7
},


{
id:"backspot",
name:"Backspot Builder",
icon:"💪",
description:"Complete 10 backspot workouts",
type:"backspot",
requirement:10
},


{
id:"jump",
name:"Jump Master",
icon:"🤸",
description:"Complete 25 flexibility sessions",
type:"flexibility",
requirement:25
},


{
id:"core",
name:"Core Crusher",
icon:"⚡",
description:"Complete 20 ab workouts",
type:"abs",
requirement:20
},


{
id:"glute",
name:"Glute Goddess",
icon:"🍑",
description:"Complete 20 glute workouts",
type:"glutes",
requirement:20
}


];







// =====================
// BADGE CHECKER
// =====================


function checkBadges(){


badges.forEach(badge=>{


let progress =
workoutStats[badge.type];



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
// BADGE GALLERY DISPLAY 🏆
// =====================


function displayBadges(){


let area =
document.getElementById("badge-list");



if(!area) return;



area.innerHTML = badges.map(badge=>{


let unlocked =
unlockedBadges.includes(badge.id);



return `


<div class="badge-card ${unlocked ? "unlocked" : "locked"}">


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



}).join("");



}



displayBadges();







// =====================
// PAGE NAVIGATION
// =====================


function hideAllPages(){


let pages = [

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


displayBadges();


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






// =====================
// SAVE STATS FOR PROFILE
// =====================


function updateStatsDisplay(){


let stats =
document.getElementById("stats-display");



if(!stats) return;



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



}



updateStatsDisplay();
