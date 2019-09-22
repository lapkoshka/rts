import React from 'react';
import {
    MainReaderParams,
    MainReaderSettings,
} from '../../../server/lib/readers/main-reader';
import Block from '../ui/block/block';
import ReaderSettings from './reader-settings/reader-settings';
import { Icon } from 'antd';
import './control-panel.scss';

interface ReaderButtonProps {
    name: string;
    status: string;
    onClick: () => void;
}

const ReaderButton: React.FC<ReaderButtonProps> = (props) => (
  <div className='control-reader-button' onClick={props.onClick}>
    <div className={`control-reader-button-status-${props.status}`}></div>
    <span className='reader-title'>{props.name}</span>
  </div>
);

export interface ControlPanelProps {
    mainStatus: string;
    portableStatus: string;
    mainReaderSettings: MainReaderSettings;
    shouldShowPopup: boolean;
    triggerMainReader: (settings: MainReaderSettings) => void;
    triggerPortableReader: () => void;
}

export interface ControlPanelActions {
    showMainReaderSettings: (enable: boolean) => void;
    setIpAddress: (address: string) => void;
    setIpAuto: (enable: boolean) => void;
    setMainReaderParams: (params: MainReaderParams) => void;
    setDefaultMainReaderParams: () => void;
}

const ControlPanel: React.FC<ControlPanelProps & ControlPanelActions> = (props) => {
    // TODO: main readed buttons to switch

    return (
        <Block>
            <div className='control-reader-buttons'>
                <ReaderButton
                    name='Главный считыватель'
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
                            fontSize: '20px',
                            cursor: 'pointer',
                        }}
                    />
                </div>

                <ReaderButton
                    name='Портативный считыватель'
                    status={props.portableStatus}
                    onClick={props.triggerPortableReader}
                />

                <ReaderSettings {...props}/>
            </div>
        </Block>
    );
};

export default ControlPanel;
