import { Button, Intent, Switch } from '@blueprintjs/core';
import React, { FC, FormEvent, useCallback, useState } from 'react';
import { Nullable } from '../../../../common/types';
import { ContestData } from '../../../../server/storage/domains/contests';
import { UserData } from '../../../../server/storage/tools/database/tables/users';
import style from './contest-attach.module.css';

interface ContestAttachProps {
    user: UserData;
    currentContest: Nullable<ContestData>;
    onAttach: (id: number | undefined) => void;
    onDeattach: (uid: string, contestId: number) => void;
}

const isUserAlreadyAttached = (user: UserData, contest: ContestData): boolean =>
    user.contests.some((contestId: number) => contestId === contest.id);

export const ContestAttach: FC<ContestAttachProps> = (props) => {
    const { user, currentContest, onAttach } = props;
    const [checked, setChecked] = useState(true);

    const handleSwitchChange = useCallback(
        (evt: FormEvent<HTMLInputElement>) => {
            const { checked } = evt.currentTarget;
            onAttach(checked ? currentContest.id : undefined);
            setChecked(evt.currentTarget.checked);
        },
        [onAttach, currentContest, setChecked],
    );

    const handleDeattach = useCallback(
        () => {
            props.onDeattach(user.uid, currentContest.id);
        },
        [props, user, currentContest]
    );

    if (!currentContest) {
        return (
            <strong>Метка не будет привязана к мероприятию</strong>
        );
    }

    if (isUserAlreadyAttached(user, currentContest)) {
        return (
            <div className={style['already-attached-alert']}>
                <strong className={style['already-attached-label']}>
                    Метка уже привязана к текущему мероприятию
                </strong>
                <Button
                    intent={Intent.WARNING}
                    onClick={handleDeattach}
                >Отвязать</Button>
            </div>
        );
    }

    return (
        <Switch
            checked={checked}
            label={`Привязать к: ${currentContest.name}`}
            onChange={handleSwitchChange}
        />
    );
};
