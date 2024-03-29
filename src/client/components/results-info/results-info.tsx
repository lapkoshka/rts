import React, { FC, useCallback, useState } from 'react';
import { ContestData } from '../../../server/storage/domains/contests';
import { UserInfoViewData, RaceHistoryViewData, TotalInfoViewData } from '../../../server/view/domains/results';
import { Block } from '../ui/block/block';
import { RaceHistory } from './tabs/history';
import { UsersInfo } from './tabs/users';
import { TotalInfo } from './tabs/total';
import { Tabs, Tab } from '@blueprintjs/core';
import './results-info.scss';

export interface ResultsInfoProps {
    history: RaceHistoryViewData;
    users: UserInfoViewData;
    total: TotalInfoViewData;
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
            <h2>{props.selectedContest.name}</h2>
            <Tabs
                id='Results Info'
                selectedTabId={tabId}
                onChange={onChangeHandler}
            >
                <Tab
                    id='0'
                    className='results-info-tab-button'
                    title='История'
                    panel={(
                        <RaceHistory
                            history={props.history}
                            onDeleteRace={props.deleteRace}
                        />)}
                />
                <Tab
                    id='1'
                    className='results-info-tab-button'
                    title='Участники'
                    panel={(<UsersInfo users={props.users} />)}
                />
                <Tab
                    id='2'
                    className='results-info-tab-button'
                    title='Итого'
                    panel={(
                        <TotalInfo info={props.total}/>
                    )}
                />
            </Tabs>
        </Block>
    );
};
