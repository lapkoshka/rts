import React, { FC, useEffect } from 'react';
import { Ipc } from '../../../common/ipc';
import { IPC_APP } from '../../../server/ipc/ipc-events';
import { MainView } from '../../views/main/main';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { ResultsViewContainer } from '../../views/results/results-view-container';

const App: FC = () => {
    useEffect(() => Ipc.send(IPC_APP.VIEW_DID_MOUNT));

    return (
        <Router>
            <Switch>
                <Route path='/results'>
                    <ResultsViewContainer />
                </Route>
                <Route path='/'>
                    <MainView />
                </Route>
            </Switch>
        </Router>
    );
};

export const AppContainer = connect((state) => state)(App);
