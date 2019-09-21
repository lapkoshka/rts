import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './client/components/app/app';
import { Provider } from 'react-redux';
import store from './client/store';
import 'antd/dist/antd.css';
import './client/static/style/main.scss';
import { getIpcRenderer } from './electron/ipc';
const ipc = getIpcRenderer();

// TODO make a component with fields and buttons
// @ts-ignore
window.fakePortableTag = (uid, rssi) => ipc.send('fakePortableTag', { uid, rssi });
// @ts-ignore
window.fakeMainTag = (uid, rssi) => ipc.send('fakeMainTag', { uid, rssi});

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);
