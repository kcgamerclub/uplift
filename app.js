// =====================
// LEVEL UP SAVE SYSTEM 🩷
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
// WORKOUT STATS 🧠
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



let todayDate =
new Date().toDateString();



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
// WEEKLY WORKOUT PLAN 🏋️
// =====================


const today =
new Date().getDay();



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





const workoutToday =
workouts[today];



document.getElementById("day-title").innerHTML =

"🩷 " 
+
workoutToday.day
+
"'s Training";







// =====================
// CREATE WORKOUT LIST
// =====================


function createWorkoutList(list){


return list.map(item=>{


let checked =

todayCompleted.includes(item)

?

"checked"

:

"";



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
// WORKOUT TRACKING 🧠
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
// CHECKBOX + XP SYSTEM ⭐
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

!(

entry.date === todayDate

&&

entry.workout === workout

)

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



updateStatsDisplay();



});



});









// =====================
// LEVEL SYSTEM 🎮
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


xp

+

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



// 💪 BACKSPOT

{
id:"backspot_builder",
category:"💪 Backspot Badges",
name:"Backspot Builder",
icon:"💪",
description:"Complete 10 backspot workouts",
type:"backspot",
requirement:10
},


{
id:"ankle_puller",
category:"💪 Backspot Badges",
name:"Ankle Puller",
icon:"🤝",
description:"Complete 25 backspot workouts",
type:"backspot",
requirement:25
},



// ⚡ CORE

{
id:"core_crusher",
category:"⚡ Core Badges",
name:"Core Crusher",
icon:"⚡",
description:"Complete 20 ab workouts",
type:"abs",
requirement:20
},



{
id:"ab_attack",
category:"⚡ Core Badges",
name:"Ab Attack",
icon:"🔥",
description:"Complete 50 ab workouts",
type:"abs",
requirement:50
},



// 🤸 FLEXIBILITY

{
id:"jump_master",
category:"🤸 Jump & Flexibility",
name:"Jump Master",
icon:"🤸",
description:"Complete 25 flexibility sessions",
type:"flexibility",
requirement:25
},



{
id:"toe_touch",
category:"🤸 Jump & Flexibility",
name:"Toe Touch Pro",
icon:"⭐",
description:"Complete 50 flexibility sessions",
type:"flexibility",
requirement:50
},



// 🍑 GLUTES

{
id:"glute_goddess",
category:"🍑 Glute & Leg Badges",
name:"Glute Goddess",
icon:"🍑",
description:"Complete 20 glute workouts",
type:"glutes",
requirement:20
},



// 🔥 TOTAL

{
id:"first_step",
category:"🔥 Consistency Badges",
name:"First Step",
icon:"🏆",
description:"Complete your first workout",
type:"total",
requirement:1
},



{
id:"consistency_queen",
category:"🔥 Consistency Badges",
name:"Consistency Queen",
icon:"🔥",
description:"Complete 7 workouts",
type:"total",
requirement:7
}


];
// =====================
// BADGE UNLOCK SYSTEM 🏆
// =====================


function checkBadges(){


badges.forEach(badge=>{


let amount =
workoutStats[badge.type];



if(amount >= badge.requirement){



if(!unlockedBadges.includes(badge.id)){


unlockedBadges.push(
badge.id
);



alert(
"🏆 BADGE UNLOCKED!\n"
+
badge.icon
+
" "
+
badge.name
);



}



}



});



localStorage.setItem(
"unlockedBadges",
JSON.stringify(unlockedBadges)
);



displayBadges();


}









// =====================
// BADGE GALLERY 🏆
// =====================


function displayBadges(){


let gallery =
document.getElementById(
"badge-gallery"
);



if(!gallery) return;



let html = "";



let categories = {};



badges.forEach(badge=>{


if(!categories[badge.category]){


categories[badge.category] = [];

}


categories[badge.category].push(badge);



});







Object.keys(categories).forEach(category=>{


html +=

`

<h3>

${category}

</h3>

<div class="badge-section">

`;



categories[category].forEach(badge=>{


let unlocked =

unlockedBadges.includes(
badge.id
);



html +=


`

<div class="badge-card ${
unlocked ? "unlocked" : "locked"
}">


<div class="badge-icon">

${
unlocked
?
badge.icon
:
"🔒"
}

</div>


<h4>

${badge.name}

</h4>


<p>

${badge.description}

</p>


</div>


`;



});



html +=

`

</div>

`;



});



gallery.innerHTML = html;



}






displayBadges();









// =====================
// STATS DISPLAY 📊
// =====================


function updateStatsDisplay(){


let total =
document.getElementById(
"total-workouts"
);



let backspot =
document.getElementById(
"backspot-count"
);



let abs =
document.getElementById(
"abs-count"
);



let glutes =
document.getElementById(
"glutes-count"
);



let flex =
document.getElementById(
"flex-count"
);




if(total){

total.innerHTML =
workoutStats.total;

}



if(backspot){

backspot.innerHTML =
workoutStats.backspot;

}



if(abs){

abs.innerHTML =
workoutStats.abs;

}



if(glutes){

glutes.innerHTML =
workoutStats.glutes;

}



if(flex){

flex.innerHTML =
workoutStats.flexibility;

}



}




updateStatsDisplay();








// =====================
// PROFILE LEVEL DISPLAY ⭐
// =====================


function updateProfile(){



let levelDisplay =

document.getElementById(
"level-display"
);



if(levelDisplay){


levelDisplay.innerHTML =

"⭐ Level "

+

level;



}




let badgeCount =

document.getElementById(
"badge-count"
);



if(badgeCount){


badgeCount.innerHTML =

unlockedBadges.length

+

" / "

+

badges.length

+

" Badges";



}



}



updateProfile();









// =====================
// NAVIGATION 🧭
// =====================


function showPage(page){


document
.querySelectorAll(".page")
.forEach(section=>{


section.style.display =
"none";


});



let selected =

document.getElementById(page);



if(selected){


selected.style.display =
"block";


}



}




document
.querySelectorAll("[data-page]")
.forEach(button=>{


button.addEventListener(
"click",
()=>{


showPage(
button.dataset.page
);


});


});









// =====================
// APP STARTUP 🩷
// =====================


showPage("home");


console.log(
"🔥 Level Up App Loaded Successfully!"
);
