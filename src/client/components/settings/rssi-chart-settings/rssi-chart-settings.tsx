import { Switch } from '@blueprintjs/core';
import React, { ChangeEvent, FC, FormEvent, memo, useCallback } from 'react';
import { UserRow, Users } from '../../../../server/controllers/results/users';
import { ChartEnableInfo } from '../../../../server/controllers/rssi-chart/controller';

interface RSSIChartSettingsProps {
    users: Users;
    chartEnableInfo: ChartEnableInfo;
    setChartEnableInfo: (info: ChartEnableInfo) => void;
}

export const RSSIChartSettings: FC<RSSIChartSettingsProps> = memo((props) => {
    const onSwitchChange = useCallback(
        (evt: FormEvent<HTMLInputElement>) => {
            props.setChartEnableInfo({
                ...props.chartEnableInfo,
                enable: evt.currentTarget.checked,
            });
        },
        [props],
    );

    const onSelectChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            props.setChartEnableInfo({
                ...props.chartEnableInfo,
                uid: evt.currentTarget.selectedOptions[0].value,
            });
        },
        [props],
    );

    return (
        <>
            <Switch
                checked={props.chartEnableInfo.enable}
                label='Показать'
                onChange={onSwitchChange}
            />

            <div className='bp3-select .fill'>
                <select onChange={onSelectChange}>
                    {
                        props.users.map((user: UserRow) => (
                            <option key={user.uid} value={user.uid}>{user.username}</option>
                        ))
                    }
                </select>
            </div>
        </>
    );
});
