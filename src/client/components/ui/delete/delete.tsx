import { Popover, Button, PopoverInteractionKind, Position, Icon } from '@blueprintjs/core';
import React, { FC } from 'react';
import { IconNames } from '@blueprintjs/icons';
import styles from './delete.module.css';

interface DeleteProps {
    title: string;
    onClick: VoidFunction;
}

export const DeleteButton: FC<DeleteProps> = (props) => (
    <Popover
        interactionKind={PopoverInteractionKind.CLICK}
        popoverClassName="bp3-popover-content-sizing"
        position={Position.TOP}
    >
        <Icon
            className={styles.icon}
            icon={IconNames.TRASH}
        />
        <div>
            <h5>{props.title}</h5>
            <Button
                className="bp3-popover-dismiss"
                onClick={props.onClick}
            >
                Да
            </Button>
            <Button className="bp3-popover-dismiss">Отмена</Button>
        </div>
    </Popover>
);
