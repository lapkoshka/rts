import React, { useEffect } from 'react';
import { getIpcRenderer } from '../../../common/ipc';
import { IPC_APP } from '../../../server/ipc/ipc-events';
import MainView from '../../views/main';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './app.scss';

const ipc = getIpcRenderer();

const App: React.FC = () => {
    useEffect(() => ipc.send(IPC_APP.VIEW_DID_MOUNT));

    return (
        <Router his>
            <Switch>
                <Route path='/results'>
                    <div>Results</div>
                </Route>
                <Route path='/'>
                    <MainView />
                </Route>
            </Switch>
        </Router>
    );
};

export default connect((state) => state)(App);
