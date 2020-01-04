import { Switch, Icon, Tooltip, Position } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import React, { FC, useCallback } from 'react';
import { READER_STATUS } from '../../../server/lib/readers/base-reader';
import { MainReaderSettings } from '../../../server/lib/readers/main-reader';
import './control-panel.scss';

interface ReaderButtonProps {
    status: READER_STATUS;
    name: string;
    onClick: VoidFunction;
}

const ReaderButton: FC<ReaderButtonProps> = (props) => {
    const { name, status, onClick } = props;

    return (
        <Switch
            disabled={status === READER_STATUS.WAIT}
            className={`control-reader-button control-reader-button-status-${status}`}
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
    triggerPortableReader: VoidFunction;
}

export interface ControlPanelActions {
    showMainReaderSettings: (enable: boolean) => void;
}

export const ControlPanel: FC<ControlPanelProps & ControlPanelActions> = (props) => {
    const { mainReaderSettings } = props;
    const triggerMainReader = useCallback(
        () => {
            props.triggerMainReader(mainReaderSettings);
        },
        [props, mainReaderSettings],
    );

    const triggerPortableReader = useCallback(
        () => {
            props.triggerPortableReader();
        },
        [props],
    );

    const onSettingsClickHandler = useCallback(
        () => {
            props.showMainReaderSettings(true);
        },
        [props]);

    const onResultsClickHandler = useCallback(
        () => {
            window.open('/results');
        },
        [],
    );

    return (
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

            <Tooltip
                className='readers-main-settings'
                content='Настройки'
                position={Position.RIGHT}
            >
                <Icon
                    onClick={onSettingsClickHandler}
                    icon={IconNames.SETTINGS}
                    iconSize={Icon.SIZE_LARGE}
                />
            </Tooltip>

            <Tooltip
                className='readers-show-results'
                content='Табло'
                position={Position.RIGHT}
            >
                <Icon
                    onClick={onResultsClickHandler}
                    icon={IconNames.CONTROL}
                    iconSize={Icon.SIZE_LARGE}
                />
            </Tooltip>
        </div>
    );
};
