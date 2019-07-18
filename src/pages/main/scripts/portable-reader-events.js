const { sendRendererEvent, onRendererEvent } = require('../common/scripts/event-handling');

onRendererEvent('onPortableReaderConnectingStart', _ => {
    console.log('onPortableReaderConnectingStart');
})

onRendererEvent('onPortableReaderConnected', _ => {
    console.log('onPortableReaderConnected');
})

onRendererEvent('onPortableReaderConnectedFailed', (_, message) => {
    console.log('onPortableReaderConnectedFailed', message);
})

onRendererEvent('onPortableReaderTag', (_, data) => {
    const {tag, user} = data;

    document.querySelector('.reg-fullscreenpopup').classList.add('reg-fullscreenpopup-active');
    document.querySelector('.content').classList.add('main-blur');

    document.querySelector('.reg-fullscreenpopup-tag').value = tag;
    document.querySelector('.reg-fullscreenpopup-firstname').value = user ? user.firstname : '';
    document.querySelector('.reg-fullscreenpopup-firstname').focus();
    document.querySelector('.reg-fullscreenpopup-lastname').value = user ? user.lastname : '';
});