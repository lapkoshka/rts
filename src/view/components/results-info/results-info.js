import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const getRaceHistoryColumns = () => ([
    {
        title: 'N',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Имя',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Время',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Дата',
        dataIndex: 'timestamp',
        key: 'date',
    },
]);

const renderRaceHistory = history => (
    <Table 
        columns={getColumns()} 
        dataSource={history} 
    />);

const ResultsInfo = props => (
    <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="История" key="1">
            renderRaceHistory(props.history);
        </TabPane>
        <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
        </TabPane>
    </Tabs>
);

export default ResultsInfo;
