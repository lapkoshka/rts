// TODO: common lib for ts and js
const toHumanReadableTime = t => {
    if (t === null) {
        return '-';
    }

    if (Number.isInteger(t)) {
        return toHumanReadableTime(new Date(t));
    }

    if (!(t instanceof Date)) {
        throw new Error('Assertion error');
    }

    const min = t.getMinutes();
    const sec = t.getSeconds();
    const ms = t.getMilliseconds();
    let formatted = min.toString().length < 2 ? `0${min}:` : `${min}:`;
    formatted += sec.toString().length < 2 ? `0${sec}:` : `${sec}:`;
    switch (ms.toString().length) {
        case 3:
            formatted += ms;
            break;
        case 2:
            formatted += `0${ms}`;
            break;
        case 1:
            formatted += `00${ms}`;
            break;
        default:
            formatted += ms;
    }

    return formatted;
};

const intervals = {};

const createRow = user => {
    const tr = document.createElement('tr');
    tr.classList.add('race-header');
    tr.id = user.uid;

    const name = document.createElement('td');
    name.classList.add('race-row-name');
    name.innerText = `${user.firstname} ${user.lastname}`;

    const time = document.createElement('td');
    time.classList.add('race-row-time');

    tr.appendChild(name);
    tr.appendChild(time);

    return { tr, time };
};

const addUser = (table, startInfo) => {
    const { user, timestamp } = startInfo;
    const { tr, time } = createRow(user);
    table.appendChild(tr);

    intervals[user.uid] = setInterval(() => {
        time.innerText = toHumanReadableTime(new Date().valueOf() - timestamp);
    }, 1);
};

const removeUser = (table, user) => {
    table.querySelector(`#${user.uid}`).remove();
};

const decorateUserAsFinished = (table, finishInfo) => {
    const { user, timestamp } = finishInfo;
    clearInterval(intervals[user.uid]);
    const row = table.querySelector(`#${user.uid}`);
    row.classList.add('race-header-bold');

    row.querySelector('.race-row-time').innerText =
        toHumanReadableTime(timestamp);
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const table = rootElement.querySelector('table');

    onRendererEvent('onAddUser', (_, startInfo) => {
        addUser(table, startInfo);
    });

    onRendererEvent('onDecorateUserAsFinished', (_, finishInfo) => {
        decorateUserAsFinished(table, finishInfo);
    });
    onRendererEvent('onRemoveUser', (_, user) => {
        removeUser(table, user);
        sendRendererEvent('onUserRemoved', user);
    });
};
