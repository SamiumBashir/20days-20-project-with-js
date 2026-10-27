const minuteLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const miliSecondsLabel = document.getElementById('miliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let interval;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    interval = setInterval(updateTimer, 10);
    startButton.disabled = true;
    pauseButton.disabled = false;
};

function stopTimer() {
    clearInterval();
    addToLap();
    stopButton.disabled = false;
    pauseButton.disabled = true;
    startButton.disabled = false;
};

function pauseTimer() {
    clearInterval(interval);
    pauseButton.disabled = true;
    startButton.disabled = false;
};

function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    resetButton.disabled = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
};

function updateTimer() {
    miliseconds++;
    if (miliseconds === 100) {
        miliseconds = 0;
        seconds++
        if (seconds === 60) {
            seconds = 0;
            minutes++
        }
    }
    displayTimer();
}

function displayTimer() {
    miliSecondsLabel.textContent = padTime(miliseconds);
    secondsLabel.textContent = padTime(seconds);
    minuteLabel.textContent = padTime(minutes);
};

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function resetTimerData() {
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    lapList.innerHTML = ' ';
    displayTimer();
}

function addToLap() {
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(miliseconds)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span> Lap ${lapList.childElementCount + 1}: </span> ${lapTime}`;
    lapList.appendChild(listItem);
}