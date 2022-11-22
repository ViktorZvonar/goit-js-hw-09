function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
console.log(startBtn);
const stopBtn = document.querySelector('button[data-stop]');
console.log(stopBtn);
let intervalId = null;

startBtn.addEventListener('click', changeBodyColor);
stopBtn.addEventListener('click', stopChangeBodyColor);

function changeBodyColor() {
  startBtn.setAttribute('disabled', true);
  intervalId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
}

function stopChangeBodyColor() {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled');
}
