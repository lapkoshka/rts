import { Table } from 'antd';
import React from 'react';
import renderDeleteButton from '../../ui/delete/delete';

const renderRaceHistory = (history, actions) => {
    const historyWithKeys = history.map(item => ({
        ...item,
        key: item.id,
    }));

    const deleteTitle = 'Вы уверены что хотите удалить эту гонку?';
    return (
        <Table dataSource={historyWithKeys}>
            <Table.Column key='id' title='N' dataIndex='id'/>
            <Table.Column key='username' title='Имя' dataIndex='username'/>
            <Table.Column key='time' title='Время' dataIndex='formattedTIme'/>
            <Table.Column key='date' title='Дата' dataIndex='timestamp'/>
            <Table.Column
                key='delete'
                title='Удаление'
                render={
                    text => renderDeleteButton(deleteTitle, () =>
                        actions.deleteRace(text.id))
                }
            />
        </Table>
    );
};

export default renderRaceHistory;
