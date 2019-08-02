// TODO: check XSS vulnerability
const render = (table, data) => {
    table.innerHTML = '';
    const userHeader = document.createElement('tr');
    userHeader.className = 'user-header';

    const titleUsersRowName = document.createElement('th');
    titleUsersRowName.className = 'title-users-row-name';

    const titleUsersRowBestTime = document.createElement('th');
    titleUsersRowBestTime.className = 'title-users-row-best-time';

    const titleUsersRowBestCount = document.createElement('th');
    titleUsersRowBestCount.className = 'title-users-row-best-count';

    titleUsersRowName.innerText = 'Имя';
    titleUsersRowBestTime.innerText = 'Лучшее время';
    titleUsersRowBestCount.innerText = 'Всего заездов';
    userHeader.appendChild(titleUsersRowName);
    userHeader.appendChild(titleUsersRowBestTime);
    userHeader.appendChild(titleUsersRowBestCount);
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
