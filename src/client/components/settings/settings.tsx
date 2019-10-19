import { Divider, Drawer, Position } from '@blueprintjs/core';
import React from 'react';
import { RaceParams } from '../../../server/lib/domain/race';
import {
    MainReaderParams,
    MainReaderSettings,
} from '../../../server/lib/readers/main-reader';
import RaceSettings from './race-settings/race-settings';
import MainReaderIpSettings from './reader-settings/main-reader-ip-settings';
import './settings.scss';
import MainReaderParameters from './reader-settings/main-reader-params';
import RSSIChartSettings from './rssi-chart-settings/rssi-chart-settings';

export interface SettingsProps {
    showMainReaderSettings: (enable: boolean) => void;
    shouldShowPopup: boolean;

    setIpAuto: (enable: boolean) => void;
    setIpAddress: (address: string) => void;
    mainReaderSettings: MainReaderSettings;

    setMainReaderParams: (params: MainReaderParams) => void;
    setDefaultMainReaderParams: () => void;

    setRaceParams: (params: RaceParams) => void;
    raceParams: RaceParams;
    applyRaceParams: (params: RaceParams) => void;
}

const Settings: React.FC<SettingsProps> = React.memo((props) => {
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
            <div className='settings-drawer-content'>
                <h6 className='bp3-heading'>Настройки главного приёмника</h6>
                <MainReaderIpSettings
                    setIpAuto={props.setIpAuto}
                    setIpAddress={props.setIpAddress}
                    mainReaderSettings={props.mainReaderSettings}
                />
                <MainReaderParameters
                    params={props.mainReaderSettings.params}
                    setMainReaderParams={props.setMainReaderParams}
                    setDefaultMainReaderParams={props.setDefaultMainReaderParams}
                />
                <Divider/>
                <h6 className='bp3-heading'>Параметры заезда</h6>
                <RaceSettings
                    setRaceParams={props.setRaceParams}
                    raceParams={props.raceParams}
                    applyRaceParams={props.applyRaceParams}
                />
                <Divider/>
                <h6 className='bp3-heading'>График</h6>
                <RSSIChartSettings a={1}/>
            </div>
        </Drawer>
    );
});

export default Settings;
