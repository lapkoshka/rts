import { Table } from 'antd';
import React from 'react';
import { UserData } from '../../../../server/storage/domains/users';

export const renderUsers = (users: UserData[]) => {
    const usersWithKeys = users.map((item: UserData) => ({
        key: item.id,
        uid: item.uid,
        username: item.firstname + ' ' + item.lastname,
    }));

    return (
        <Table dataSource={usersWithKeys}>
            <Table.Column key='uid' title='Метка' dataIndex='uid'/>
            <Table.Column key='username' title='Имя' dataIndex='username'/>
            <Table.Column />
        </Table>
    );
};
