import React, { FC, useCallback, useState } from 'react';
import { RaceHistory } from '../../../server/view-data/results/updater';
import { TotalInfo } from '../../../server/view-data/results/updater';
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
}

export const ResultsInfo: FC<ResultsInfoProps> = (props) => {
    const [tabId, setTabId] = useState('0');
    const onChangeHandler = useCallback(
        (tabId: string) => {
            setTabId(tabId);
        },
        [],
    );

    if (!props.selectedContest) {
        return (
            <div className="bp3-non-ideal-state">
                <div className="bp3-non-ideal-state-visual">
                    <span className="bp3-icon bp3-icon-folder-open"></span>
                </div>
                <h4 className="bp3-heading">Ничего нет</h4>
                <div>Создайте мероприятие для того чтобы начать</div>
            </div>
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
                    panel={renderUsers(props.users)}
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
