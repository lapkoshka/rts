import React, { Component } from 'react';
import style from './style.scss';
import ReadersControlContainer from '../../containers/readers-control';
import RaceInfoContainer from '../../containers/race-info';


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
