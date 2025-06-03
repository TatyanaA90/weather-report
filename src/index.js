"use strict";

let tempF = 85;

const tempValue = document.getElementById("tempValue")
const increaseButton = document.getElementById("increaseTempControl")
const decreaseButton = document.getElementById("decreaseTempControl");
const landscape = document.getElementById("landscape");
const currentTempButton = document.getElementById("currentTempButton");
const cityNameElement = document.getElementById("headerCityName");

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
// wave 4: //
const findLatitudeAndLongitude = (query, attempt = 1) => {
    return axios.get('http://localhost:5000/location',
        {
            params: {
                q: query,
                format: 'json'
            }
        })
        .then((response) => {
            const { lat: latitude, lon: longitude } = response.data[0];
            return { latitude, longitude };
        })
        .catch((error) => {
            if (attempt >= 3) {
                console.log(`Max attempts reached for ${query}`);
                return null;
            }
            console.log(error)
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(findLatitudeAndLongitude(query, attempt + 1));
                }, 200 * attempt);
            });
        });
};
/*
const findWeatherLatLon = (lat, lon, attempt = 1) => {
    return axios.get('http://localhost:5000/weather?TBD',
        {
            params: { lat, lon }
        }).them((response)) => {

}

    }

currentTempButton.addEventListener("click", () => {
    const city = 

}

findLatitudeAndLongitude(city)
    .then(({ latitude, longitude }) => {
        if (!latitude || !longitude) {
            tempValue.textContent = "Could not get location.";
            return null;
        }
        return findWeatherLatLon(latitude, longitude);
    })
    .catch((error) => {
        console.error(error);
        tempValue.textContent = "Error retrieving weather";
    });
});*/