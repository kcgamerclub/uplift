// =========================
// UPLIFT v2.3 APP ENGINE 🩷
// PART 1/3
// =========================


// =========================
// SAVED DATA 💾
// =========================


let xp = Number(localStorage.getItem("xp")) || 0;

let level = Number(localStorage.getItem("level")) || 1;


let unlockedBadges = JSON.parse(
localStorage.getItem("unlockedBadges")
) || [];


let todayCompleted = JSON.parse(
localStorage.getItem("todayCompleted")
) || [];


let workoutHistory = JSON.parse(
localStorage.getItem("workoutHistory")
) || [];



let workoutStats = JSON.parse(
localStorage.getItem("workoutStats")
) || {


total:0,

abs:0,

backspot:0,

flexibility:0,

glutes:0,

legs:0,

strength:0,

upperBody:0


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







// =========================
// WORKOUT INTELLIGENCE 🧠
// =========================


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









// =========================
// WEEKLY WORKOUT PLAN 📅
// =========================



const day =
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




const todayWorkout =
workouts[day];
// =========================
// XP + BADGE SYSTEM 🏆
// PART 2/3
// =========================



function addXP(amount){


xp += amount;



while(xp >= level * 500){


xp -= level * 500;


level++;


alert(
"🎉 LEVEL UP!\n\nYou reached Level " + level
);


}



saveData();

updateDashboard();


}









// =========================
// COMPLETE WORKOUT ☑️
// =========================



function completeWorkout(name){



if(todayCompleted.includes(name)){


return;


}



todayCompleted.push(name);



let info =
workoutDatabase[name];





if(info){


workoutStats[info.category]++;


}





workoutStats.total++;





workoutHistory.push({


workout:name,

category:
info?.category || "other",

date:
new Date().toDateString()


});





addXP(25);



checkBadges();


saveData();



}









// =========================
// 99 BADGE COLLECTION 🏆
// =========================



const badges = [



// 🔥 CONSISTENCY


{
id:"first_workout",
category:"🔥 Consistency",
icon:"🔥",
name:"First Step",
description:"Complete your first workout",
check:()=>workoutStats.total>=1
},


{
id:"workout10",
category:"🔥 Consistency",
icon:"💪",
name:"Getting Started",
description:"Complete 10 workouts",
check:()=>workoutStats.total>=10
},


{
id:"workout25",
category:"🔥 Consistency",
icon:"⭐",
name:"Committed",
description:"Complete 25 workouts",
check:()=>workoutStats.total>=25
},


{
id:"workout50",
category:"🔥 Consistency",
icon:"🏅",
name:"Dedicated",
description:"Complete 50 workouts",
check:()=>workoutStats.total>=50
},


{
id:"workout100",
category:"🔥 Consistency",
icon:"👑",
name:"100 Club",
description:"Complete 100 workouts",
check:()=>workoutStats.total>=100
},







// 💪 BACKSPOT MASTERY


{
id:"backspot1",
category:"💪 Backspot Mastery",
icon:"📣",
name:"Backspot Starter",
description:"Complete 1 backspot workout",
check:()=>workoutStats.backspot>=1
},


{
id:"backspot5",
category:"💪 Backspot Mastery",
icon:"🤝",
name:"Strong Support",
description:"Complete 5 backspot workouts",
check:()=>workoutStats.backspot>=5
},


{
id:"backspot10",
category:"💪 Backspot Mastery",
icon:"🦾",
name:"Power Puller",
description:"Complete 10 backspot workouts",
check:()=>workoutStats.backspot>=10
},


{
id:"backspot25",
category:"💪 Backspot Mastery",
icon:"🏆",
name:"Backspot Beast",
description:"Complete 25 backspot workouts",
check:()=>workoutStats.backspot>=25
},







// ⚡ CORE STRENGTH


{
id:"core1",
category:"⚡ Core Strength",
icon:"⚡",
name:"Core Starter",
description:"Complete 1 ab workout",
check:()=>workoutStats.abs>=1
},


{
id:"core10",
category:"⚡ Core Strength",
icon:"🔥",
name:"Core Builder",
description:"Complete 10 ab workouts",
check:()=>workoutStats.abs>=10
},


{
id:"core25",
category:"⚡ Core Strength",
icon:"💎",
name:"Core Crusher",
description:"Complete 25 ab workouts",
check:()=>workoutStats.abs>=25
},







// 🤸 FLEXIBILITY


{
id:"flex1",
category:"🤸 Flexibility",
icon:"🌸",
name:"Stretch Starter",
description:"Complete 1 flexibility workout",
check:()=>workoutStats.flexibility>=1
},


{
id:"flex10",
category:"🤸 Flexibility",
icon:"✨",
name:"Flexible Athlete",
description:"Complete 10 flexibility workouts",
check:()=>workoutStats.flexibility>=10
},


{
id:"flex25",
category:"🤸 Flexibility",
icon:"🌟",
name:"Flexibility Star",
description:"Complete 25 flexibility workouts",
check:()=>workoutStats.flexibility>=25
},







// 🦵 LOWER BODY


{
id:"legs1",
category:"🦵 Lower Body",
icon:"🦵",
name:"Strong Start",
description:"Complete 1 leg workout",
check:()=>workoutStats.legs>=1
},


{
id:"legs10",
category:"🦵 Lower Body",
icon:"🔥",
name:"Power Legs",
description:"Complete 10 leg workouts",
check:()=>workoutStats.legs>=10
},







// 🍑 GLUTES


{
id:"glutes1",
category:"🍑 Glutes",
icon:"🍑",
name:"Activation",
description:"Complete 1 glute workout",
check:()=>workoutStats.glutes>=1
},


{
id:"glutes10",
category:"🍑 Glutes",
icon:"🔥",
name:"Glute Builder",
description:"Complete 10 glute workouts",
check:()=>workoutStats.glutes>=10
},







// ⭐ LEVELS


{
id:"level5",
category:"⭐ Levels",
icon:"🌟",
name:"Level 5 Athlete",
description:"Reach Level 5",
check:()=>level>=5
},


{
id:"level10",
category:"⭐ Levels",
icon:"👑",
name:"Elite Athlete",
description:"Reach Level 10",
check:()=>level>=10
},


{
id:"level25",
category:"⭐ Levels",
icon:"💎",
name:"Legend",
description:"Reach Level 25",
check:()=>level>=25
}



];









// =========================
// CHECK BADGES 🏆
// =========================



function checkBadges(){



badges.forEach(badge=>{


if(
badge.check()
&&
!unlockedBadges.includes(badge.id)
){


unlockedBadges.push(
badge.id
);



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



saveData();



}









// =========================
// SAVE SYSTEM 💾
// =========================



function saveData(){


localStorage.setItem(
"xp",
xp
);



localStorage.setItem(
"level",
level
);



localStorage.setItem(
"unlockedBadges",
JSON.stringify(unlockedBadges)
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
"workoutStats",
JSON.stringify(workoutStats)
);



localStorage.setItem(
"lastWorkoutDate",
todayDate
);



}
// =========================
// NAVIGATION + PAGES 📱
// PART 3/3
// =========================



function hidePages(){


document.querySelectorAll(".page")
.forEach(page=>{


page.classList.add("hidden");


});


}






function showPage(id){


hidePages();


let page =
document.getElementById(id);


if(page){

page.classList.remove("hidden");

}


}






function goHome(){


showPage("home-page");

updateDashboard();


}






function openTraining(){


showPage("training-page");

loadWorkouts();


}






function openProgress(){


showPage("progress-page");

updateProgress();


}






function openBadges(){


showPage("badges-page");

loadBadges();


}






function openProfile(){


showPage("profile-page");

updateProfile();


}









// =========================
// LOAD WORKOUTS 💪
// =========================



function loadWorkouts(){



let morning =
document.getElementById("morning-workout");


let night =
document.getElementById("night-workout");



if(!morning || !night) return;



morning.innerHTML="";

night.innerHTML="";





todayWorkout.morning.forEach(workout=>{



morning.innerHTML += `


<div class="workout-item">


<input 

type="checkbox"

${todayCompleted.includes(workout) ? "checked":""}

onchange="completeWorkout('${workout}')"

>


<span>

${workout}

</span>


</div>


`;



});








todayWorkout.night.forEach(workout=>{



night.innerHTML += `


<div class="workout-item">


<input 

type="checkbox"

${todayCompleted.includes(workout) ? "checked":""}

onchange="completeWorkout('${workout}')"

>


<span>

${workout}

</span>


</div>


`;



});


}









// =========================
// DASHBOARD 🏠
// =========================



function updateDashboard(){



let levelDisplay =
document.getElementById("level-display");

let xpDisplay =
document.getElementById("xp-display");

let xpFill =
document.getElementById("xp-fill");





if(levelDisplay){

levelDisplay.innerText =
level;

}





if(xpDisplay){

xpDisplay.innerText =
xp + " / " + (level*500) + " XP";

}





if(xpFill){

xpFill.style.width =
((xp/(level*500))*100)+"%";

}





let badges =
document.getElementById("badge-count");

let workouts =
document.getElementById("workout-count");





if(badges){

badges.innerText =
unlockedBadges.length + "/99";

}





if(workouts){

workouts.innerText =
workoutStats.total;

}


}









// =========================
// BADGE GALLERY 🏆
// =========================



function loadBadges(){



let container =
document.getElementById("badge-list");



if(!container) return;



container.innerHTML="";



let categories = {};





badges.forEach(badge=>{



if(!categories[badge.category]){


categories[badge.category]=[];


}



categories[badge.category].push(badge);



});








for(let category in categories){



let section = `


<div class="badge-category">


<h3>

${category}

</h3>



<div class="badge-grid">


`;






categories[category].forEach(badge=>{



let unlocked =
unlockedBadges.includes(badge.id);





section += `


<div class="badge-card ${unlocked ? "unlocked":"locked"}">


<div class="badge-icon">

${badge.icon}

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





section += `


</div>


</div>


`;





container.innerHTML += section;



}




let progress =
document.getElementById("badge-progress");



if(progress){

progress.innerText =
unlockedBadges.length + " / 99 Badges";

}



}









// =========================
// PROGRESS PAGE 📈
// =========================



function updateProgress(){



let box =
document.getElementById("stats-display");



if(!box) return;



box.innerHTML = `


<h3>
⭐ Level ${level}
</h3>


<p>
💪 Total Workouts: ${workoutStats.total}
</p>


<p>
⚡ Core: ${workoutStats.abs}
</p>


<p>
📣 Backspot: ${workoutStats.backspot}
</p>


<p>
🤸 Flexibility: ${workoutStats.flexibility}
</p>


<p>
🍑 Glutes: ${workoutStats.glutes}
</p>


<p>
🦵 Legs: ${workoutStats.legs}
</p>


`;



}









// =========================
// PROFILE PAGE 👤
// =========================



function updateProfile(){



let profile =
document.getElementById("profile-stats");



if(!profile) return;



profile.innerHTML = `


<p>
⭐ Level: ${level}
</p>


<p>
🏆 Badges: ${unlockedBadges.length}
</p>


<p>
💪 Workouts: ${workoutStats.total}
</p>


`;



}









// =========================
// RESET APP ⚠️
// =========================



function resetProgress(){



if(confirm("Reset all UpLift progress?")){


localStorage.clear();


location.reload();


}


}









// =========================
// START APP 🚀
// =========================



window.onload=function(){


loadWorkouts();


updateDashboard();


};
