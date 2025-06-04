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
const waitAttempt = (request, attempt = 1) => {
    return request().catch((error) => {
        if (attempt >= 3) {
            console.log("Max attempts reached");
            return null;
        }
        console.log(error);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(waitAttempt(request, attempt + 1));
            }, 200 * attempt);
        });
    });
};

const findLatitudeAndLongitude = (query) => {
    const request = () => {
        return axios.get('http://localhost:5000/location', {
            params: {
                q: query,
                format: 'json'
            }
        }).then((response) => {
            const { lat: latitude, lon: longitude } = response.data[0];
            return { latitude, longitude };
        });
    };

    return waitAttempt(request);
};

const findWeatherLatLon = (lat, lon) => {
    const request = () => {
        return axios.get("http://localhost:5000/weather", {
            params: { lat, lon }
        }).then((response) => {
            const tempK = response.data.main.temp;
            const tempC = Math.round(tempK - 273.15);
            const tempF = Math.round((tempC * 9) / 5 + 32);
            return { tempF, tempC };
        });
    };

    return waitAttempt(request);
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

// wave 5: //
// Relevant HTML:
//   </section>
//   <section class="sky__section">
//       <h2>Sky</h2>
//       <select id="skySelect">
//            <!-- sky options here -->
//        </select>
//   </section>

const skySelect = document.getElementById("skySelect");

function selectTheSkyDropdown () {
    skySelect.addEventListener("drop", () => {
        
    })
}

// wave 6: //

function resetCityName() {
    cityNameReset.addEventListener("click", () => {
        cityNameInput.value = "";
        headerCityName.textContent = "";
        tempF = 85;
        updateTempColor();
        // color stays green when I reset? See line 24 for the fix!
        // reset the sky to default too???
    });
}

resetCityName();

