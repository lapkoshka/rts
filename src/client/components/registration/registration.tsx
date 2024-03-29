import { Button, Divider, Intent, Label, Tag } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { Nullable } from '../../../common/types';
import { ContestData } from '../../../server/storage/domains/contests';
import { UserData, UserFormData } from '../../../server/storage/domains/users';
import { KEYCODES } from '../../lib/keycodes';
import { OverlayPopup } from '../ui/overlay-popup/overlay-popup';
import { ContestAttach } from './contest-attach/contest-attach';
import { UserSelect } from './user-select/user-select';
import styles from './registration.module.css';

export interface RegistrationProps {
    shouldShowPopup: boolean;
    user: UserData;
    userList: UserData[];
    incomingUid: string;
    currentContest: Nullable<ContestData>;
}

export interface RegistrationActions {
    onCancelRegistration: VoidFunction;
    submitUser: (formData: UserFormData) => void;
    attachUser: (formData: UserFormData) => void;
    onDeattachTag: (uid: string) => void;
    onDeattachContest: (uid: string, contestId: number) => void;
}

export const Registration: FC<RegistrationProps & RegistrationActions> = (props) => {
    const { user, userList, incomingUid, currentContest } = props;
    const formData: UserFormData = {
        ...user,
        firstname: user ? user.firstname : '',
        lastname: user ? user.lastname : '',
        uid: incomingUid,
        contests: user ? user.contests : [],
        alreadyRegistred: Boolean(user),
        attachContestId: currentContest ? currentContest.id : undefined,
    };

    const [disabled, setInputsDisabled] = useState(false);

    const handleContestAttach = useCallback(
        (id: number | undefined) => {
            formData.attachContestId = id;
        },
        [formData],
    );

    const handleSelect = useCallback(
        (id: number | undefined) => {
            formData.attachUserId = id;
            if (id === undefined) {
                setInputsDisabled(false);
                return;
            }

            setInputsDisabled(true);
        },
        [formData, setInputsDisabled]
    );

    const handleSubmit = useCallback(
        () => {
            if (formData.attachUserId !== undefined) {
                props.attachUser(formData);
                return;
            }

            props.submitUser(formData);
        },
        [props, formData.attachUserId, formData]
    );

    const keyUpHandler = useCallback(
        (evt: KeyboardEvent) => {
            const isPressEnterWhenPopupOpened =
                evt.keyCode === KEYCODES.ENTER && props.shouldShowPopup;
            if (isPressEnterWhenPopupOpened) {
                handleSubmit();
            }
        },
        [props, handleSubmit],
    );

    const handleInput = useCallback(
        (evt: FormEvent<HTMLInputElement>) => {
            const fieldType = evt.currentTarget.name as 'firstname' | 'lastname';

            formData[fieldType] = evt.currentTarget.value;
        },
        [formData]
    );

    const handleDeattachTag = useCallback(
        () => {
            props.onDeattachTag(incomingUid);
        },
        [props, incomingUid]
    );

    useEffect(
        () => {
            document.addEventListener('keyup', keyUpHandler);

            return () => document.removeEventListener('keyup', keyUpHandler);
        },
        [keyUpHandler]
    );

    return (
        <OverlayPopup
            isOpen={props.shouldShowPopup}
            onClose={props.onCancelRegistration}
            title='Регистрация нового участника'
        >
            <Tag
                icon={IconNames.PULSE}
                fill
                large
            >
                {incomingUid}
            </Tag>
            <Divider />
            <form>
                <Label>
                    Имя
                    <input
                        disabled={disabled}
                        autoFocus
                        className='bp3-input'
                        type='text'
                        placeholder='Имя'
                        name='firstname'
                        dir='auto'
                        onInput={handleInput}
                        defaultValue={formData.firstname}
                    />
                </Label>
                <Label>
                    Фамилия
                    <input
                        disabled={disabled}
                        className='bp3-input'
                        type='text'
                        placeholder='Имя'
                        name='lastname'
                        dir='auto'
                        onInput={handleInput}
                        defaultValue={formData.lastname}
                    />
                </Label>

                <ContestAttach
                    user={formData}
                    currentContest={currentContest}
                    onAttach={handleContestAttach}
                    onDeattach={props.onDeattachContest}
                />
                <Divider />
                {
                    formData.alreadyRegistred ? (
                        <div className={styles['already-registred-alert']}>
                            <strong>Метка уже связана с пользователем</strong>
                            <Button
                                onClick={handleDeattachTag}
                                intent={Intent.WARNING}
                            >
                                Отвязать
                            </Button>
                        </div>
                    ) : (
                        <UserSelect
                            users={userList}
                            onUserSelect={handleSelect}
                        />
                    )
                }
                <Button className={styles.submit} onClick={handleSubmit}>Ок</Button>
                <Button onClick={props.onCancelRegistration}>Отмена</Button>
            </form>
        </OverlayPopup>
    );
};
