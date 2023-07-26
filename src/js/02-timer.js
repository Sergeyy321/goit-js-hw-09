import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

startBtn.disabled = true;
const text = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future')
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
  };

  flatpickr(text, options)
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute)
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

startBtn.addEventListener('click', () => {
    text.disabled = true;
    let timer = setInterval(() => {
        let countdown = new Date(text.value) - new Date();
        startBtn.disabled = true;
        if (countdown >= 0) {
            let timeObject = convertMs(countdown);
            days.textContent = addLeadingZero(timeObject.days);
            hours.textContent = addLeadingZero(timeObject.hours);
            minutes.textContent = addLeadingZero(timeObject.minutes);
            seconds.textContent = addLeadingZero(timeObject.seconds);
        } else {
            Notiflix.Notify.success('Countdown finished');
            clearInterval(timer);
        }
    }, 1000)
})