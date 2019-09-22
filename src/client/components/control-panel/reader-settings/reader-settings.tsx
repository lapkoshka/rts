import {
    Drawer,
    Switch,
    InputGroup,
    Popover,
    Menu,
    MenuItem,
    Button,
    Position,
} from '@blueprintjs/core';
import React, { FormEvent } from 'react';
import './reader-settings.scss';
import { MainReaderParams } from '../../../../server/lib/readers/main-reader';
import { ControlPanelActions, ControlPanelProps } from '../control-panel';
import ReaderParams from './reader-params';

const ReaderSettings: React.FC<ControlPanelProps & ControlPanelActions> = React.memo((props) => {
    const onCloseHandler = React.useCallback(
        () => {
            props.showMainReaderSettings(false);
        },
        []);

    const onSwitchChange = React.useCallback(
        (evt: FormEvent) => {
            props.setIpAuto((evt.target as HTMLInputElement).checked);
        },
        []);

    const onIpAddressInputChange = React.useCallback(
        (evt: FormEvent) => {
            props.setIpAddress((evt.target as HTMLInputElement).value);
        },
        []);

    const onMenuItemClickHandler = React.useCallback(
        (event) => {
            props.setIpAddress(event.target.innerText);
        },
        []);

    const onReaderParamsChange = React.useCallback(
        (params: MainReaderParams) => {
            props.setMainReaderParams(params);
        },
        []);

    const { auto, address} = props.mainReaderSettings.ip;
    return (
        <Drawer
            title='Настройки главного приемника'
            position={Position.LEFT}
            isOpen={props.shouldShowPopup}
            onClose={onCloseHandler}
            size={Drawer.SIZE_SMALL}
        >
            <div className='reader-settings-drawer-content'>
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

                <ReaderParams
                    params={props.mainReaderSettings.params}
                    onChange={onReaderParamsChange}
                    onSetDefault={props.setDefaultMainReaderParams}
                />
            </div>
        </Drawer>
    );
});

export default ReaderSettings;
