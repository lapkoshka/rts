import { Switch } from '@blueprintjs/core';
import React from 'react';

interface RSSIChartSettingsProps {
    a: number;
}

const RSSIChartSettings: React.FC<RSSIChartSettingsProps> = React.memo(() => {
    return (
        <>
            <Switch
                checked={true}
                label='Показать'
                onChange={() => 0}
            />

            <div className='bp3-select .fill'>
                <select>
                    <option selected>Выберите участника</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                    <option value='4'>Four</option>
                </select>
            </div>
        </>
    );
});

export default RSSIChartSettings;
