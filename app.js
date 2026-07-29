function openTraining() {

    document.getElementById("home-page").classList.add("hidden");

    document.getElementById("training-page").classList.remove("hidden");

}



function openStrength() {

    document.getElementById("training-page").classList.add("hidden");

    document.getElementById("strength-page").classList.remove("hidden");

}



function goTraining() {

    document.getElementById("strength-page").classList.add("hidden");

    document.getElementById("training-page").classList.remove("hidden");

}



function goHome() {

    document.getElementById("training-page").classList.add("hidden");

    document.getElementById("home-page").classList.remove("hidden");

}
