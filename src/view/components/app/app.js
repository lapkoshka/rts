import React, { Component } from 'react';
import style from './style.scss';
import ReadersControlContainer from '../../containers/readers-control/reader-control-container';
import RaceInfoContainer from '../../containers/race-info/race-info-container';


class App extends Component {
    render() {
        return (
            <div className="app-layout">
                <div className="app-layout-left">
                  <ReadersControlContainer/>
                  <RaceInfoContainer />
                </div>
                <div className="app-layout-right">
                    {/*<ResultsInfo/>*/}
                </div>
            </div>
        );
    }
}

export default App;
