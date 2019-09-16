import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './view/components/app/app';
import { Provider } from 'react-redux';
import store from './view/store/index';
import { ipcRenderer as ipc } from 'electron';
import 'antd/dist/antd.css';
import './view/static/style/main.scss';

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
