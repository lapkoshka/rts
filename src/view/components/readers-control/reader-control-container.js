import React from 'react';
import ReaderControl from './readers-control';
import { connect } from 'react-redux';
import {
    showMainReaderSettings,
    setMainReaderStatus,
    setPortableReaderStatus,
    setIpAdress,
    setIpAuto,
    setMainReaderParams,
    setDefaultMainReaderParams,
} from '../../store/reader-control-actions';
import { ipcRenderer as ipc} from 'electron';
import store from '../../store';
import { message } from 'antd';

const mapStateToProps = state => ({
  main: state.readersControl.main,
  portable: state.readersControl.portable,
  mainReaderSettings: state.readersControl.mainReaderSettings,
  triggerMainReader: settings => ipc.send('mainReaderTriggerClick', settings),
  triggerPortableReader: () => ipc.send('portableReaderTriggerClick'),
});

const mapDispatchToProps = dispatch => ({
    mainReaderActions: {
        showMainReaderSettings: enable => dispatch(showMainReaderSettings(enable)),
        setIpAddress: address => dispatch(setIpAdress(address)),
        setIpAuto: enable => {
            dispatch(setIpAuto(enable));
            if (enable) {
                dispatch(setIpAdress('0.0.0.0'));
            }
        },
        setMainReaderParams: params => dispatch(setMainReaderParams(params)),
        setDefaultMainReaderParams: () => dispatch(setDefaultMainReaderParams()),
    },
});

const { dispatch } = store;
ipc.on('onPortableReaderConnectingStart', () =>
  dispatch(setPortableReaderStatus('wait')));

ipc.on('onPortableReaderConnected', () =>
  dispatch(setPortableReaderStatus('ok')));

ipc.on('onPortableReaderConnectingFailed', (_, msg) => {
  dispatch(setPortableReaderStatus('error'));
  message.error(msg);
});

ipc.on('onPortableReaderDisconnected', () =>
  dispatch(setPortableReaderStatus('disabled')));

ipc.on('onMainReaderConnectingStart', () =>
  dispatch(setMainReaderStatus('wait')));

ipc.on('onMainReaderConnected', () =>
  dispatch(setMainReaderStatus('ok')));

ipc.on('onMainReaderConnectingFailed', (_, msg) => {
    dispatch(setMainReaderStatus('error'));
    message.error(msg);
});

ipc.on('onMainReaderDisconnected', () =>
  dispatch(setMainReaderStatus('disabled')));

ipc.on('onMainReaderIpReceived', (_, message) =>
   console.log(message));

export default connect(mapStateToProps, mapDispatchToProps)(ReaderControl);
