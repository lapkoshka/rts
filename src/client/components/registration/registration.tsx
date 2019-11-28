import React, { FC, memo, useCallback, useEffect } from 'react';
import { Modal, Input, Form } from 'antd';
import { UserData } from '../../../server/modules/database/users';

const ENTER_KEY_CODE = 13;

export interface RegistrationProps {
    shouldShowPopup: boolean;
    user: any;
}

export interface RegistrationActions {
    onCancelRegistration: () => void;
    submitUser: (user: UserData) => void;
}

export const Registration: FC<RegistrationProps & RegistrationActions> = memo((props) => {
    const userForm = {...props.user};

    const keyUpHandler = useCallback((evt: KeyboardEvent) => {
            const isPressEnterWhenPopupOpened =
                evt.keyCode === ENTER_KEY_CODE && props.shouldShowPopup;
            if (isPressEnterWhenPopupOpened) {
                props.submitUser(userForm);
            }
        },
        [props, userForm],
    );

    useEffect(() => {
        document.addEventListener('keyup', keyUpHandler);
        return () => document.removeEventListener('keyup', keyUpHandler);
    });

    return (
        <Modal
            title='Регистрация нового участника'
            visible={props.shouldShowPopup}
            onOk={() => props.submitUser(userForm)}
            onCancel={() => props.onCancelRegistration()}
        >
            <Form.Item label='UID'>
                <Input size='large' value={userForm.uid} disabled/>
            </Form.Item>

            <div key={Math.random()}>
                <Form.Item label='Имя'>
                    <Input
                        size='large'
                        defaultValue={props.user.firstname}
                        onChange={({target: { value }}) => {
                            userForm.firstname = value;
                        }}
                    />
                </Form.Item>
                <Form.Item label='Фамилия'>
                    <Input
                        size='large'
                        defaultValue={props.user.lastname}
                        onChange={({target: { value }}) => {
                            userForm.lastname = value;
                        }}
                    />
                </Form.Item>
            </div>
        </Modal>
    );
});
