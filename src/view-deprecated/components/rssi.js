const randHex = len => {
    const maxlen = 6;
    const min = Math.pow(16, Math.min(len, maxlen) - 1);
    const max = Math.pow(16, Math.min(len, maxlen)) - 1;
    const n = Math.floor( Math.random() * (max - min + 1) ) + min;
    let r = n.toString(16);
    while (r.length < len) {
        r = r + randHex(len - maxlen);
    }

    return r;
};

const cutLongTraces = traceMap => {
    traceMap.forEach(trace => [trace.x, trace.y]
        .forEach(t => {
            if (t.length > 50) {
                t.shift();
            }
        }));
};

const findTraceIndex = (uid, traces) => {
    for (let i = 0; i < traces.length; i++) {
        if (traces[i].uid === uid) {
            return i;
        }
    }

    return -1;
};

const CONTAINER_ID = 'histogram';

module.exports = (rootElement, { sendRendererEvent, onRendererEvent }) => {
    const traces = [];
    const traceMap = new Map();

    onRendererEvent('onUsernameClick', (_, { uid, username }) => {
        const index = findTraceIndex(uid, traces);
        if (index !== -1) {
            traces.splice(index, 1);
            traceMap.delete(uid);
            return;
        }

        const trace = {
            // hack, fake property for findTraceIndex
            uid, // < you suck
            // bad programming
            type: 'scatter',
            x: [],
            y: [],
            mode: 'lines',
            name: username,
            line: {
                color: randHex(6),
                width: 3,
            },
        };
        traces.push(trace);
        traceMap.set(uid, trace);

        if (traces.length === 1) {
            rootElement.style.display = 'block';
            Plotly.newPlot(CONTAINER_ID, traces);
        }
    });

    onRendererEvent('onMainReaderTag', (_, {uid, rssi}) => {
        const trace = traceMap.get(uid);
        if (trace) {
            trace.x.push(performance.now() / 1000);
            trace.y.push(rssi);
            cutLongTraces(traceMap);

            Plotly.newPlot(CONTAINER_ID, traces);
        }
    });

    rootElement.querySelector('.rssi-close').addEventListener('click', evt => {
        traceMap.clear();
        rootElement.style.display = 'none';
    });
};
