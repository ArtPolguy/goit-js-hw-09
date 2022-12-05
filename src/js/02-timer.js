import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector(`button[ data-start]`),
  valueDays: document.querySelector(`span[data-days]`),
  valueHours: document.querySelector(`span[data-hours]`),
  valueMinutes: document.querySelector(`span[data-minutes]`),
  valueSeconds: document.querySelector(`span[data-seconds]`),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      alert('Please choose a date in the future');
      return;
    }
    if (selectedDates[0] > options.defaultDate) {
      refs.startBtn.disabled = false;
    }
  },
};
const fp = flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.isActive = false;
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = fp.selectedDates[0];

    this.intervalID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.convertMs(deltaTime);

      if (deltaTime < 0) {
        this.stop();
        return;
      }
      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({ onTick: updateClockface });

refs.startBtn.addEventListener(`click`, timer.start.bind(timer));

function updateClockface({ days, hours, minutes, seconds }) {
  refs.valueDays.textContent = `${days}`;
  refs.valueHours.textContent = `${hours}`;
  refs.valueMinutes.textContent = `${minutes}`;
  refs.valueSeconds.textContent = `${seconds}`;
}
