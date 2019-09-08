import React, { Component } from 'react';
import style from './style.scss';
import Block from '../ui/block';
import ReaderControl from '../readers-control';
import ReadersControlContainer from '../../containers/readers-control';
import {setReaderStatus} from '../../store/readers-control';


class App extends Component {
    render() {
        return (
            <div className="app-layout">
                <div className="app-layout-left">
                  <ReadersControlContainer/>
                    {/*<RaceInfo/>*/}
                </div>
                <div className="app-layout-right">
                    {/*<ResultsInfo/>*/}
                </div>
            </div>
        );
    }
}

export default App;
