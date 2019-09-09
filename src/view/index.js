import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux'
import store from './store';
import { ipcRenderer as ipc} from 'electron';

// TEMP UTILS
window.fakePortableTag = (uid, rssi) =>
  ipc.send('fakePortableTag', { uid, rssi });
window.fakeMainTag = (uid, rssi) =>
  ipc.send('fakeMainTag', { uid, rssi});
  
window.createUser = (uid, f, l) => {
  ipc.send('onRegistrationSubmit', {
    uid,
    firstname: f,
    lastname: l,
    alreadyRegistred: false,
  });
};

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.getElementById('root'));
