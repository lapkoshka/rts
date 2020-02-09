import { Button, Icon, MenuItem } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Select } from '@blueprintjs/select';
import React, { FC, useCallback, useState } from 'react';
import { UserData } from '../../../../server/storage/domains/users';
import styles from './user-select.module.css';

interface UserSelectProps {
    users: UserData[];
    onUserSelect: (id: number | undefined) => void;
}

const selectName = (user: UserData): string => `${user.firstname} ${user.lastname}`;

const filterUsers = (users: UserData[], filter: string): UserData[] =>
    users.filter((user: UserData) =>
        new RegExp(filter.toLowerCase())
        .test(
            (user.firstname + user.lastname).toLowerCase()
        ));

export const UserSelect: FC<UserSelectProps> = (props) => {
    const { users, onUserSelect } = props;

    const [filterQueryText, handleFilterQueryChange] = useState('');
    const [selectedUser, setSelected] = useState(null);

    const handleSelect = useCallback(
        (user: UserData) => {
            onUserSelect(user.id);
            setSelected(user);
        },
        [onUserSelect, setSelected]
    );

    const handleCancel = useCallback(
        () => {
            onUserSelect(undefined);
            setSelected(null);
        },
        [onUserSelect, setSelected]
    );

    const displayedName = selectedUser ? selectName(selectedUser) : 'Выбрать';
    const items = filterUsers(users, filterQueryText);

    return (
        <div className={styles.content}>
            <div className={styles.label}>Привязать метку к </div>
            <Select
                filterable={true}
                items={items}
                itemRenderer={(user, { handleClick }) => (
                    <MenuItem
                        key={user.id}
                        text={selectName(user)}
                        onClick={handleClick}
                    />
                )}
                onItemSelect={handleSelect}
                onQueryChange={handleFilterQueryChange}
            >
                <Button
                    className={styles.button}
                    text={displayedName}
                    rightIcon='caret-down'
                />
            </Select>
            <Icon
                className={styles.icon}
                onClick={handleCancel}
                icon={IconNames.CROSS}
                iconSize={Icon.SIZE_LARGE}
            />
        </div>
    );
};
