// TODO: check XSS vulnerability
const render = (table, data) => {
    table.innerHTML = '';
    const userHeader = document.createElement('tr');
    userHeader.className = 'user-header';

    const usersRowName = document.createElement('th');
    usersRowName.className = 'users-row-name';

    const usersRowBestTime = document.createElement('th');
    usersRowBestTime.className = 'users-row-best-time';

    const usersRowBestCount = document.createElement('th');
    usersRowBestCount.className = 'users-row-best-count';

    usersRowName.innerText = 'Имя';
    usersRowBestTime.innerText = 'Лучшее время';
    usersRowBestCount.innerText = 'Всего заездов';
    userHeader.appendChild(usersRowName);
    userHeader.appendChild(usersRowBestTime);
    userHeader.appendChild(usersRowBestCount);
    table.appendChild(userHeader);

    data.forEach(user => {
        const userHeader = document.createElement('tr');

        const usersRowName = document.createElement('td');
        usersRowName.className = 'users-row-name';

        const usersRowBestTime = document.createElement('td');
        usersRowBestTime.className = 'users-row-best-time';

        const usersRowBestCount = document.createElement('td');
        usersRowBestCount.className = 'users-row-best-count';

        usersRowName.innerText = `${user.firstname} ${user.lastname}`;
        usersRowBestTime.innerText = `${user.time}`;
        usersRowBestCount.innerText = `${user.count}`;

        table.appendChild(userHeader);
        userHeader.appendChild(usersRowName);
        userHeader.appendChild(usersRowBestTime);
        userHeader.appendChild(usersRowBestCount);
    });
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    onRendererEvent('onUsersDataUpdate', (_, data) => {
        const table = rootElement.querySelector('table');
        render(table, data);
    });
};
