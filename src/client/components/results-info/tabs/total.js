import {Table} from 'antd';
import React from 'react';

const renderTotalInfo = info => {
    const infoWithKeys = info.map(item => ({
        ...item,
        key: item.uid,
    }));

    return (
        <Table dataSource={infoWithKeys}>
            <Table.Column key='username' title='Имя' dataIndex='username'/>
            <Table.Column key='time' title='Лучшее время' dataIndex='besttime'/>
            <Table.Column key='count' title='Всего заездов' dataIndex='count'/>
        </Table>
    );
};

export default renderTotalInfo;
