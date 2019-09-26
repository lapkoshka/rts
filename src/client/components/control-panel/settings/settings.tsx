import { Divider, Drawer, Position } from '@blueprintjs/core';
import React from 'react';
import './reader-settings/reader-settings.scss';
import { ControlPanelPropsAndActions } from '../control-panel';
import RaceSettings from './race-settings/race-settings';
import ReaderSettings from './reader-settings/reader-settings';

const Settings: React.FC<ControlPanelPropsAndActions> = React.memo((props) => {
    const onCloseHandler = React.useCallback(
        () => {
            props.showMainReaderSettings(false);
        },
        [props],
    );

    return (
        <Drawer
            title='Настройки'
            position={Position.LEFT}
            isOpen={props.shouldShowPopup}
            onClose={onCloseHandler}
            size={Drawer.SIZE_SMALL}
        >
            <div className='reader-settings-drawer-content'>
                <ReaderSettings {...props}/>
                <Divider/>
                <RaceSettings {...props}/>
            </div>
        </Drawer>
    );
});

export default Settings;
