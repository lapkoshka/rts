import { Table } from 'antd';
import React from 'react';

const COLUMNS = [
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
];

const renderRaceHistory = history => {
    const historyWithKeys = history.map(item => ({
        ...item,
        key: item.id,
    }));

    return (<Table
        columns={COLUMNS}
        dataSource={historyWithKeys}
    />);
};

export default renderRaceHistory;
