const render = (table, data) => {
    Array.from(table.children).forEach(e => e.remove());

    const tr = document.createElement('tr');
    tr.className = 'history-header';

    const id = document.createElement('th');
    id.className = 'history-row-id';
    id.innerText = 'N';

    const name = document.createElement('th');
    name.className = 'history-row-name';
    name.innerText = 'Имя';

    const time = document.createElement('th');
    time.className = 'history-row-time';
    time.innerText = 'Время';

    const date = document.createElement('th');
    date.className = 'history-row-date';
    date.innerText = 'Дата';

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(time);
    tr.appendChild(date);
    table.appendChild(tr);

    data.forEach(race => {
        const { id, timestamp, firstname, lastname, time } = race;
        const tr = document.createElement('tr');

        const idRow = document.createElement('td');
        idRow.classList.add('history-row-id');
        idRow.innerText = id;

        const nameRow = document.createElement('td');
        nameRow.classList.add('history-row-name');
        nameRow.innerText = `${firstname} ${lastname}`;

        const timeRow = document.createElement('td');
        timeRow.classList.add('history-row-time');
        timeRow.innerText = time;

        const dateRow = document.createElement('td');
        dateRow.classList.add('history-row-date');
        dateRow.innerText = timestamp;

        const deleteRow = document.createElement('td');
        deleteRow.classList.add('history-row-delete');
        const img = document.createElement('img');
        img.src = './view/images/icons/delete.svg';
        img.classList.add('history-row-delete-icon');
        img.dataset.id = id;
        deleteRow.appendChild(img);

        tr.appendChild(idRow);
        tr.appendChild(nameRow);
        tr.appendChild(timeRow);
        tr.appendChild(dateRow);
        tr.appendChild(deleteRow);
        table.appendChild(tr);
    });
};

let dataCache;

const filterByName = (data, value) => {
    if (value.length < 1) {
        return data;
    }

    return data.filter(row => {
        const fullname = row.firstname + row.lastname;
        return new RegExp(value.toLowerCase())
            .test(fullname.toLowerCase());
    });
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const table = rootElement.querySelector('table');

    table.addEventListener('click', evt => {
        const { target } = evt;
        const isDeleteIconClick = target.classList.contains('history-row-delete-icon');
        if (!isDeleteIconClick) {
            return;
        }

        const id = target.dataset.id;
        const answer = confirm('Вы уверены что хотите удалить эту запись?');
        if (answer) {
            sendRendererEvent('onRaceDelete', parseInt(id, 10));
        }
    });

    const filterInput = rootElement.querySelector('.history-filter-name');
    filterInput.addEventListener('input', evt => {
        render(table, filterByName(dataCache, evt.target.value));
    });

    onRendererEvent('onRaceHistoryUpdate', (_, data) => {
       dataCache = data;
       render(table, filterByName(data, filterInput.value));
    });
};
