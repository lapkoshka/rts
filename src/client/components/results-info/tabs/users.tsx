import { Table } from 'antd';
import React from 'react';
import { UserRow, Users } from '../../../../server/controllers/results/users';
import renderDeleteButton from '../../ui/delete/delete';

const renderUsers = (users: Users, deleteUser: (uid: string) => void) => {
    const usersWithKeys = users.map((item: UserRow) => ({
        ...item,
        key: item.uid,
    }));

    const deleteTitle = 'Вы уверены что хотите удалить пользователя?';
    return (
        <Table dataSource={usersWithKeys}>
            <Table.Column key='uid' title='Метка' dataIndex='uid'/>
            <Table.Column key='username' title='Имя' dataIndex='username'/>
            <Table.Column
                key='delete'
                title='Удаление'
                render={(text) => renderDeleteButton(deleteTitle,
            () => deleteUser(text.uid))
                }
            />
            <Table.Column />
        </Table>
    );
};

export default renderUsers;
