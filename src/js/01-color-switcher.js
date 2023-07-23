function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector("button[data-start]")
const stopBtn = document.querySelector("button[data-stop]")
const bodyCol = document.querySelector("body")

let id = null
stopBtn.disabled = true
startBtn.addEventListener("click",playStart)
stopBtn.addEventListener("click",playStop)

function playStart() {
    startBtn.disabled = true
    stopBtn.disabled = false
    id = setInterval(()=>{bodyCol.style.backgroundColor = getRandomHexColor()},1000)
}

function playStop() {
    startBtn.disabled = false
    stopBtn.disabled = true
    clearInterval(id)
}










