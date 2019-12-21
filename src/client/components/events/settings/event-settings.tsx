import { Overlay } from '@blueprintjs/core';
import React, { FC } from 'react';
import { EventData } from '../../../../server/view-data/events/events';
import styles from './event-settings.module.css';

export interface EventSettingsProps {
    isOpen: boolean;
    currentEvent: EventData;
}

export interface EventSettingsActions {
    onClose: () => void;
}

export const EventSettings: FC<EventSettingsProps & EventSettingsActions> = (props) => {
    const { isOpen, onClose, currentEvent } = props;

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
