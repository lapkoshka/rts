import React from 'react';
import ReaderControl from '../../components/readers-control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMainReaderStatus, setPortableReaderStatus } from '../../store/readers-control'
import { ipcRenderer as ipc} from "electron";
import store from '../../store';

const mapStateToProps = state => ({
  main: state.readersControl.main,
  portable: state.readersControl.portable,
  triggerMainReader: () => ipc.send('mainReaderTriggerClick'),
  triggerPortableReader: () => ipc.send('portableReaderTriggerClick'),
});

// const mapDispatchToProps = dispatch => ({
//   setMainReaderStatus: status => dispatch(setMainReaderStatus(status))
// });


const { dispatch } = store;
ipc.on('onPortableReaderConnectingStart', () =>
  dispatch(setPortableReaderStatus('wait')));

ipc.on('onPortableReaderConnected', () =>
  dispatch(setPortableReaderStatus('ok')));

ipc.on('onPortableReaderConnectingFailed', () =>
  dispatch(setPortableReaderStatus('error')));

ipc.on('onPortableReaderDisconnected', () =>
  dispatch(setPortableReaderStatus('disabled')));

ipc.on('onMainReaderConnectingStart', () =>
  dispatch(setMainReaderStatus('wait')));

ipc.on('onMainReaderConnected', () =>
  dispatch(setMainReaderStatus('ok')));

ipc.on('onMainReaderConnectingFailed', () =>
  dispatch(setMainReaderStatus('error')));

ipc.on('onMainReaderDisconnected', () =>
  dispatch(setMainReaderStatus('disabled')));

ipc.on('onMainReaderIpReceived', (_, message) =>
   console.log(message));


export default connect(mapStateToProps)(ReaderControl);
