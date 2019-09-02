// TODO: Don't repeat yourself
const render = (table, data) => {
    Array.from(table.children).forEach(e => e.remove());

    const tr = document.createElement('tr');
    tr.className = 'users-header';

    const uid = document.createElement('th');
    uid.className = 'users-row-uid';
    uid.innerText = 'UID';

    const name = document.createElement('th');
    name.className = 'users-row-name';
    name.innerText = 'Имя';

    tr.appendChild(uid);
    tr.appendChild(name);
    table.appendChild(tr);

    data.forEach(user => {
        const { uid, firstname, lastname } = user;
        const tr = document.createElement('tr');

        const uidRow = document.createElement('td');
        uidRow.classList.add('users-row-id');
        uidRow.innerText = uid;

        const nameRow = document.createElement('td');
        nameRow.classList.add('users-row-name');
        nameRow.innerText = `${firstname} ${lastname}`;

        const deleteRow = document.createElement('td');
        deleteRow.classList.add('users-row-delete');
        const img = document.createElement('img');
        img.src = './view/images/icons/delete.svg';
        img.classList.add('users-row-delete-icon');
        img.dataset.uid = uid;
        deleteRow.appendChild(img);

        tr.appendChild(uidRow);
        tr.appendChild(nameRow);
        tr.appendChild(deleteRow);
        table.appendChild(tr);
    });
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const table = rootElement.querySelector('table');

    table.addEventListener('click', evt => {

        const { target } = evt;
        const isDeleteIconClick = target.classList.contains('users-row-delete-icon');
        if (!isDeleteIconClick) {
            return;
        }

        const uid = target.dataset.uid;
        const answer = confirm('Вы уверены что хотите удалить пользователя и все что с ним связано?');
        if (answer) {
            sendRendererEvent('onUserDelete', uid);
        }
    });

    onRendererEvent('onUsersDataUpdate', (_, users) => {
        render(table, users);
    });
};
