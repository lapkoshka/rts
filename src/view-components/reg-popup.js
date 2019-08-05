const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

const openPopup = (_, user) => {
    const { firstname, lastname, uid, alreadyRegistred } = user;

    const popup = document.querySelector('.reg-fullscreenpopup');
    popup.classList.add('reg-fullscreenpopup-active');
    popup.dataset.alreadyRegistred = alreadyRegistred;

    document.querySelector('.content').classList.add('main-blur');
    const uidField = document.querySelector('.reg-fullscreenpopup-uid');
    uidField.value = uid;
    uidField.readOnly = true;
    document.querySelector('.reg-fullscreenpopup-uid').value = uid;
    document.querySelector('.reg-fullscreenpopup-firstname').value = firstname || '';
    document.querySelector('.reg-fullscreenpopup-firstname').focus();
    document.querySelector('.reg-fullscreenpopup-lastname').value = lastname || '';
};

const closePopup = sendRendererEvent => {
    document.querySelector('.reg-fullscreenpopup-uid').value = '';
    document.querySelector('.reg-fullscreenpopup-firstname').value = '';
    document.querySelector('.reg-fullscreenpopup-lastname').value = '';
    popup.classList.remove('reg-fullscreenpopup-active');
    document.querySelector('.content').classList.remove('main-blur');

    sendRendererEvent('onCancelRegistration');
};

const registrationSubmit = sendRendererEvent => {
    const uid = document.querySelector('.reg-fullscreenpopup-uid').value;
    const firstname = document.querySelector('.reg-fullscreenpopup-firstname').value;
    const lastname = document.querySelector('.reg-fullscreenpopup-lastname').value;
    const alreadyRegistred = document.querySelector('.reg-fullscreenpopup').dataset.alreadyRegistred;
    popup.classList.remove('reg-fullscreenpopup-active');
    document.querySelector('.content').classList.remove('main-blur');

    sendRendererEvent('onRegistrationSubmit', {
        uid,
        firstname,
        lastname,
        alreadyRegistred: alreadyRegistred === 'true',
    });
};

const registrationSubmitButton = document.querySelector('.reg-fullscreenpopup-submit');
const closeRegistrationPopup = document.querySelector('.reg-fullscreenpopup-close');
const popup = document.querySelector('.reg-fullscreenpopup');

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    onRendererEvent('onPortableReaderTag', openPopup);

    registrationSubmitButton.addEventListener('click', () => {
        registrationSubmit(sendRendererEvent);
    });
    closeRegistrationPopup.addEventListener('click', () => {
        closePopup(sendRendererEvent);
    });

    document.addEventListener('keyup', e => {
        if (e.keyCode === ENTER_KEY_CODE) {
            registrationSubmit(sendRendererEvent);
        }
    });

    document.addEventListener('keyup', e => {
        if (e.keyCode === ESC_KEY_CODE) {
            closePopup(sendRendererEvent);
        }
    });
};

const setStatus = (block, status) => {
    const target = block.querySelector('.popup-reader-status');
    [
        'popup-reader-wait',
        'popup-reader-ok',
        'popup-reader-error',
        'popup-reader-disabled',
    ].forEach(className => target.classList.remove(className));
    target.classList.add(`popup-reader-${status}`);
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const portableReader = rootElement.querySelector('.popup-portablereader');

    const popupPortableReaderButton = portableReader.querySelector('.popup-portablereader-button');

    popupPortableReaderButton.addEventListener('click', () => {
        sendRendererEvent('portableReaderTriggerClick');
    });

    onRendererEvent('onPortableReaderConnectingStart', _ => {
        setStatus(portableReader, 'wait');
    });

    onRendererEvent('onPortableReaderConnected', _ => {
        setStatus(portableReader, 'ok');
    });

    onRendererEvent('onPortableReaderConnectingFailed', (_, message) => {
        // TODO: show error text
        console.error(message);
        setStatus(portableReader, 'error');
    });

    onRendererEvent('onPortableReaderDisconnected', (_, message) => {
        setStatus(portableReader, 'error');
    });
};

