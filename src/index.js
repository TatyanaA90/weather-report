"use strict";

let tempF = 85;

const tempValue = document.getElementById("tempValue")
const increaseButton = document.getElementById("increaseTempControl")
const decreaseButton = document.getElementById("decreaseTempControl");
const landscape = document.getElementById("landscape");
const currentTempButton = document.getElementById("currentTempButton");
const cityNameElement = document.getElementById("headerCityName");
const cityNameInput = document.getElementById("cityNameInput");
const headerCityName = document.getElementById("headerCityName");
const cityNameReset = document.getElementById("cityNameReset");
const skySelect = document.getElementById("skySelect");
const sky = document.getElementById("sky")

function convertToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5 / 9);
}

function updateTempColor() {
    let tempC = convertToCelsius(tempF);
    tempValue.textContent = tempF + "°F\n⎯\n" + tempC + "°C";

    // helps with reset button back to original temp + temp color
    tempValue.classList.remove("red", "orange", "yellow", "green", "teal");

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


function displayCityName() {
    cityNameInput.addEventListener("input", () => {
        headerCityName.textContent = cityNameInput.value;
    });
}

displayCityName();


// retry helper func with attemps but not nessasary for this project
// wave 4: //

const getWithRetry = (url, queryParams, attempt = 1) => {
    return axios.get(url, {
        params: queryParams
    }).then((response) => {
        const data = response.data;
        // Since our proxy always responds with status code 200, 
        // we need another way to detect when to retry.
        // After some research, it turns out that if data.error is not empty, 
        // it indicates we should retry.
        if (data.error) {
            if (attempt >= 5) {
                console.log("Max attempts reached!");
                return null;
            }
            console.log(`Empty response on attempt ${attempt}. Retrying...`);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(getWithRetry(url, queryParams, attempt + 1));
                }, 600 * attempt);
            });
        }

        return response;
    })
};

const findLatitudeAndLongitude = (query) => {
    const url = "http://localhost:5000/location";
    return getWithRetry(url, { q: query, format: 'json' }).then((response) => {
        if (!response.data) {
            return null;
        }
        const { lat: latitude, lon: longitude } = response.data[0];
        return { latitude, longitude };
    });
};
const findWeatherLatLon = (lat, lon) => {
    const url = "http://localhost:5000/weather";

    return getWithRetry(url, { lat, lon }).then((response) => {
        if (!response.data) {
            return null;
        }
        const tempK = response.data.main.temp;
        const tempC = Math.round(tempK - 273.15);
        const tempF = Math.round((tempC * 9) / 5 + 32);
        return { tempF, tempC };
    });
};


currentTempButton.addEventListener("click", () => {
    const city = cityNameElement.textContent.trim();
    if (!city) return;

    findLatitudeAndLongitude(city)
        .then(({ latitude, longitude }) => findWeatherLatLon(latitude, longitude))
        .then((result) => {
            tempF = result.tempF;
            updateTempColor();
        });
});

// wave 5: object loop up for scalability refactor?//
// we need to fix the weather garden spacing

function selectTheSkyDropdown () {
    skySelect.addEventListener("change", () => {
        const selectedSky = skySelect.value;
        if (selectedSky === 'sunny') {
            sky.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
        } else if (selectedSky === 'cloudy') {
            sky.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
        } else if (selectedSky === 'rainy') {
            sky.textContent = "🌧🌈🌧🌧💧🌧🌦🌧💧🌧🌧";
        } else if (selectedSky === 'snowy') {
            sky.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
        } else if (selectedSky === 'select_one') {
            sky.textContent = ""
        }
    })
}

selectTheSkyDropdown ()



// wave 6: //

function resetCityName() {
    cityNameReset.addEventListener("click", () => {
        cityNameInput.value = "";
        headerCityName.textContent = "";
        tempF = 85;
        updateTempColor();
        // color stays green when I reset? See line 24 for the fix!
        // reset the sky to default too???
        sky.textContent = "";
        skySelect.value = "select_one";
    });
}

resetCityName();

