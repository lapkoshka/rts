const render = (table, races) => {
    table.innerHTML = '';
    table.innerHTML += `
        <tr class="race-header">
            <th class="race-row-name">Имя</th>
            <th class="row-row-time">Время</th>
        </tr>`;

    Object.keys(races).forEach(key => {
        const { user, total, canMarkedAsFinished } = races[key];
        table.innerHTML += `
           <tr class="race-header">
              <td class="race-row-name">${user.firstname} ${user.lastname}</td>
              <td class="row-row-time">${total || '-'}</td>
           </tr>`;
    });
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const table = rootElement.querySelector('table');

    onRendererEvent('onCurrentRacesUpdate', (_, races) => {
        render(table, races);
    });
};
