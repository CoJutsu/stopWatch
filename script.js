const getMins = document.querySelector("#mins");
const getSecs = document.querySelector("#secs");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");
const blur = document.querySelector(".timer");
const faded = document.querySelector(".timerStopped");
const getHours = document.querySelector("#hours");
const counter = new Audio("./sounds/counter.mp3");
const stop = new Audio("./sounds/stop.mp3");
const reset = new Audio("./sounds/reset.mp3");
const start = new Audio("./sounds/start.mp3");
const jutsu = new Audio("./sounds/hours.mp3");
const jojo = new Audio("./sounds/jojo.mp3");

let mins = 0;
let secs = 0;
let hours = 0;
let interval;
let array = [startBtn, stopBtn, resetBtn];

blur.classList.remove("stopped");
faded.style.display = "none";

startBtn.addEventListener("click", () => {
  start.play();
  blur.classList.remove("stopped");
  blur.classList.add("started");
  faded.style.display = "none";
  array.forEach((item) => {
    item.classList.remove("btnStopped");
    item.classList.add("btnStarted");
  });

  clearInterval(interval);
  interval = setInterval(timer, 1000);
});

stopBtn.addEventListener("click", () => {
  stop.play();
  blur.classList.remove("started");
  blur.classList.add("stopped");
  array.forEach((item) => {
    item.classList.remove("btnStarted");
    item.classList.add("btnStopped");
  });
  faded.style.display = "block";
  getHours.style.webkitAnimationPlayState = "paused";

  setTimeout(() => {
    clearInterval(interval);
    counter.pause();
  }, 1000);
});

resetBtn.addEventListener("click", () => {
  reset.play();
  blur.classList.remove("stopped");
  blur.classList.remove("started");
  faded.style.display = "none";
  array.forEach((item) => {
    item.classList.remove("btnStopped");
    item.classList.remove("btnStarted");
  });

  setTimeout(() => {
    clearInterval(interval);
    secs = 0;
    mins = 0;
    hours = 0;
    getSecs.innerHTML = "0" + secs;
    getMins.innerHTML = "0" + mins;
    getHours.innerHTML = "";
    counter.pause();
  }, 500);
});

function timer() {
  secs++;
  counter.play();
  getSecs.innerHTML = secs;
  if (secs <= 9) {
    getSecs.innerHTML = "0" + secs;
  }
  if (secs > 59) {
    mins++;
    getMins.innerHTML = "0" + mins;
    secs = 0;
    getSecs.innerHTML = "0" + secs;
  }
  if (mins > 9) {
    getMins.innerHTML = mins;
  }

  if (mins > 59) {
    jutsu.play();
    hours++;
    setTimeout(() => {
      if (hours == 1) {
        getHours.innerHTML = hours + "Hour";
      } else {
        getHours.innerHTML = hours + "Hours";
      }
    }, 1000);

    mins = 0;
    getMins.innerHTML = "0" + mins;
    secs = 0;
    getSecs.innerHTML = "0" + secs;
  }
}