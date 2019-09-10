import React, { useEffect } from 'react';
import ReadersControlContainer from '../../containers/reader-control-container';
import RaceInfoContainer from '../../containers/race-info-container';
import ResultsInfoContainer from '../../containers/results-info-container';
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
