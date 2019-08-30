const render = (table, data) => {
    Array.from(table.children).forEach(e => e.remove());

    const tr = document.createElement('tr');
    tr.className = 'history-header';

    const name = document.createElement('th');
    name.className = 'history-row-name';
    name.innerText = 'Имя';

    const time = document.createElement('th');
    time.className = 'history-row-time';
    time.innerText = 'Время';

    table.appendChild(tr);

    data.forEach(race => {
        const {firstname, lastname, time } = race;
        const tr = document.createElement('tr');

        const nameRow = document.createElement('td');
        nameRow.classList.add('history-row-name');
        nameRow.innerText = `${firstname} ${lastname}`;

        const timeRow = document.createElement('td');
        timeRow.classList.add('history-row-time');
        timeRow.innerText = time;

        tr.appendChild(nameRow);
        tr.appendChild(timeRow);
        table.appendChild(tr);
    });
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const table = rootElement.querySelector('table');
    onRendererEvent('onRaceHistoryUpdate', (_, data) => {
       render(table, data);
    });
};
