import React, { FC } from 'react';
import { TotalInfoViewData } from '../../../../server/view/domains/results';

interface TotalInfoProps {
    info: TotalInfoViewData;
}

export const TotalInfo: FC<TotalInfoProps> = (props) => (
    <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped">
        <thead>
        <tr>
            <th>Имя</th>
            <th>Лучшее время</th>
            <th>Всего заездов</th>
        </tr>
        </thead>
        <tbody>
        {props.info.map((row) => (
            <tr key={row.formattedTime}>
                <td>{row.username}</td>
                <td>{row.formattedTime}</td>
                <td>{row.count}</td>
            </tr>
        ))}
        </tbody>
    </table>
);
