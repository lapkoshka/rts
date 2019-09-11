import React from 'react';
import { Tabs } from 'antd';
import Block from '../ui/block/block';
import renderRaceHistory from './tabs/history';
import renderUsers from './tabs/users';
import renderTotalInfo from './tabs/total';
const { TabPane } = Tabs;

const ResultsInfo = props => (
    <Block>
        <Tabs defaultActiveKey='1'>
            <TabPane tab='История' key='1'>
                { renderRaceHistory(props.history, props.historyActions) }
            </TabPane>
            <TabPane tab='Участники' key='2'>
                { renderUsers(props.users, props.usersActions) }
            </TabPane>
            <TabPane tab='Итого' key='3'>
                { renderTotalInfo(props.total) }
            </TabPane>
        </Tabs>
    </Block>
);

export default ResultsInfo;
