import { Button, MenuItem } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Select } from '@blueprintjs/select';
import React, { FC, useCallback, useState } from 'react';
import { Nullable } from '../../../common/types';
import { ContestFormData } from '../../../server/modules/database/tables/contests';
import styles from './contest.module.css';
import { ContestData } from '../../../server/view-data/contests/contests';
import { ContestSettings } from './settings/contest-settings';

export interface ContestProps {
    list: ContestData[];
    selectedContest: Nullable<ContestData>;
}

export interface ContestActions {
    onContestCreate: () => void;
    onContestSettingsChange: (data: ContestFormData) => void;
    onContestSelect: (id: number) => void;
}

export const Contest: FC<ContestProps & ContestActions> = (props) => {
    const { list, selectedContest, onContestSettingsChange, onContestSelect} = props;

    const [shouldShowSettings, setShowSettings] = useState(false);

    const handleItemSelect = useCallback(
        (selectedContest: ContestData) => {
            onContestSelect(selectedContest.id);
        },
        [onContestSelect],
    );

    const handleSettingsClickHandler = useCallback(
        () => {
            setShowSettings(true);
        },
        [setShowSettings],
    );

    const handleCloseSettings = useCallback(
        () => {
            setShowSettings(false);
        },
        [setShowSettings],
    );

    const itemRenderer = useCallback(
        (item, { handleClick }) => {
            return (
                <MenuItem
                    key={item.id}
                    text={item.name}
                    onClick={handleClick}
                />
            )
        },
        []
    );

    const selectedContestCaption = list.length ?
        selectedContest.name : 'Нет созданных мероприятий';

    return (
        <>
            <div className={styles.selector}>
                <Button
                    className={styles.insert}
                    onClick={props.onContestCreate}
                    icon={IconNames.INSERT}
                />

                <Select
                    className={styles.select}
                    items={list}
                    itemRenderer={selectedContest ? itemRenderer : null}
                    onItemSelect={handleItemSelect}
                >
                    <Button
                        className={styles.dropdown}
                        text={selectedContestCaption}
                        rightIcon='caret-down'
                    />
                </Select>

                <Button
                    disabled={!selectedContest}
                    icon={IconNames.SETTINGS}
                    onClick={handleSettingsClickHandler}
                />
            </div>
            <div className={styles.controls}>
                <Button className={styles.start}>Начать</Button>
                <Button className={styles.stop}>Завершить</Button>
            </div>
            {
                list.length ? (
                    <ContestSettings
                        isOpen={shouldShowSettings}
                        contest={selectedContest}
                        onClose={handleCloseSettings}
                        onContestSettingsChange={onContestSettingsChange}
                    />
                ) : null
            }
        </>
    );
};

