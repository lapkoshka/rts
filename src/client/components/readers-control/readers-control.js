import React from 'react';
import Block from '../ui/block/block';
import ReaderSettings from './reader-settings/reader-settings';
import { Icon } from 'antd';
import './readers-control.scss';

const ReaderButton = props => (
  <div className='reader-button' onClick={props.onClick}>
    <div className={`reader-button-status reader-button-status-${props.status}`}></div>
    <span className='reader-title'>{props.name}</span>
  </div>
);

const ReaderControl = props => (
  <Block>
    <div className='readers-buttons'>
        <div className='readers-main-wrapper'>
            <ReaderButton
                name='Главный считыватель!'
                status={props.main.status}
                onClick={() => props.triggerMainReader({
                    ip: props.mainReaderSettings.ip,
                    params: props.mainReaderSettings.params,
                })}
            />

            <div
                className='readers-main-settings'
                onClick={() => props.mainReaderActions.showMainReaderSettings(true)}
            >
                <Icon
                    type='setting'
                    style={{
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                />
            </div>
        </div>

        <ReaderButton
            name='Портативный считыватель'
            status={props.portable.status}
            onClick={props.triggerPortableReader}
        />

        {props.mainReaderSettings.shouldShowPopup && (
            <ReaderSettings
                settings={props.mainReaderSettings}
                actions={props.mainReaderActions}
            />
        )}
    </div>
  </Block>
);

export default ReaderControl;
