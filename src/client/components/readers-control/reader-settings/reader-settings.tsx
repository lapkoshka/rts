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
import {
    MainReaderParams,
    MainReaderSettings,
} from '../../../../server/lib/readers/main-reader';
import ReaderParams from './reader-params';


interface ReaderSettingsProps {
    settings: MainReaderSettings;
    showMainReaderSettings: (enable: boolean) => void;
    setIpAddress: (address: string) => void;
    setIpAuto: (enable: boolean) => void;
    setMainReaderParams: (params: MainReaderParams) => void;
    setDefaultMainReaderParams: () => void;
    shouldShowPopup: boolean;
}

const ReaderSettings: React.FC<ReaderSettingsProps> = React.memo((props) => {
    const onCloseHandler = React.useCallback(() =>
        props.showMainReaderSettings(false), []);

    const onSwitchChange = React.useCallback((evt: FormEvent) =>
        props.setIpAuto((evt.target as HTMLInputElement).checked), []);

    const onIpAddressInputChange = React.useCallback((evt: FormEvent) =>
        props.setIpAddress((evt.target as HTMLInputElement).value), []);

    const onMenuItemClickHandler = React.useCallback((event) =>
        props.setIpAddress(event.target.innerText), []);

    const onReaderParamsChange = React.useCallback((params: MainReaderParams) =>
        props.setMainReaderParams(params), []);

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
                    checked={props.settings.ip.auto}
                    label='Определять автоматически'
                    onChange={onSwitchChange}
                />
                <InputGroup
                    disabled={props.settings.ip.auto}
                    value={props.settings.ip.address}
                    placeholder='0.0.0.0'
                    onChange={onIpAddressInputChange}
                    large={true}
                    rightElement={(
                        <Popover
                            content={!props.settings.ip.auto && (
                                <Menu>
                                    <MenuItem text='0.0.0.0' onClick={onMenuItemClickHandler}/>
                                    <MenuItem text='192.168.0.37' onClick={onMenuItemClickHandler}/>
                                </Menu>
                            )}
                            position={Position.BOTTOM_RIGHT}
                        >
                            <Button
                                disabled={props.settings.ip.auto}
                                minimal={true}
                                rightIcon='caret-down'
                            >
                                Выбрать
                            </Button>
                        </Popover>
                    )}
                />

                <ReaderParams
                    params={props.settings.params}
                    onChange={onReaderParamsChange}
                    onSetDefault={props.setDefaultMainReaderParams}
                />
            </div>
        </Drawer>
    );
});

export default ReaderSettings;
