let currentTemperature = 20;
const tempValue = document.getElementById('tempValue')


tempValue.textContent = currentTemperature

if (currentTemperature >= 80) {
    tempValue.classList.add('red');
} else if (currentTemperature >= 70) {
    tempValue.classList.add('orange');
} else if (currentTemperature >= 60) {
    tempValue.classList.add('yellow');
} else if (currentTemperature >= 50) {
    tempValue.classList.add('green');
} else {
    tempValue.classList.add('teal')
};