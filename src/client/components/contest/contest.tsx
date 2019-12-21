import { Button, MenuItem } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Select } from '@blueprintjs/select';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './contest.module.css';
import { ContestData } from '../../../server/view-data/contests/contests';
import { ContestSettings } from './settings/contest-settings';

export interface ContestProps {
    list: ContestData[];
}

export interface ContestActions {
    onContestCreate: () => void;
}

export const Contest: FC<ContestProps & ContestActions> = (props) => {
    const { list } = props;
    const [currentContest, setCurrentContest] = useState(list[0]);

    /**
     * Меня не радует эта часть, сначала массив мероприятий пустой, надо делать заглушку
     * чтобы не сломать типы. Поэтому как только приходит список событий, проверяем что в локальном
     * стейте заглушка и подменяем валидными данными.
     *
     * Чтобы это переделать, надо вероятно делать еще один вышестовящий компонент.
     */
    useEffect(() => {
        if (currentContest.id === 0 && list.length) {
            setCurrentContest(list[0]);
        }
    });

    const [shouldShowSettings, setShowSettings] = useState(false);

    const onItemSelect = useCallback(
        (selectedContest) => {
            setCurrentContest(selectedContest);
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
                    onClick={props.onContestCreate}
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
                        text={currentContest.name}
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
            <ContestSettings
                isOpen={shouldShowSettings}
                currentContest={currentContest as ContestData}
                onClose={onCloseSettings}
            />
        </>
    );
};

