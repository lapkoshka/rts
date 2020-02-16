import React, { FC } from 'react';
import { UserInfoViewData } from '../../../../server/view/domains/results';

interface UsersInfoProps {
    users: UserInfoViewData;
}

export const UsersInfo: FC<UsersInfoProps> = (props) => (
    <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped">
        <thead>
        <tr>
            <th>Имя</th>
            <th>Метка</th>
        </tr>
        </thead>
        <tbody>
        {props.users.map((row) => (
            <tr key={row.username}>
                <td>{row.username}</td>
                <td>{row.uid}</td>
            </tr>
        ))}
        </tbody>
    </table>
);
