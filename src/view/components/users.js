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
        const { uid, firstname, lastname, besttime, count} = user;
        const userHeader = document.createElement('tr');

        const usersRowName = document.createElement('td');
        usersRowName.className = 'users-row-name';
        usersRowName.id = uid;

        const usersRowBestTime = document.createElement('td');
        usersRowBestTime.className = 'users-row-best-time';

        const usersRowBestCount = document.createElement('td');
        usersRowBestCount.className = 'users-row-best-count';

        usersRowName.innerText = `${firstname} ${lastname}`;
        usersRowBestTime.innerText = `${besttime}`;
        usersRowBestCount.innerText = `${count}`;

        table.appendChild(userHeader);
        userHeader.appendChild(usersRowName);
        userHeader.appendChild(usersRowBestTime);
        userHeader.appendChild(usersRowBestCount);
    });
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const table = rootElement.querySelector('table');
    table.addEventListener('click', evt => {
        const element = evt.target;
        if (!element.classList.contains('users-row-name')) {
            return;
        }

        const uid = element.id;
        const username = element.innerText;
        sendRendererEvent('onUsernameClick', {
            uid,
            username,
        });
    });

    onRendererEvent('onUsersDataUpdate', (_, data) => {
        render(table, data);
    });
};
