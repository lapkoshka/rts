import { Table } from 'antd';
import React from 'react';
import { TotalInfo, TotalInfoRow } from '../../../../server/view/domains/results';

export const renderTotalInfo = (info: TotalInfo) => {
    const infoWithKeys = info.map((item: TotalInfoRow, index: number) => ({
        ...item,
        key: index,
    }));

    return (
        <Table dataSource={infoWithKeys}>
            <Table.Column key='username' title='Имя' dataIndex='username'/>
            <Table.Column key='time' title='Лучшее время' dataIndex='formattedTime'/>
            <Table.Column key='count' title='Всего заездов' dataIndex='count'/>
        </Table>
    );
};
