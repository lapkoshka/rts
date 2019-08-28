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
// const render = (table, races) => {
//     clearElement(table);
//     const header = createHeader();
//     table.appendChild(header);
//
//     Object.keys(races).forEach(key => {
//         const { user, total } = races[key];
//         table.appendChild(createRow(user, total));
//     });
// };

// const clearElement = element => Array.from(
//     element.children.forEach(e => e.remove()));

// const createHeader = () => {
//     const tr = document.createElement('tr');
//     tr.classList.add('race-header');
//
//     const name = document.createElement('th');
//     name.classList.add('race-row-name');
//     name.innerText = 'Имя';
//
//     const time = document.createElement('th');
//     name.classList.add('race-row-time');
//     time.innerText = 'Время';
//
//     tr.appendChild(name);
//     tr.appendChild(time);
//
//     return tr;
// };

const createRow = user => {
    const tr = document.createElement('tr');
    tr.classList.add('race-header');
    tr.id = user.id;

    const name = document.createElement('td');
    name.classList.add('race-row-name');
    name.innerText = `${user.firstname} ${user.lastname}`;

    const time = document.createElement('td');
    time.classList.add('race-row-time');

    tr.appendChild(name);
    tr.appendChild(time);

    return { tr, time };
};

const addUser = (table, lap) => {
    const { tr, time } = createRow(lap.user);
    table.appendChild(tr);
    const start = lap.startTrace.getHighestPoint().timestamp;

    intervals[lap.user.uid] = setInterval(() => {
        time.innerText = toHumanReadableTime(new Date().valueOf() - start);
    }, 100);
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const table = rootElement.querySelector('table');

    onRendererEvent('onUserInfo', (_, lap) => {
        const {startTrace, finishTrace } = lap;
        // if (finishTrace && finishTrace.completed) {
        //     decorateUserAsFinished();
        //     setTimeout(() => {
        //         removeUser();
        //     }, 3000);
        //     return;
        // }

        if (startTrace && startTrace.completed) {
           addUser(table, lap);
        }
    });
};
