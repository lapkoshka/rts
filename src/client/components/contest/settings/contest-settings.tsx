import { Button, InputGroup, Intent, Label, TextArea } from '@blueprintjs/core';
import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { ContestData, ContestFormData } from '../../../../server/storage/domains/contests';
import { OverlayPopup } from '../../ui/overlay-popup/overlay-popup';
import styles from './contest-settings.module.css';

interface ContestSettingsProps {
    isOpen: boolean;
    contest: ContestData;
}

interface ContestSettingsActions {
    onClose: VoidFunction;
    onContestSettingsChange: (data: ContestFormData) => void;
    onContestDelete: (id: number) => void;
}

const selectFormDataFromProps = (contest: ContestData): ContestFormData => ({
    id: contest.id,
    name: contest.name,
    description: contest.description,
});

export const ContestSettings: FC<ContestSettingsProps & ContestSettingsActions> = (props) => {
    const { isOpen, onClose, onContestSettingsChange, onContestDelete } = props;
    const [formData, setFormData] = useState(selectFormDataFromProps(props.contest));

    const handleNameChange = useCallback(
            (evt: FormEvent<HTMLInputElement>) => {
            setFormData({
                ...formData,
                name: evt.currentTarget.value,
            });
        },
        [formData, setFormData]
    );

    const handleDescriptionChange = useCallback(
        (evt: ChangeEvent<HTMLTextAreaElement>) => {
            setFormData({
                ...formData,
                description: evt.target.value,
            });
        },
        [formData, setFormData]
    );

    const handleSubmit = useCallback(
        () => {
            onContestSettingsChange(formData);
            onClose();
        },
        [onContestSettingsChange, formData, onClose],
    );

    const handleDelete = useCallback(
        () => {
            onContestDelete(props.contest.id);
        },
        [onContestDelete, props.contest]
    );

    // const keyUpHandler = useCallback((evt: KeyboardEvent) => {
    //         if (evt.keyCode === KEYCODES.ENTER) {
    //             // todo: баг, если не убрать фокус с выбранного поля, то formdata не обновится
    //             // потому что она обновляется по onChange поля
    //             handleSubmit();
    //         }
    //     },
    //     [],
    // );

    useEffect(
        () => {
            setFormData(selectFormDataFromProps(props.contest));
            // document.addEventListener('keyup', keyUpHandler);

            // return () => document.removeEventListener('keyup', keyUpHandler);

        },
        [props.contest]
    );

    return (
        <OverlayPopup
            title='Параметры соревнования'
            isOpen={isOpen}
            onClose={onClose}
        >
            <Label>
                Название
                <InputGroup
                    autoFocus
                    onChange={handleNameChange}
                    value={formData.name}
                />
            </Label>
            <Label>
                Описание
                <TextArea
                    className={styles.description}
                    growVertically={true}
                    intent={Intent.PRIMARY}
                    onChange={handleDescriptionChange}
                    value={formData.description}
                />
            </Label>
            <div className={styles.controls}>
                <div>
                    <Button onClick={handleSubmit}>Сохранить</Button>
                    <Button onClick={handleDelete}>Удалить</Button>
                </div>
                <Button onClick={onClose}>Отмена</Button>
            </div>
        </OverlayPopup>
    );
};
