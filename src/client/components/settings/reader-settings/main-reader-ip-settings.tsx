import {
    Button,
    InputGroup,
    Menu,
    MenuItem,
    Popover,
    Position,
    Switch,
} from '@blueprintjs/core';
import React, { FC, FormEvent, memo, useCallback } from 'react';
import { MainReaderSettings } from '../../../../server/lib/readers/main-reader';

export interface ReaderSettingsProps {
    setIpAuto: (enable: boolean) => void;
    setIpAddress: (address: string) => void;
    mainReaderSettings: MainReaderSettings;
}

export const MainReaderIpSettings: FC<ReaderSettingsProps> = memo((props) => {
    const onSwitchChange = useCallback(
        (evt: FormEvent<HTMLInputElement>) => {
            props.setIpAuto(evt.currentTarget.checked);
        },
        [props],
    );

    const onIpAddressInputChange = useCallback(
        (evt: FormEvent<HTMLInputElement>) => {
            props.setIpAddress(evt.currentTarget.value);
        },
        [props],
    );

    const onMenuItemClickHandler = useCallback(
        (event) => {
            props.setIpAddress(event.target.innerText);
        },
        [props],
    );

    const { auto, address} = props.mainReaderSettings.ip;
    return (
        <>
            <Switch
                checked={auto}
                label='Определять автоматически'
                onChange={onSwitchChange}
            />
            <InputGroup
                disabled={auto}
                value={address}
                placeholder='0.0.0.0'
                onChange={onIpAddressInputChange}
                large={true}
                rightElement={(
                    <Popover
                        content={!auto && (
                            <Menu>
                                <MenuItem text='0.0.0.0' onClick={onMenuItemClickHandler}/>
                                <MenuItem text='192.168.0.36' onClick={onMenuItemClickHandler}/>
                                <MenuItem text='192.168.0.37' onClick={onMenuItemClickHandler}/>
                            </Menu>
                        )}
                        position={Position.BOTTOM_RIGHT}
                    >
                        <Button
                            disabled={auto}
                            minimal={true}
                            rightIcon='caret-down'
                        >
                            Выбрать
                        </Button>
                    </Popover>
                )}
            />
        </>
    );
});
