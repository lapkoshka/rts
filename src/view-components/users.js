//TODO: XSS vulnerability, rewrite to innerText
const render = (table, data) => {
    table.innerHTML = '';
    table.innerHTML += `
        <tr class="users-header">
            <th class="users-row-name">Имя</th>
            <th class="users-row-best-time">Лучшее время</th>
            <th class="users-row-best-count">Всего заездов</th>
        </tr>`;

    data.forEach(user => {
        table.innerHTML += `
        <tr>
            <td class="users-row-name">${user.firstname} ${user.lastname}</td>
            <td class="users-row-best-time">${user.time}</td>
            <td class="users-row-best-count">${user.count}</td>
        </tr>
        `;
    });
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    onRendererEvent('onUsersDataUpdate', (_, data) => {
        const table = rootElement.querySelector('table');
        render(table, data);
    });
};
