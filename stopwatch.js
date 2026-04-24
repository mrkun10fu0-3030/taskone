'use strict';

const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let state = 'start';
let timerId;
let elapsedMs = 0;
let isRunning = false

function timeToString(millis) {
    const ms = millis % 10;
    const s = Math.floor(millis / 1000) % 60;
    const m = Math.floor(millis / 1000 / 60) % 60;
    const h = Math.floor(millis / 1000 / 60 /60) % 60

    const formattedMs = ms.toString().padStart(1, '0');
    const formattedS = s.toString().padStart(1, '0');
    const formattedM = m.toString().padStart(1, '0');
    const formattedH = h.toString().padStart(1, '0');

    return `${formattedH}:${formattedM}:${formattedS}.${formattedMs}`;
}

start.addEventListener('click',() => {
    if (!isRunning) {
        isRunning = true
        start.disabled = true;
        stop.disabled = false;
        reset.disabled = false;
        
        let startMs = Date.now(); 
        startMs -= elapsedMs;
        timerId = setInterval(() => {
        const nowMs = Date.now();
        elapsedMs = nowMs - startMs;

        timer.textContent = timeToString(elapsedMs);
    }, 10);
    }
    
});

stop.addEventListener('click', () => {
    if(isRunning) {
        isRunning = false;
        start.disabled = false;
        stop.disabled = true;
        reset.disabled = false;
    }
    state = 'stop';
    clearInterval(timerId);
});

reset.addEventListener('click', ()=> {
    if(isRunning) {
        isRunning = false;
        start.disabled = false;
        stop.disabled = true;
        reset.disabled = true;
    }
    state = 'reset' ;
    clearInterval(timerId) ;
    elapsedMs = 0;
    timer.textContent = '0:0:0:0';

});