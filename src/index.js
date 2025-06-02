let tempF = 85;
const tempValue = document.getElementById('tempValue')

const tempC = Math.round((tempF - 32) * 5 / 9);
tempValue.textContent = `${tempF}°F ⎯ ${tempC}°C`;

if (tempF >= 80) {
    tempValue.classList.add('red');
} else if (tempF >= 70) {
    tempValue.classList.add('orange');
} else if (tempF >= 60) {
    tempValue.classList.add('yellow');
} else if (tempF >= 50) {
    tempValue.classList.add('green');
} else {
    tempValue.classList.add('teal')
};