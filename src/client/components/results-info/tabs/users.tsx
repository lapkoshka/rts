import { Table } from 'antd';
import React from 'react';
import { UserData } from '../../../../server/modules/database/tables/users';
import { renderDeleteButton } from '../../ui/delete/delete';

export const renderUsers = (users: UserData[], deleteUser: (uid: string) => void) => {
    const usersWithKeys = users.map((item: UserData) => ({
        key: item.id,
        uid: item.uid,
        username: item.firstname + ' ' + item.lastname,
    }));

    const deleteTitle = 'Вы уверены что хотите удалить пользователя из этого соревнования?';
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
