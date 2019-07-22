const { sendRendererEvent, onRendererEvent } = require('../common/scripts/event-handling');
const { openPopup } = require('./scripts/actions/user-registration');

document.addEventListener('DOMContentLoaded', evt => {
    sendRendererEvent('DOMContentLoaded');
});

onRendererEvent('onPortableReaderConnectingStart', _ => {
    console.log('onPortableReaderConnectingStart');
})

onRendererEvent('onPortableReaderConnected', _ => {
    console.log('onPortableReaderConnected');
})

onRendererEvent('onPortableReaderConnectedFailed', (_, message) => {
    console.log('onPortableReaderConnectedFailed', message);
})

onRendererEvent('onPortableReaderTag', openPopup);

const fakeTag = () => sendRendererEvent('fakeTag');
