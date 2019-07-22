const registrationSubmitButton = document.querySelector('.reg-fullscreenpopup-submit');
const closeRegistrationPopup = document.querySelector('.reg-fullscreenpopup-close');
const popup = document.querySelector('.reg-fullscreenpopup');

registrationSubmitButton.addEventListener('click', registrationSubmitHandler);
closeRegistrationPopup.addEventListener('click', cancelRegistrationSubmitHandler);

function registrationSubmitHandler() {
    const uid = document.querySelector('.reg-fullscreenpopup-uid').value;
    const firstname = document.querySelector('.reg-fullscreenpopup-firstname').value;
    const lastname = document.querySelector('.reg-fullscreenpopup-lastname').value;
    popup.classList.remove('reg-fullscreenpopup-active');
    document.querySelector('.content').classList.remove('main-blur');

    // const shouldSave = document.querySelector('.reg-options-restore-label input').checked;
    // ipcRenderer.send(REG_EVENT.NEW_USER, { uid, firstname, lastname, shouldSave });
    // ipcRenderer.send(REG_EVENT.CONTINUE_LISTEN_P_READER, null);
}

function cancelRegistrationSubmitHandler() {
    document.querySelector('.reg-fullscreenpopup-uid').value = '';
    document.querySelector('.reg-fullscreenpopup-firstname').value = '';
    document.querySelector('.reg-fullscreenpopup-lastname').value = '';
    popup.classList.remove('reg-fullscreenpopup-active');
    document.querySelector('.content').classList.remove('main-blur');
    // ipcRenderer.send(REG_EVENT.CONTINUE_LISTEN_P_READER, null);
    // isPopupOpened = false;
}
