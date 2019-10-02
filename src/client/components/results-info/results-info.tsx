import React from 'react';
import { RaceHistory } from '../../../server/controllers/results/history';
import { TotalInfo } from '../../../server/controllers/results/total';
import { Users } from '../../../server/controllers/results/users';
import Block from '../ui/block/block';
import renderRaceHistory from './tabs/history';
import renderUsers from './tabs/users';
import renderTotalInfo from './tabs/total';
import { Tabs, Tab } from '@blueprintjs/core';
import './results-info.scss';

export interface ResultsInfoProps {
    history: RaceHistory;
    users: Users;
    total: TotalInfo;
    deleteRace: (id: number) => void;
    deleteUser: (uid: string) => void;
}

const ResultsInfo: React.FC<ResultsInfoProps> = (props) => {
    const [tabId, setTabId] = React.useState('0');
    const onChangeHandler = React.useCallback(
        (tabId: string) => {
            setTabId(tabId);
        },
        [],
    );

    return (
        <Block>
            <Tabs
                id='Results Info'
                selectedTabId={tabId}
                onChange={onChangeHandler}
            >
                <Tab
                    id='0'
                    className='results-info-tab-button'
                    title='История'
                    panel={renderRaceHistory(props.history, props.deleteRace)}
                />
                <Tab
                    id='1'
                    className='results-info-tab-button'
                    title='Участники'
                    panel={renderUsers(props.users, props.deleteUser)}
                />
                <Tab
                    id='2'
                    className='results-info-tab-button'
                    title='Итого'
                    panel={renderTotalInfo(props.total)}
                />
            </Tabs>
        </Block>
    );
};

export default ResultsInfo;
