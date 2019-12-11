import { Button, MenuItem } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Select } from '@blueprintjs/select';
import React, { FC, useCallback, useState } from 'react';
import styles from './events.module.css';
import { EventData } from '../../../server/view-data/events/events';

export interface EventsProps {
    list: EventData[];
}

export interface EventsActions {
    onEventCreate: () => void;
}

export const Events: FC<EventsProps & EventsActions> = (props) => {
    const list = props.list.reverse();
    const [currentEvent, setCurrentEvent] = useState({
        id: 0,
        name: 'Событий нет'
    });
    const onItemSelect = useCallback(
        (selectedEvent) => {
            setCurrentEvent(selectedEvent);
        },
        [],
    );

    if (list.length > 0 && !currentEvent.id) {
        setCurrentEvent(list[0]);
    }

    return (
        <>
            <div className={styles.title}>События</div>
            <div className={styles.selector}>
                <Button
                    className={styles.insert}
                    onClick={props.onEventCreate}
                    icon={IconNames.INSERT} />
                <Select
                    className={styles.select}
                    filterable={true}
                    items={list}
                    itemRenderer={(item, { handleClick }) => (
                        <MenuItem
                            key={item.id}
                            text={item.name}
                            onClick={handleClick}
                        />
                    )}

                    onItemSelect={onItemSelect}>
                    <Button
                        className={styles.dropdown}
                        text={currentEvent.name}
                        rightIcon='caret-down'
                    />
                </Select>
                <Button
                    icon={IconNames.SETTINGS} />
            </div>
            <div className={styles.controls}>
                <Button className={styles.start}>Начать</Button>
                <Button>Завершить</Button>
            </div>
        </>
    );
};

