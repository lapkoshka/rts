import { Button, Intent, Switch } from '@blueprintjs/core';
import React, { FC, FormEvent, useCallback, useState } from 'react';
import { Nullable } from '../../../../common/types';
import { UserData } from '../../../../server/modules/database/tables/users';
import { ContestData } from '../../../../server/view-data/contests/contests';
import style from './contest-attach.module.css';

interface ContestAttachProps {
    user: UserData;
    currentContest: Nullable<ContestData>;
    onAttachChange: (id: number | undefined) => void;
    onDeattachContest: (userId: number, contestId: number) => void;
}

const isUserAlreadyAttached = (user: UserData, contest: ContestData): boolean =>
    Boolean(user.contests.find((id: number) => contest.id === id));

export const ContestAttach: FC<ContestAttachProps> = (props) => {
    const { user, currentContest, onAttachChange } = props;

    const [checked, setChecked] = useState(Boolean(currentContest));

    const handleSwitchChange = useCallback(
        (evt: FormEvent<HTMLInputElement>) => {
            const { checked } = evt.currentTarget;
            onAttachChange(checked ? currentContest.id : undefined);
            setChecked(evt.currentTarget.checked);
        },
        [onAttachChange, currentContest, setChecked],
    );

    const handleDeattach = useCallback(
        () => {
            props.onDeattachContest(user.id, currentContest.id);
        },
        [props, user, currentContest]
    );

    if (!currentContest) {
        return (
            <strong>Участник не будет привязан к мероприятию</strong>
        )
    }

    if (isUserAlreadyAttached(user, currentContest)) {
        return (
            <div className={style['already-attached-alert']}>
                <strong className={style['already-attached-label']}>
                    Участник уже привязан к текущему мероприятию
                </strong>
                <Button
                    intent={Intent.WARNING}
                    onClick={handleDeattach}
                >Отвязать</Button>
            </div>
        )
    }

    return (
        <Switch
            checked={checked}
            label={`Привязать к текущему мероприятию: ${currentContest.name}`}
            onChange={handleSwitchChange}
        />
    )
};
