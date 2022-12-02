const refs = {
  startBtn: document.querySelector(`button[data-start]`),
  stopBtn: document.querySelector(`button[data-stop]`),
  body: document.body,
};

const PROMPT_DELAY = 1000;
let intervalId = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener(`click`, onStartBtnClick);
refs.stopBtn.addEventListener(`click`, onStopBtnClick);

function onStartBtnClick(e) {
  refs.stopBtn.disabled = false;
  refs.startBtn.disabled = true;
  intervalId = setInterval(changeBodyBgColor, PROMPT_DELAY);
}

function onStopBtnClick(e) {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(intervalId);
}

function changeBodyBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
