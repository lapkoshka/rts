// import { Select } from '@blueprintjs/select';
import { Button, MenuItem } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Select } from '@blueprintjs/select';
import React, { FC, useCallback, useState } from 'react';
import './events.scss';

// export interface EventsProps {
//
// }
//
// export interface EventsActions {
//
// }

// export const Events: FC<EventsProps & EventsActions> = () => (
export const Events: FC = () => {
    const eventList = [
        'Гонка в залупогорске',
        'Pizda-zalupa Racing Club',
        'Памп-хуямп 2022',
    ];

    const [currentEvent, setCurrentEvent] = useState(eventList[0]);
    const onItemSelect = useCallback(
        (value) => {
            console.log(value);
            setCurrentEvent(value);
        },
        [],
    );

    return (
        <>
            <div className='events-title'>События</div>
            <div className='events-selector'>
                <Button
                    className='events-selector-insert'
                    icon={IconNames.INSERT} />
                <Select
                    className='events-selector-select'
                    filterable={true}
                    items={eventList}
                    itemRenderer={(item, { handleClick }) => (
                        <MenuItem
                            key={item}
                            text={item}
                            onClick={handleClick}
                        />
                    )}

                    onItemSelect={onItemSelect}>
                    <Button
                        text={currentEvent}
                        rightIcon='caret-down'
                    />
                </Select>
                <Button
                    className='events-selector-settings'
                    icon={IconNames.SETTINGS} />
            </div>
            <div className='events-controls'>
                <Button className='events-controls-start'>Начать</Button>
                <Button className='events-controls-stop'>Завершить</Button>
            </div>
        </>
    );
};

