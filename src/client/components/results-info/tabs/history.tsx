import { Table } from 'antd';
import React from 'react';
import { RaceHistory, RaceHistoryRow } from '../../../../server/view/domains/results';
import { renderDeleteButton } from '../../ui/delete/delete';

export const renderRaceHistory = (history: RaceHistory, deleteRace?: (id: number) => void) => {
    const historyWithKeys = history.map((item: RaceHistoryRow) => ({
        ...item,
        key: item.id,
    }));

    const deleteTitle = 'Вы уверены что хотите удалить эту гонку?';
    return (
        <Table dataSource={historyWithKeys}>
            <Table.Column key='id' title='N' dataIndex='id'/>
            <Table.Column key='username' title='Имя' dataIndex='username'/>
            <Table.Column key='time' title='Время' dataIndex='formattedTime'/>
            <Table.Column key='date' title='Дата' dataIndex='timestamp'/>
            {
                deleteRace ? (
                    <Table.Column
                        key='delete'
                        title='Удаление'
                        render={(text) => renderDeleteButton(deleteTitle,
                            () => deleteRace(text.id))
                        }
                    />
                ) : null
            }
        </Table>
    );
};
