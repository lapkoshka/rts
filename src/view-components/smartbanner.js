module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    onRendererEvent('onPortableReaderConnectingStart', _ => {
        console.log('onPortableReaderConnectingStart');
    });

    onRendererEvent('onPortableReaderConnected', _ => {
        console.log('onPortableReaderConnected');
    });

    onRendererEvent('onPortableReaderConnectedFailed', (_, message) => {
        console.log('onPortableReaderConnectedFailed', message);
    });
};