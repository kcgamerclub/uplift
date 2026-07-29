// =====================
// PLAYER SAVE SYSTEM
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
// BADGE DATABASE
// =====================


const badges = [


{
id:"first",
name:"First Step",
icon:"🏆",
description:"Complete your first workout",
requirement:1
},


{
id:"seven",
name:"Consistency Queen",
icon:"🔥",
description:"Complete 7 workouts",
requirement:7
},


{
id:"backspot",
name:"Backspot Builder",
icon:"💪",
description:"Complete 10 backspot workouts",
requirement:10
},


{
id:"jump",
name:"Jump Master",
icon:"🤸",
description:"Complete 25 flexibility sessions",
requirement:25
},


{
id:"core",
name:"Core Crusher",
icon:"⚡",
description:"Complete 20 ab workouts",
requirement:20
}


];







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
// XP + CHECKBOX SYSTEM
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

date:todayDate,

workout:workout

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
// BADGES
// =====================


function checkBadges(){


let totalWorkouts =
workoutHistory.length;



badges.forEach(badge=>{


if(
totalWorkouts >= badge.requirement &&
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







function displayBadges(){


let area =
document.getElementById("badge-list");



if(!area) return;



area.innerHTML =
badges.map(badge=>{


let unlocked =
unlockedBadges.includes(badge.id);



return `


<div class="badge-card">


<h3>

${badge.icon}
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
// LEVEL SYSTEM
// =====================


function updateLevel(){


let neededXP =
level * 500;



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
"🎉 LEVEL UP!\nYou reached Level "
+
level
);


}


}







function updateXP(){


updateLevel();



document.getElementById("xp-display").innerHTML =

xp +
" / "
+
(level * 500)
+
" XP";



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
