import { Table } from 'antd';
import React from 'react';
import Block from '../ui/block/block';

const getColumns = () => ([
    {
        title: 'Имя',
        dataIndex: 'username',
        key: 'username',
    },
]);

const addKeys = data => data.map((item, index) => ({
    ...item,
    key: index,
}));

const RaceInfo = props =>
    (<Block>
        <Table 
            columns={getColumns()} 
            dataSource={addKeys(props.currentRaces)} 
        />
    </Block>);

export default RaceInfo;