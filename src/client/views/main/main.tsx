import React, { FC } from 'react';
import { ControlPanelContainer } from '../../components/control-panel/control-panel-container';
import { EventsContainer } from '../../components/events/events-container';
import { RaceInfoContainer } from '../../components/race-info/race-info-container';
import { RegistrationContainer } from '../../components/registration/registration-container';
import { ResultsInfoContainer } from '../../components/results-info/results-info-container';
import { RSSIChartContainer } from '../../components/rssi-chart/rssi-chart-container';
import { SettingsContainer } from '../../components/settings/settings-container';
import './main.scss';
import { Block } from '../../components/ui/block/block';

export const MainView: FC = () => (
    <div className='main-layout'>
        <div className='main-layout-left'>
            <Block>
                <ControlPanelContainer/>
            </Block>
            <Block>
                <EventsContainer />
            </Block>
            <Block>
                <RaceInfoContainer />
            </Block>
        </div>
        <div className='main-layout-right'>
            <RSSIChartContainer />
            <ResultsInfoContainer />
        </div>
        <RegistrationContainer />
        <SettingsContainer />
    </div>
);
