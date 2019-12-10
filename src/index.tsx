import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from './client/components/app/app';
import { Provider } from 'react-redux';
import { store } from './client/store';
import 'antd/dist/antd.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import './client/static/style/main.scss';
import { getIpcRenderer } from './common/ipc';
import { IPC_APP } from './server/ipc/ipc-events';
const ipc = getIpcRenderer();

// TODO make a component with fields and buttons
// @ts-ignore
window.fakePortableTag = (uid, rssi) =>
    ipc.send(IPC_APP.FAKE_PORTABLE_TAG, { uid, rssi });
// @ts-ignore
window.fakeMainTag = (uid, rssi) =>
    ipc.send(IPC_APP.FAKE_MAIN_TAG, { uid, rssi});

ipc.send(IPC_APP.START);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    document.getElementById('root'),
);
