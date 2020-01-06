import { Button, Divider, Intent, Label, Switch, Tag } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { UserData } from '../../../server/modules/database/tables/users';
import { KEYCODES } from '../../lib/keycodes';
import { OverlayPopup } from '../ui/overlay-popup/overlay-popup';
import { UserSelect } from './user-select/user-select';
import styles from './registration.module.css';

export interface RegistrationProps {
    shouldShowPopup: boolean;
    user: UserData;
    userList: UserData[];
}

export interface RegistrationActions {
    onCancelRegistration: VoidFunction;
    submitUser: (user: UserData) => void;
    updateUserTag: (user: UserData) => void;
    onDeattachTag: (uid: string) => void;
}

const contestName = 'TEST';

export const Registration: FC<RegistrationProps & RegistrationActions> = (props) => {
    const { user, userList, shouldShowPopup, onCancelRegistration } = props;
    const formData = { ...user };
    const [isInputsEnabled, setInputsEnabled] = useState(true);

    const handleUserSelect = useCallback(
        (id: number | undefined) => {
            formData.id = id;

            if (id === undefined) {
                setInputsEnabled(true);
                return;
            }

            setInputsEnabled(false);
        },
        [formData, setInputsEnabled]
    );

    const handleSubmit = useCallback(
        () => {
            console.log(1);
            const isNewTag = !formData.alreadyRegistred;
            const isNewTagWithExistedUser = isNewTag && formData.id !== undefined;

            if (isNewTagWithExistedUser) {
                props.updateUserTag(formData);
                return;
            }

            props.submitUser(formData);
        },
        [props, formData]
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

    useEffect(
        () => {
            document.addEventListener('keyup', keyUpHandler);

            return () => document.removeEventListener('keyup', keyUpHandler);
        },
        [keyUpHandler]
    );

    const handleInput = useCallback(
        (evt: FormEvent<HTMLInputElement>) => {
            const fieldType = evt.currentTarget.name;
            formData[fieldType] = evt.currentTarget.value;
        },
        [formData]
    );
    const handleSwitchChange = useCallback(
        (evt: FormEvent<HTMLInputElement>) => {
        },
        [],
    );

    const handleDeattachTag = useCallback(
        () => {
            props.onDeattachTag(user.uid);
        },
        [props, user.uid]
    );

    return (
        <OverlayPopup
            isOpen={shouldShowPopup}
            onClose={onCancelRegistration}
            title='Регистрация нового участника'
        >
            <Tag
                icon={IconNames.PULSE}
                fill
                large
            >
                {user.uid}
            </Tag>

            <Divider />
            <form>
                <Label>
                    Имя
                    <input
                        disabled={!isInputsEnabled}
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
                        disabled={!isInputsEnabled}
                        className='bp3-input'
                        type='text'
                        placeholder='Имя'
                        name='lastname'
                        dir='auto'
                        onInput={handleInput}
                        defaultValue={formData.lastname}
                    />
                </Label>
                <Switch
                    checked={false}
                    disabled={true}
                    label={`Привязать к текущему мероприятию: ${contestName}`}
                    onChange={handleSwitchChange}
                />

                <Divider />
                {
                    user.alreadyRegistred ? (
                        <div className={styles['already-registred-alert']}>
                            <strong>Метка уже связана с пользователем</strong>
                            <Button
                                onClick={handleDeattachTag}
                                intent={Intent.WARNING}
                            >
                                Разорвать связь?
                            </Button>
                        </div>
                    ) : (
                        <UserSelect
                            users={userList}
                            onUserSelect={handleUserSelect}
                        />
                    )
                }
                <Divider />

                <Button className={styles.submit} onClick={handleSubmit}>Ок</Button>
                <Button onClick={onCancelRegistration}>Отмена</Button>
            </form>
        </OverlayPopup>
    );
};
