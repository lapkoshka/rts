import { Switch, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import React from 'react';
import { READER_TYPE } from '../../../server/lib/readers/base-reader';
import {
    MainReaderParams,
    MainReaderSettings,
} from '../../../server/lib/readers/main-reader';
import Block from '../ui/block/block';
import './control-panel.scss';
import ReaderSettings from './reader-settings/reader-settings';

interface ReaderButtonProps {
    type: READER_TYPE;
    status: string;
    onClick: (type: READER_TYPE) => void;
}

const ReaderButton: React.FC<ReaderButtonProps> = (props) => {
    const { type, status, onClick } = props;
    const handleChange = React.useCallback(
        () => {
                onClick(type);
        },
    [onClick]);

    const label = type === READER_TYPE.MAIN ?
        'Главный считыватель' : 'Портативный считыватель';
    return (
        <Switch
            disabled={status === 'wait'}
            className={`control-reader-button-status-${status}`}
            checked={status === 'ok' || status === 'wait'}
            label={label}
            onChange={handleChange}
        />
    );
};

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
    const { mainReaderSettings } = props;
    console.log('render', mainReaderSettings);
    const triggerReader = React.useCallback(
        (type: READER_TYPE) => {
            console.log('callback', mainReaderSettings);
            if (type === READER_TYPE.MAIN) {
                props.triggerMainReader(mainReaderSettings);
                return;
            }

            if (type === READER_TYPE.PORTABLE) {
                props.triggerPortableReader();
                return;
            }
        },
    [mainReaderSettings]);

    const onSettingsClickHandler = React.useCallback(
        () => {
            props.showMainReaderSettings(true);
        },
        []);

    return (
        <Block>
            <div className='control-reader-buttons'>
                <ReaderButton
                    type={READER_TYPE.MAIN}
                    status={props.mainStatus}
                    onClick={triggerReader}
                />
                <ReaderButton
                    type={READER_TYPE.PORTABLE}
                    status={props.portableStatus}
                    onClick={triggerReader}
                />

                <Icon
                    onClick={onSettingsClickHandler}
                    className='readers-main-settings'
                    icon={IconNames.SETTINGS}
                    iconSize={Icon.SIZE_LARGE}
                />
                <ReaderSettings {...props}/>
            </div>
        </Block>
    );
};

export default ControlPanel;
