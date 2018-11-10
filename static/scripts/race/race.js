const { ipcRenderer } = require('electron');
const RACE_EVENT = require('../app/events.js').raceEvents;
const READER = require('../app/readers.js');
const utils = require('../app/utils.js');

ipcRenderer.send(RACE_EVENT.PAGE_READY, null);

let raceStartTime = null;
let timer = null;

//RENDER FUNCTIONS
function renderUser(container, user) {
    const parent = document.createElement('div');
    parent.classList.add('race-results-competitor');

    const position = document.createElement('div');
    const competitor = document.createElement('div');
    const totaltime = document.createElement('div');
    const diff = document.createElement('div');
    const laps = document.createElement('div');
    const besttime = document.createElement('div');

    position.classList.add('row-event-position');
    position.innerText = user.position === 0 ? '-' : user.position;
    competitor.classList.add('row-event-competitor');
    ////////
    competitor.classList.add('row-event-competitor-alert');

    competitor.innerText = user.competitor;
    competitor.dataset.uid = user.uid;
    totaltime.classList.add('row-event-totaltime');
    totaltime.innerText = utils.toHumanReadableTime(new Date(user.totaltime));
    diff.classList.add('row-event-diff');
    diff.innerText = utils.toHumanReadableTime(new Date(user.diff));
    laps.classList.add('row-event-laps');
    laps.innerText = user.laps === 0 ? '-' : user.laps;
    besttime.classList.add('row-event-besttime');
    besttime.innerText = utils.toHumanReadableTime(user.besttime);
    if (user.isBestTime) {
        besttime.classList.add('row-event-besttime-best')
    }

    if (user.isFinished) {
        competitor.classList.add('row-event-competitor-finished');
    }

    [position, competitor, totaltime, diff, laps, besttime].forEach(div => {
        div.classList.add('row-event');
        parent.appendChild(div);
    });

    container.appendChild(parent);
}

//IPC HANDLERS
ipcRenderer.on(RACE_EVENT.UPDATE_USERS, (event, users) => {
    const container = utils.getByCssName('race-results-body');
    container.innerHTML = '';
    users.forEach(user => renderUser(container, user));
});

ipcRenderer.on(RACE_EVENT.OVER, (event) => {
    clearInterval(timer);
    const timerEl = utils.getByCssName('race-smartbanner-timer');
    timerEl.classList.remove('race-smartbanner-timer-active');
    utils.getByCssName('race-controls-results').disabled = false;
});

ipcRenderer.on(RACE_EVENT.ON_TAG, (event, user) => {
    console.log(user);
    const detected = utils.getByCssName('race-smartbanner-detected-tag');
    if (detected) detected.remove();
    const el = document.createElement('div');
    el.classList.add('race-smartbanner-detected-tag');
    el.innerText = `${user.firstname} rssi:${user.rssi}`;

    const timer = utils.getByCssName('race-smartbanner-timer');
    smartbanner = utils.getByCssName('race-smartbanner');
    smartbanner.insertBefore(el, timer);
});


//UI HANDLERS
utils.getByCssName('race-controls-start').addEventListener('click', evt => {
    raceStartTime = new Date();
    ipcRenderer.send(RACE_EVENT.START, null);
    const timerEl = utils.getByCssName('race-smartbanner-timer');
    timerEl.classList.add('race-smartbanner-timer-active');
    timer = setInterval(() => {
        const diff = new Date() - raceStartTime;
        timerEl.innerText = utils.toHumanReadableTime(diff);
    }, 150);

    evt.target.disabled = true;
    utils.getByCssName('race-controls-over').disabled = false;
})

utils.getByCssName('race-controls-over').addEventListener('click', evt => {
    ipcRenderer.send(RACE_EVENT.OVER, null);
    utils.getByCssName('race-controls-over').disabled = true;
});

utils.getByCssName('race-results-competitor').addEventListener('click', evt => {
    
});