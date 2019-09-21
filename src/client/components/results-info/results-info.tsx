import React from 'react';
import { Tabs } from 'antd';
import { RaceHistory } from '../../../server/controllers/results/history';
import { TotalInfo } from '../../../server/controllers/results/total';
import { Users } from '../../../server/controllers/results/users';
import Block from '../ui/block/block';
import renderRaceHistory from './tabs/history';
import renderUsers from './tabs/users';
import renderTotalInfo from './tabs/total';
const { TabPane } = Tabs;

export interface ResultsInfoProps {
    history: RaceHistory;
    users: Users;
    total: TotalInfo;
    deleteRace: (id: number) => void;
    deleteUser: (uid: string) => void;
}

const ResultsInfo: React.FC<ResultsInfoProps> = (props) => (
    <Block>
        <Tabs defaultActiveKey='1'>
            <TabPane tab='История' key='1'>
                { renderRaceHistory(props.history, props.deleteRace) }
            </TabPane>
            <TabPane tab='Участники' key='2'>
                { renderUsers(props.users, props.deleteUser) }
            </TabPane>
            <TabPane tab='Итого' key='3'>
                { renderTotalInfo(props.total) }
            </TabPane>
        </Tabs>
    </Block>
);

export default ResultsInfo;
