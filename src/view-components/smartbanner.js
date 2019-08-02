const setStatus = (block, status) => {
    const target = block.querySelector('.smartbanner-reader-status');
    [
        'smartbanner-reader-wait',
        'smartbanner-reader-ok',
        'smartbanner-reader-error',
        'smartbanner-reader-disabled',
    ].forEach(className => target.classList.remove(className));
    target.classList.add(`smartbanner-reader-${status}`);
};

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const portableReader = rootElement.querySelector('.smartbanner-portablereader');
    const mainReader = rootElement.querySelector('.smartbanner-mainreader');

    const portableReaderButton = portableReader.querySelector('.smarbanner-portablereader-button');
    const mainReaderButton = mainReader.querySelector('.smartbanner-mainreader-button');

    portableReaderButton.addEventListener('click', () => {
        sendRendererEvent('portableReaderTriggerClick');
    });

    mainReaderButton.addEventListener('click', () => {
       sendRendererEvent('mainReaderTriggerClick');
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

    onRendererEvent('onMainReaderConnectingStart', _ => {
        setStatus(mainReader, 'wait');
    });

    onRendererEvent('onMainReaderConnected', _ => {
        setStatus(mainReader, 'ok');
    });

    onRendererEvent('onMainReaderConnectingFailed', (_, message) => {
        // TODO: show error text
        console.error(message);
        setStatus(mainReader, 'error');
    });

    onRendererEvent('onMainReaderIpReceived', (_, message) => {
       // TODO: show ip on view
       console.log(message);
    });
};
