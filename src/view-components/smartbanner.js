module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    onRendererEvent('onPortableReaderConnectingStart', _ => {
        console.log('onPortableReaderConnectingStart');
    });

    onRendererEvent('onPortableReaderConnected', _ => {
        console.log('onPortableReaderConnected');
    });

    onRendererEvent('onPortableReaderConnectingFailed', (_, message) => {
        console.log('onPortableReaderConnectingFailed', message);
    });

    onRendererEvent('onMainReaderConnectingStart', _ => {
        console.log('onMainReaderConnectingStart');
    });

    onRendererEvent('onMainReaderConnected', _ => {
        console.log('onMainReaderConnected');
    });

    onRendererEvent('onMainReaderConnectingFailed', (_, message) => {
        console.log('onMainReaderConnectingFailed', message);
    });
};
