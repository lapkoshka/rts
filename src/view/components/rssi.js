module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    // const rssiLevelElement = rootElement.querySelector('.rssi-level');

    let counter = 0;
    const time = [];
    const y = [];
    const trace = {
        type: 'scatter',
        x: time,
        y: y,
        mode: 'lines',
        name: 'Red',
        line: {
            color: 'rgb(219, 64, 82)',
            width: 3,
        },
    };

    onRendererEvent('onMainReaderTag', (_, {uid, rssi}) => {
        if (window.lastTag !== uid) {
            return;
        }

        counter++;
        time.push(counter);
        y.push(rssi);
        if (y.length > 300) {
            time.shift();
            y.shift();
        }
        Plotly.newPlot('histogram', [trace]);
    });
};
