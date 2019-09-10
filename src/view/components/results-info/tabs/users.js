import { Table, Icon, Popconfirm, message } from 'antd';
import React from 'react';

const renderDeleteButton = callback => (
    <Popconfirm
        title='Вы уверены что хотите удалить пользователя?'
        onConfirm={() => message.success('Участник удалён')}
        okText='Да'
        cancelText='Нет'
    >
        <Icon type='delete' onClick={callback} />
    </Popconfirm>
);

const renderUsers = (users, actions) => {
    const usersWithKeys = users.map(item => ({
        ...item,
        key: item.uid,
    }));

    return (
        <Table dataSource={usersWithKeys}>
            <Table.Column key='uid' title='Метка' dataIndex='uid'/>
            <Table.Column key='username' title='Имя' dataIndex='username'/>
            <Table.Column
                key='delete'
                title='Удаление'
                render={
                    text => renderDeleteButton(() =>
                        actions.deleteUser(text.uid))
                }
            />
            <Table.Column />
        </Table>
    );
};

export default renderUsers;
