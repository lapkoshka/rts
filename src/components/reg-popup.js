const openPopup = (_, data) => {
    const { tag, user } = data;

    document.querySelector('.reg-fullscreenpopup').classList.add('reg-fullscreenpopup-active');
    document.querySelector('.content').classList.add('main-blur');

    document.querySelector('.reg-fullscreenpopup-uid').value = tag;
    document.querySelector('.reg-fullscreenpopup-firstname').value = user ? user.firstname : '';
    document.querySelector('.reg-fullscreenpopup-firstname').focus();
    document.querySelector('.reg-fullscreenpopup-lastname').value = user ? user.lastname : '';
};

const registrationSubmitButton = document.querySelector('.reg-fullscreenpopup-submit');
const closeRegistrationPopup = document.querySelector('.reg-fullscreenpopup-close');
const popup = document.querySelector('.reg-fullscreenpopup');

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    onRendererEvent('onPortableReaderTag', openPopup);

    registrationSubmitButton.addEventListener('click', () => {
        const uid = document.querySelector('.reg-fullscreenpopup-uid').value;
        const firstname = document.querySelector('.reg-fullscreenpopup-firstname').value;
        const lastname = document.querySelector('.reg-fullscreenpopup-lastname').value;
        popup.classList.remove('reg-fullscreenpopup-active');
        document.querySelector('.content').classList.remove('main-blur');

        sendRendererEvent('onRegistrationSubmit', {
            uid,
            firstname,
            lastname
        })
    });

    closeRegistrationPopup.addEventListener('click', () => {
        document.querySelector('.reg-fullscreenpopup-uid').value = '';
        document.querySelector('.reg-fullscreenpopup-firstname').value = '';
        document.querySelector('.reg-fullscreenpopup-lastname').value = '';
        popup.classList.remove('reg-fullscreenpopup-active');
        document.querySelector('.content').classList.remove('main-blur');

        sendRendererEvent('onCancelRegistration');
    });
}