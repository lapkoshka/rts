const { ipcRenderer } = require('electron');
const REG_EVENT = require('../app/reg/events.js');
const READER = require('../app/readers.js');
const utils = require('../app/utils.js');
const _ = require('lodash');

const moduleWindow = utils.getByCssName('reg-fullscreenpopup');
const submitFormButton = utils.getByCssName('reg-submit-registration');
const userList = utils.getByCssName('reg-users');

ipcRenderer.send(REG_EVENT.PAGE_READY, null);

//RENDER FUNCTIONS
function renderUser(container, user) {
    const name = document.createElement('div');
    const uid = document.createElement('div');
    const removeLink = document.createElement('div');

    
    name.classList.add('reg-users-user-name');
    name.innerText = `${user.firstname} ${user.lastname}`;

    uid.classList.add('reg-users-user-uid');
    uid.innerText = user.uid;

    removeLink.classList.add('reg-users-user-remove');
    removeLink.dataset.uid = user.uid;
    removeLink.innerText = 'Удалить';

    const parent = document.createElement('div');
    const header = document.createElement('div');
    header.classList.add('reg-users-user-header');
    const content = document.createElement('div');
    content.classList.add('reg-users-user-content');
    parent.classList.add('reg-users-user');
    header.appendChild(name);

    content.appendChild(uid);
    content.appendChild(removeLink);
    parent.appendChild(header);
    parent.appendChild(content);
    
    container.appendChild(parent);
}

function renderHaveNoUsers() {
    const haveNoUsersSpan = document.createElement('span');
    haveNoUsersSpan.classList.add('reg-users-nousers');
    haveNoUsersSpan.innerText = 'Пока что не зарегистрирован ни один из участников';
    userList.appendChild(haveNoUsersSpan);
}

function updateUsersOnSmartBanner(count) {
    utils.getByCssName('reg-smarbanner-total-users').innerHTML = `Всего <b>${count}</b> участников`;
}

//IPC HANDLERS
ipcRenderer.on(REG_EVENT.ON_TAG , (event , tag) => {
    moduleWindow.classList.add('reg-fullscreenpopup-active');
    utils.getByCssName('reg-main-wrapper').classList.add('reg-main-wrapper-blur');

    utils.getByCssName('reg-fullscreenpopup-uid').value = tag;
    utils.getByCssName('reg-fullscreenpopup-firstname').value = '';
    utils.getByCssName('reg-fullscreenpopup-lastname').value = '';
});

ipcRenderer.on(REG_EVENT.RENDER_USERS , (event, users) => {
    const usersCount = Object.keys(users).length;
    const container = userList;
    container.innerHTML = '';
    submitFormButton.disabled = true;
    updateUsersOnSmartBanner(usersCount);
    if (usersCount === 0) {
        renderHaveNoUsers();
        return;
    }
    submitFormButton.disabled = false;

    for (key in users) {
        renderUser(container, users[key])
    }
});

ipcRenderer.on(REG_EVENT.READER_DATA , (event, data) => {
    const status = data.info.status;
    const type = data.type;
    const message = data.info.message;

    const readerContent = utils.getByCssName(`reg-smartbanner-${type}reader`);
    readerContent.classList.add(`reg-smartbanner-reader-${status}`)
    const readerStatus = utils.getByCssName('reg-smartbanner-reader-status', readerContent);
    readerStatus.innerText = message;
});

//UI HANDLERS
utils.getByCssName('reg-smartbanner-options-restore').addEventListener('click', evt => {
    const fs = require('fs');
    const out = fs.readFileSync('app/storage/users.json');
    _.forEach(JSON.parse(out.toString()), user => {
        const { uid, firstname, lastname } = user;
        ipcRenderer.send(REG_EVENT.NEW_USER, {uid, firstname, lastname});
    });
});

userList.addEventListener('click', evt => {
    const target = evt.target;
    if (target.classList.contains('reg-users-user-remove')) {
        ipcRenderer.send(REG_EVENT.REMOVE_USER, target.dataset.uid);
    }
})
utils.getByCssName('reg-fullscreenpopup-submit').addEventListener('click', evt => {
    const uid = utils.getByCssName('reg-fullscreenpopup-uid').value;
    const firstname = utils.getByCssName('reg-fullscreenpopup-firstname').value;
    const lastname = utils.getByCssName('reg-fullscreenpopup-lastname').value;
    moduleWindow.classList.remove('reg-fullscreenpopup-active');
    utils.getByCssName('reg-main-wrapper').classList.remove('reg-main-wrapper-blur');

    ipcRenderer.send(REG_EVENT.NEW_USER, {uid, firstname, lastname});
});

utils.getByCssName('reg-fullscreenpopup-close').addEventListener('click', evt => {
    const uid = utils.getByCssName('reg-fullscreenpopup-uid').value = '';
    const firstname = utils.getByCssName('reg-fullscreenpopup-firstname').value = '';
    const lastname = utils.getByCssName('reg-fullscreenpopup-lastname').value = '';
    moduleWindow.classList.remove('reg-fullscreenpopup-active');
    utils.getByCssName('reg-main-wrapper').classList.remove('reg-main-wrapper-blur');
});

submitFormButton.addEventListener('click', evt => {
    //TODO VALIDATE READER CONNECTION
    ipcRenderer.send(REG_EVENT.SUBMIT, null);
});

//TODO KEY PRESS HANDLER


//MOCK
// ipcRenderer.send(REG_EVENT.NEW_USER, {uid: 'E200300005100140267010CE', firstname: 'Стас', lastname: 'Успешный'});
// ipcRenderer.send(REG_EVENT.NEW_USER, {uid: 'E20030000510004312409A63', firstname: 'Артем', lastname: 'Богатый'});
// ipcRenderer.send(REG_EVENT.NEW_USER, {uid: 'E2003028690B00650960B6F0', firstname: 'Джорж', lastname: 'Клуни'});

