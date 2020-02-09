import { Button, MenuItem } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Select } from '@blueprintjs/select';
import React, { FC, useCallback } from 'react';
import { Nullable } from '../../../common/types';
import { ContestFormData } from '../../../server/storage/tools/database/tables/contests';
import styles from './contest.module.css';
import { ContestData } from '../../../server/view-data/contests/contests';
import { ContestSettings } from './settings/contest-settings';

export interface ContestProps {
    list: ContestData[];
    selectedContest: Nullable<ContestData>;
    showContestSettings: boolean;
}

export interface ContestActions {
    onContestCreate: VoidFunction;
    onContestSettingsChange: (data: ContestFormData) => void;
    onContestSelect: (id: number) => void;
    onContestDelete: (id: number) => void;
    onContestStart: (id: number) => void;
    onContestClose: (id: number) => void;
    setShowContestSettings: (show: boolean) => void;
}

export const Contest: FC<ContestProps & ContestActions> = (props) => {
    const {
        list,
        selectedContest,
        showContestSettings,
        onContestCreate,
        onContestSettingsChange,
        onContestSelect,
        onContestDelete,
        onContestStart,
        onContestClose,
        setShowContestSettings
    } = props;

    const handleItemSelect = useCallback(
        (selectedContest: ContestData) => {
            onContestSelect(selectedContest.id);
        },
        [onContestSelect],
    );

    const handleSettingsClickHandler = useCallback(
        () => {
            setShowContestSettings(true);
        },
        [setShowContestSettings],
    );

    const handleCloseSettings = useCallback(
        () => {
            setShowContestSettings(false);
        },
        [setShowContestSettings],
    );

    const handleContestStart = useCallback(
        () => {
            onContestStart(selectedContest.id);
        },
        [onContestStart, selectedContest],
    );

    const handleContestClose = useCallback(
        () => {
            onContestClose(selectedContest.id);
        },
        [onContestClose, selectedContest],
    );

    const itemRenderer = useCallback(
        (item: ContestData, { handleClick }) => {
            const style = { background: '#ffffff'};
            const isStartedContest = item.started_flag === 1 && item.finished_flag === 0;

            if (isStartedContest) {
                style.background = '#fffbe6';
            }

            return (
                <MenuItem
                    style={style}
                    key={item.id}
                    text={item.name}
                    onClick={handleClick}
                />
            );
        },
        []
    );

    const constestIsStarted = selectedContest && Boolean(selectedContest.started_flag);
    const contestIsFinished = selectedContest && !selectedContest.finished_flag;

    const shouldDisableStart = !selectedContest || constestIsStarted;
    const shouldDisableClose = !constestIsStarted || !contestIsFinished;

    return (
        <>
            <div className={styles.selector}>
                <Button
                    className={styles.insert}
                    onClick={onContestCreate}
                    icon={IconNames.INSERT}
                />
                {
                    list.length ? (
                        <Select
                            className={styles.select}
                            items={list}
                            itemRenderer={itemRenderer}
                            onItemSelect={handleItemSelect}
                        >
                            <Button
                                className={styles.dropdown}
                                text={selectedContest.name}
                                rightIcon='caret-down'
                            />
                        </Select>
                    ) : (
                        <div className={styles['select-placeholder']}>
                            Нет созданных мероприятий
                        </div>
                    )
                }
                <Button
                    disabled={!selectedContest}
                    icon={IconNames.SETTINGS}
                    onClick={handleSettingsClickHandler}
                />
            </div>
            <div className={styles.controls}>
                <Button
                    className={styles.start}
                    onClick={handleContestStart}
                    text='Начать'
                    disabled={shouldDisableStart}
                />
                <Button
                    className={styles.stop}
                    onClick={handleContestClose}
                    text='Завершить'
                    disabled={shouldDisableClose}
                />
            </div>
            {
                list.length ? (
                    <ContestSettings
                        isOpen={showContestSettings}
                        contest={selectedContest}
                        onClose={handleCloseSettings}
                        onContestSettingsChange={onContestSettingsChange}
                        onContestDelete={onContestDelete}
                    />
                ) : null
            }
        </>
    );
};

