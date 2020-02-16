import React, { FC } from 'react';
import { RaceHistoryViewData } from '../../../../server/view/domains/results';
import { DeleteButton } from '../../ui/delete/delete';

interface RaceHistoryProps {
    history: RaceHistoryViewData;
}

interface RaceHistoryActions {
    onDeleteRace?: (id: number) => void;
}

export const RaceHistory: FC<RaceHistoryProps & RaceHistoryActions> = (props) =>  (
    <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped">
        <thead>
        <tr>
            <th>Имя</th>
            <th>Время</th>
            <th>Лучший круг</th>
            {props.onDeleteRace ? (
                <th>Удалить</th>
            ) : null}
        </tr>
        </thead>
        <tbody>
        {props.history.map((race) => (
            <tr key={race.formattedTime}>
                <td>{race.username}</td>
                <td>{race.formattedTime}</td>
                <td>N/A</td>
                {props.onDeleteRace ? (
                    <td>
                        <DeleteButton
                            title='Вы уверены что хотите удалить эту гонку?'
                            onClick={() => props.onDeleteRace(race.id)}
                        />
                    </td>
                ) : null
                }
            </tr>
        ))}
        </tbody>
    </table>
);

