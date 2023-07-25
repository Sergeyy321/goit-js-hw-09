import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

// const flatpickr =require('flatpickr')

const btnStart =document.querySelector('button[data-start]')
const days = document.querySelector('span[data-days]')
const hours = document.querySelector('span[data-hours]')
const minutes = document.querySelector('span[data-minutes]')
const seconds = document.querySelector('span[data-seconds]')

function convertMs(sec) {
    return {
        days: Math.floor(sec / 60 / 60 / 24).toString().padStart(2, 0),
        hours: Math.floor((sec % (60 * 60 * 24)) / 60 / 60).toString().padStart(2, 0),
        minutes: Math.floor((sec % (60 * 60)) / 60).toString().padStart(2, 0),
        seconds: (sec % 60).toString().padStart(2, 0),
    }
}

btnStart.addEventListener('click',startTimer)
btnStart.classList.add('button--inactive')
let dateFromUsrer
const currentDate = new Date()


flatpickr(document.querySelector('#datetime-picker'), {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
        dateFromUsrer = selectedDates[0];
        if (currentDate > dateFromUsrer) {
            Notiflix.Notify.failure('Please choose a date in the future') 
          return  
      } else
   btnStart .classList.remove('button--inactive')        
  },
})

function startTimer() {
  const id = setInterval(() =>{
    const current = new Date()  ; 
    const timerTime = convertMs (dateFromUsrer - current)
    if (timerTime.seconds >= 0) {
        days.textContent =  timerTime.days.toString().padStart(2,'0')      
        hours.textContent =  timerTime.hours.toString().padStart(2,'0') 
        minutes.textContent = timerTime.minutes.toString().padStart(2, '0') 
        seconds.textContent =  timerTime.seconds.toString().padStart(2,'0') 
    } else {
    clearInterval(id)
   Notiflix.Notify.success('Time is over')
    }       
  })}
