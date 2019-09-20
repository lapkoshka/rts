import React from 'react';
import {
    MainReaderParams,
    MainReaderSettings,
} from '../../../server/lib/readers/main-reader';
import Block from '../ui/block/block';
import ReaderSettings from './reader-settings/reader-settings';
import { Icon } from 'antd';
import './readers-control.scss';

interface ReaderButtonProps {
    name: string;
    status: string;
    onClick: () => void;
}

const ReaderButton: React.FC<ReaderButtonProps> = (props) => (
  <div className='reader-button' onClick={props.onClick}>
    <div className={`reader-button-status reader-button-status-${props.status}`}></div>
    <span className='reader-title'>{props.name}</span>
  </div>
);

export interface ReaderControlProps {
    mainStatus: string;
    portableStatus: string;
    mainReaderSettings: MainReaderSettings;
    shouldShowPopup: boolean;
    triggerMainReader: (settings: MainReaderSettings) => void;
    triggerPortableReader: () => void;
}

export interface ReaderControlActions {
    showMainReaderSettings: (enable: boolean) => void;
    setIpAddress: (address: string) => void;
    setIpAuto: (enable: boolean) => void;
    setMainReaderParams: (params: MainReaderParams) => void;
    setDefaultMainReaderParams: () => void;
}

const ReaderControl: React.FC<ReaderControlProps & ReaderControlActions> = (props) => (
  <Block>
    <div className='readers-buttons'>
        <div className='readers-main-wrapper'>
            <ReaderButton
                name='Главный считыватель!'
                status={props.mainStatus}
                onClick={() => props.triggerMainReader({
                    ip: props.mainReaderSettings.ip,
                    params: props.mainReaderSettings.params,
                })}
            />

            <div
                className='readers-main-settings'
                onClick={() => props.showMainReaderSettings(true)}
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
            status={props.portableStatus}
            onClick={props.triggerPortableReader}
        />

        {props.shouldShowPopup && (
            <ReaderSettings
                shouldShowPopup={props.shouldShowPopup}
                settings={props.mainReaderSettings}
                showMainReaderSettings={props.showMainReaderSettings}
                setIpAuto={props.setIpAuto}
                setIpAddress={props.setIpAddress}
                setMainReaderParams={props.setMainReaderParams}
                setDefaultMainReaderParams={props.setDefaultMainReaderParams}
            />
        )}
    </div>
  </Block>
);

export default ReaderControl;
