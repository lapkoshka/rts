import { Switch, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import React from 'react';
import { READER_STATUS } from '../../../server/lib/readers/base-reader';
import { MainReaderSettings } from '../../../server/lib/readers/main-reader';
import Block from '../ui/block/block';
import './control-panel.scss';

interface ReaderButtonProps {
    status: READER_STATUS;
    name: string;
    onClick: () => void;
}

const ReaderButton: React.FC<ReaderButtonProps> = (props) => {
    const { name, status, onClick } = props;

    return (
        <Switch
            disabled={status === READER_STATUS.WAIT}
            className={`control-reader-button-status-${status}`}
            checked={status === READER_STATUS.OK || status === READER_STATUS.WAIT}
            label={name}
            onChange={onClick}
        />
    );
};

export interface ControlPanelProps {
    mainStatus: READER_STATUS;
    portableStatus: READER_STATUS;
    mainReaderSettings: MainReaderSettings;
    triggerMainReader: (settings: MainReaderSettings) => void;
    triggerPortableReader: () => void;
    showMainReaderSettings: (enable: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = (props) => {
    const { mainReaderSettings } = props;
    const triggerMainReader = React.useCallback(
        () => {
                props.triggerMainReader(mainReaderSettings);
        },
    [props, mainReaderSettings],
    );

    const triggerPortableReader = React.useCallback(
        () => {
            props.triggerPortableReader();
        },
        [props],
    );

    const onSettingsClickHandler = React.useCallback(
        () => {
            props.showMainReaderSettings(true);
        },
        [props]);

    return (
        <Block>
            <div className='control-reader-buttons'>
                <ReaderButton
                    name='Главный считыватель'
                    status={props.mainStatus}
                    onClick={triggerMainReader}
                />
                <ReaderButton
                    name='Портативный считыватель'
                    status={props.portableStatus}
                    onClick={triggerPortableReader}
                />

                <Icon
                    onClick={onSettingsClickHandler}
                    className='readers-main-settings'
                    icon={IconNames.SETTINGS}
                    iconSize={Icon.SIZE_LARGE}
                />
            </div>
        </Block>
    );
};

export default ControlPanel;
