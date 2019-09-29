import React, { useEffect } from 'react';
import { getIpcRenderer } from '../../../common/ipc';
import { IPC_APP } from '../../../server/ipc/ipc-events';
import ControlPanelContainer from '../control-panel/control-panel-container';
import RaceInfoContainer from '../race-info/race-info-container';
import ResultsInfoContainer from '../results-info/results-info-container';
import RegistrationContainer from '../registration/registration-container';
import { connect } from 'react-redux';
import './app.scss';
import SettingsContainer from '../settings/settings-container';

const ipc = getIpcRenderer();

const App: React.FC = () => {
    useEffect(() => ipc.send(IPC_APP.VIEW_DID_MOUNT));

    return (
        <div className='app-layout'>
            <div className='app-layout-left'>
                <ControlPanelContainer/>
                <RaceInfoContainer />
            </div>
            <div className='app-layout-right'>
                <ResultsInfoContainer />
            </div>
            <RegistrationContainer />
            <SettingsContainer />
        </div>
    );
};

export default connect((state) => state)(App);
