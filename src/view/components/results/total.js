const render = (table, data) => {
    Array.from(table.children).forEach(e => e.remove());

    const tr = document.createElement('tr');
    tr.className = 'total-header';

    const name = document.createElement('th');
    name.className = 'total-row-name';

    const time = document.createElement('th');
    time.className = 'total-row-best-time';

    const count = document.createElement('th');
    count.className = 'total-row-best-count';

    name.innerText = 'Имя';
    time.innerText = 'Лучшее время';
    count.innerText = 'Всего заездов';
    tr.appendChild(name);
    tr.appendChild(time);
    tr.appendChild(count);
    table.appendChild(tr);

    data.forEach(user => {
        const { uid, firstname, lastname, besttime, count} = user;
        const tr = document.createElement('tr');

        const nameRow = document.createElement('td');
        nameRow.className = 'total-row-name';
        nameRow.id = uid;

        const timeRow = document.createElement('td');
        timeRow.className = 'total-row-best-time';

        const countRow = document.createElement('td');
        countRow.className = 'total-row-best-count';

        nameRow.innerText = `${firstname} ${lastname}`;
        timeRow.innerText = besttime;
        countRow.innerText = count;

        table.appendChild(tr);
        tr.appendChild(nameRow);
        tr.appendChild(timeRow);
        tr.appendChild(countRow);
    });
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const table = rootElement.querySelector('table');
    table.addEventListener('click', evt => {
        const element = evt.target;
        if (!element.classList.contains('total-row-name')) {
            return;
        }

        const uid = element.id;
        const username = element.innerText;
        sendRendererEvent('onUsernameClick', {
            uid,
            username,
        });
    });

    onRendererEvent('onTotalInfoUpdate', (_, data) => {
        render(table, data);
    });
};
