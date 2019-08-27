const render = (table, races) => {
    clearElement(table);
    const header = createHeader();
    table.appendChild(header);

    Object.keys(races).forEach(key => {
        const { user, total } = races[key];
        table.appendChild(createRow(user, total));
    });
};

const clearElement = element => Array.from(
    element.children.forEach(e => e.remove()));

const createHeader = () => {
    const tr = document.createElement('tr');
    tr.classList.add('race-header');

    const name = document.createElement('th');
    name.classList.add('race-row-name');
    name.innerText = 'Имя';

    const time = document.createElement('th');
    name.classList.add('race-row-time');
    time.innerText = 'Время';

    tr.appendChild(name);
    tr.appendChild(time);

    return tr;
};

const createRow = (user, total) => {
    const tr = document.createElement('tr');
    tr.classList.add('race-header');

    const name = document.createElement('td');
    name.classList.add('race-row-name');
    name.innerText = `${user.firstname} ${user.lastname}`;

    const time = document.createElement('td');
    time.classList.add('race-row-time');
    time.innerText = `${total || '-'}`;

    tr.appendChild(name);
    tr.appendChild(time);

    return tr;
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const table = rootElement.querySelector('table');

    onRendererEvent('onCurrentRacesUpdate', (_, races) => {
        render(table, races);
    });
};
