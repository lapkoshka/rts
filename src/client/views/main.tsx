import React, { FC } from 'react';
import ControlPanelContainer from '../components/control-panel/control-panel-container';
import RaceInfoContainer from '../components/race-info/race-info-container';
import RegistrationContainer from '../components/registration/registration-container';
import ResultsInfoContainer from '../components/results-info/results-info-container';
import RSSIChartContainer from '../components/rssi-chart/rssi-chart-container';
import SettingsContainer from '../components/settings/settings-container';

const MainView: FC = () => (
    <div className='app-layout'>
        <div className='app-layout-left'>
            <ControlPanelContainer/>
            <RaceInfoContainer />
        </div>
        <div className='app-layout-right'>
            <RSSIChartContainer />
            <ResultsInfoContainer />
        </div>
        <RegistrationContainer />
        <SettingsContainer />
    </div>
);

export default MainView;
