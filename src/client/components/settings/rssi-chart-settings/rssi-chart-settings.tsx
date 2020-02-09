import { Switch } from '@blueprintjs/core';
import React, { ChangeEvent, FC, FormEvent, memo, useCallback } from 'react';
import { ChartEnableInfo } from '../../../../server/controllers/rssi-chart';
import { UserData } from '../../../../server/storage/domains/users';

interface RSSIChartSettingsProps {
    users: UserData[];
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
                        props.users.map(({ id, uid, firstname, lastname}: UserData) => (
                            <option key={id} value={uid}>{`${firstname} ${lastname}`}</option>
                        ))
                    }
                </select>
            </div>
        </>
    );
});
