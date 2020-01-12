import React, { FC, useCallback, useState } from 'react';
import { RaceHistory } from '../../../server/controllers/results/history';
import { TotalInfo } from '../../../server/controllers/results/total';
import { UserData } from '../../../server/modules/database/tables/users';
import { ContestData } from '../../../server/view-data/contests/contests';
import { Block } from '../ui/block/block';
import { renderRaceHistory } from './tabs/history';
import { renderUsers } from './tabs/users';
import { renderTotalInfo } from './tabs/total';
import { Tabs, Tab } from '@blueprintjs/core';
import './results-info.scss';

export interface ResultsInfoProps {
    history: RaceHistory;
    users: UserData[];
    total: TotalInfo;
    selectedContest: ContestData;
    deleteRace: (id: number) => void;
    deleteUser: (uid: string, contestId: number) => void;
}

export const ResultsInfo: FC<ResultsInfoProps> = (props) => {
    const { deleteUser, selectedContest } = props;

    const [tabId, setTabId] = useState('0');
    const onChangeHandler = useCallback(
        (tabId: string) => {
            setTabId(tabId);
        },
        [],
    );

    const handleUserDelete = useCallback(
        (uid: string) => {
                deleteUser(uid, selectedContest.id);
            },
        [deleteUser, selectedContest]
    );

    // TODO: NON IDEAL STATE
    if (!props.selectedContest) {
        return (
            <div>Нихуя нет</div>
        );
    }

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
                    panel={renderUsers(props.users, handleUserDelete)}
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
