import React, { Component } from 'react';
import style from './style.scss';
import ReadersControlContainer from '../../containers/reader-control-container';
import RaceInfoContainer from '../../containers/race-info-container';
import ResultsInfoContainer from '../../containers/results-info-container';


class App extends Component {
    render() {
        return (
            <div className="app-layout">
                <div className="app-layout-left">
                  <ReadersControlContainer/>
                  <RaceInfoContainer />
                </div>
                <div className="app-layout-right">
                    <ResultsInfoContainer />
                </div>
            </div>
        );
    }
}

export default App;
