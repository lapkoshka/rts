import React, { useEffect } from 'react';
import ReadersControlContainer from '../readers-control/reader-control-container';
import RaceInfoContainer from '../race-info/race-info-container';
import ResultsInfoContainer from '../results-info/results-info-container';
import { ipcRenderer as ipc } from 'electron';
import './app.scss';

const App = props => {
    useEffect(() => ipc.send('viewDidMount'));

    return (
        <div className='app-layout'>
            <div className='app-layout-left'>
              <ReadersControlContainer/>
              <RaceInfoContainer />
            </div>
            <div className='app-layout-right'>
                <ResultsInfoContainer />
            </div>
        </div>
    );
};

export default App;
