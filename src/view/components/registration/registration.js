import React, { useEffect, useRef } from 'react';
import { Modal, Input, Form } from 'antd';

const ENTER_KEY_CODE = 13;

const Registration = props => {
    const userForm = {...props.user};
    useEffect(() => {
        const keyupHandler = evt => {
            const isPressEnterWhenPopupOpened =
                evt.keyCode === ENTER_KEY_CODE && props.shouldShowPopup;
            if (isPressEnterWhenPopupOpened) {
                props.actions.submitUser(userForm);
            }
        };

        document.addEventListener('keyup', keyupHandler);
        return () => document.removeEventListener('keyup', keyupHandler);
    });

    return (
        <Modal
            title='Регистрация нового участника'
            visible={props.shouldShowPopup}
            onOk={() => props.actions.submitUser(userForm)}
            onCancel={() => props.actions.onCancelRegistration()}
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
};

export default Registration;
