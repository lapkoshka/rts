import { Divider, Drawer, Position } from '@blueprintjs/core';
import React, { FC, memo, useCallback } from 'react';
import { Users } from '../../../server/controllers/results/users';
import { ChartEnableInfo } from '../../../server/controllers/rssi-chart/controller';
import { RaceParams } from '../../../server/lib/domain/race';
import {
    MainReaderParams,
    MainReaderSettings,
} from '../../../server/lib/readers/main-reader';
import { RaceSettings } from './race-settings/race-settings';
import { MainReaderIpSettings } from './reader-settings/main-reader-ip-settings';
import './settings.scss';
import { MainReaderParameters } from './reader-settings/main-reader-params';
import { RSSIChartSettings } from './rssi-chart-settings/rssi-chart-settings';

export interface SettingsProps {
    shouldShowPopup: boolean;
    mainReaderSettings: MainReaderSettings;
    raceParams: RaceParams;
    users: Users;
    chartEnableInfo: ChartEnableInfo;
    applyRaceParams: (params: RaceParams) => void;
}

export interface SettingsActions {
    showMainReaderSettings: (enable: boolean) => void;
    setIpAuto: (enable: boolean) => void;
    setIpAddress: (address: string) => void;
    setMainReaderParams: (params: MainReaderParams) => void;
    setDefaultMainReaderParams: VoidFunction;
    setChartEnableInfo: (info: ChartEnableInfo) => void;
    setRaceParams: (params: RaceParams) => void;
}

export const Settings: FC<SettingsProps & SettingsActions> = memo((props) => {
    const onCloseHandler = useCallback(
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
                <RSSIChartSettings
                    chartEnableInfo={props.chartEnableInfo}
                    users={props.users}
                    setChartEnableInfo={props.setChartEnableInfo}
                />
            </div>
        </Drawer>
    );
});
