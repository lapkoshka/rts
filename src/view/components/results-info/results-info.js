import React from 'react';
import { Tabs, Table } from 'antd';
import Block from '../ui/block/block';
const { TabPane } = Tabs;

const renderRaceHistory = history => {
    const columns = [
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
        }];
    return (<Table
        columns={columns}
        dataSource={history}
    />);
};

const ResultsInfo = props => (
    <Block>
        <Tabs defaultActiveKey='1'>
            <TabPane tab='История' key='1'>
                { renderRaceHistory(props.history) }
            </TabPane>
            <TabPane tab='Tab 2' key='2'>
                Content of Tab Pane 2
            </TabPane>
            <TabPane tab='Tab 3' key='3'>
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
    </Block>
);

export default ResultsInfo;
