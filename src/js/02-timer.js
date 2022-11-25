import 'flatpickr/dist/flatpickr.js';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('.value[data-days');
const hoursEl = document.querySelector('.value[data-hours');
const minutesEl = document.querySelector('.value[data-minutes');
const secondsEl = document.querySelector('.value[data-seconds');
const inputEl = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      btnEl.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('You are good with the date :)');
      btnEl.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

btnEl.disabled = true;
btnEl.addEventListener('click', timeChanger);

function timeChanger() {
  btnEl.disabled = true;
  const timerId = setInterval(() => {
    const deltaTime = selectedDates[0] - new Date();
    const time = convertMs(deltaTime);
    updateClockface(time);
    if (deltaTime === 0) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
