import { Overlay } from '@blueprintjs/core';
import React, { FC } from 'react';
import { ContestData } from '../../../../server/view-data/contests/contests';
import styles from './contest-settings.module.css';

interface ContestSettingsProps {
    isOpen: boolean;
    currentContest: ContestData;
}

interface ContestSettingsActions {
    onClose: () => void;
}

export const ContestSettings: FC<ContestSettingsProps & ContestSettingsActions> = (props) => {
    const { isOpen, onClose } = props;

    return (
        <Overlay
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={styles.overlay}>
                <div className={styles.popup}>
                    <div>kek</div>
                </div>
            </div>
        </Overlay>
    )
}
