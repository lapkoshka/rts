import { Button, MenuItem } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Select } from '@blueprintjs/select';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './events.module.css';
import { EventData } from '../../../server/view-data/events/events';
import { EventSettings } from './settings/event-settings';

export interface EventsProps {
    list: EventData[];
}

export interface EventsActions {
    onEventCreate: () => void;
}

export const Events: FC<EventsProps & EventsActions> = (props) => {
    const { list } = props;
    const [currentEvent, setCurrentEvent] = useState(list[0]);

    /**
     * Меня не радует эта часть, сначала массив мероприятий пустой, надо делать заглушку
     * чтобы не сломать типы. Поэтому как только приходит список событий, проверяем что в локальном
     * стейте заглушка и подменяем валидными данными.
     *
     * Чтобы это переделать, надо вероятно делать еще один вышестовящий компонент.
     */
    useEffect(() => {
        if (currentEvent.id === 0) {
            setCurrentEvent(list[0]);
        }
    });

    const [shouldShowSettings, setShowSettings] = useState(false);

    const onItemSelect = useCallback(
        (selectedEvent) => {
            setCurrentEvent(selectedEvent);
        },
        [],
    );

    const openSettingsClickHandler = useCallback(
        () => {
            setShowSettings(true);
        },
        [],
    );

    const onCloseSettings = useCallback(
        () => {
            setShowSettings(false);
        },
        [],
    );

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
                    icon={IconNames.SETTINGS}
                    onClick={openSettingsClickHandler}
                />
            </div>
            <div className={styles.controls}>
                <Button className={styles.start}>Начать</Button>
                <Button>Завершить</Button>
            </div>
            <EventSettings
                isOpen={shouldShowSettings}
                currentEvent={currentEvent as EventData}
                onClose={onCloseSettings}
            />
        </>
    );
};

