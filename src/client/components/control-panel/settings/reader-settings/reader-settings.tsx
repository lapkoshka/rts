import {
    Button,
    InputGroup,
    Menu,
    MenuItem,
    Popover,
    Position,
    Switch,
} from '@blueprintjs/core';
import React, { FormEvent } from 'react';
import { MainReaderParams } from '../../../../../server/lib/readers/main-reader';
import { ControlPanelPropsAndActions } from '../../control-panel';
import ReaderParams from './reader-params';

const ReaderSettings: React.FC<ControlPanelPropsAndActions> = (props) => {
    const onSwitchChange = React.useCallback(
        (evt: FormEvent) => {
            props.setIpAuto((evt.target as HTMLInputElement).checked);
        },
        [props],
    );

    const onIpAddressInputChange = React.useCallback(
        (evt: FormEvent) => {
            props.setIpAddress((evt.target as HTMLInputElement).value);
        },
        [props],
    );

    const onMenuItemClickHandler = React.useCallback(
        (event) => {
            props.setIpAddress(event.target.innerText);
        },
        [props],
    );

    const onReaderParamsChange = React.useCallback(
        (params: MainReaderParams) => {
            props.setMainReaderParams(params);
        },
        [props],
    );

    const { auto, address} = props.mainReaderSettings.ip;
    return (
        <>
            <h6 className='bp3-heading'>Настройки главного приёмника</h6>
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
        </>
    );
};

export default ReaderSettings;
