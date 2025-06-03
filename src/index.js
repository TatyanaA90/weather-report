"use strict";

let tempF = 85;

const tempValue = document.getElementById("tempValue")
const increaseButton = document.getElementById("increaseTempControl")
const decreaseButton = document.getElementById("decreaseTempControl");
const landscape = document.getElementById("landscape");

function convertToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5 / 9);
}

function updateTempColor() {
    let tempC = convertToCelsius(tempF);
    tempValue.textContent = tempF + "°F\n⎯\n" + tempC + "°C";

    if (tempF >= 80) {
        tempValue.classList.add("red");
        landscape.textContent = "🏜️☀️🏖️🌞🏝️☀️🌵🔥⛱️🌤️";
    } else if (tempF >= 70) {
        tempValue.classList.add("orange");
        landscape.textContent = "🌿🌻🌼🌸🌷🪻☀️🦋🐝🌤️"; 
    } else if (tempF >= 60) {
        tempValue.classList.add("yellow");
        landscape.textContent = "🌳🍂🪵🍃🦉🍁🐿️🍄🍁⛅";
    } else if (tempF >= 50) {
        tempValue.classList.add("green");
        landscape.textContent = "🍁🌦️🌾🌤️🐛🌼🌦️🍂🪲☘️";
    } else {
        tempValue.classList.add("teal");
        landscape.textContent = "❄️⛄🌨️🌬️⛄🌲☃️❄️🥶🌨️";
    }
}

increaseButton.addEventListener("click", function () {
    tempF++;
    updateTempColor();
});

decreaseButton.addEventListener("click", function () {
    tempF--;
    updateTempColor();
});
updateTempColor();



const cityNameInput = document.getElementById("cityNameInput");
const headerCityName = document.getElementById("headerCityName");

function displayCityName() {
    cityNameInput.addEventListener("input", () => {
        headerCityName.textContent = cityNameInput.value;
    });
}

displayCityName();


// wave 6: // document.getElementById("cityNameInput").value = "";