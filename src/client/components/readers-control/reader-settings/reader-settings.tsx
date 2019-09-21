import { Form, Select } from 'antd';
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
    defaultMainReaderSettings,
    MainReaderParams,
    MainReaderSettings,
} from '../../../../server/lib/readers/main-reader';

const createRange = (from: number, size: number): number[] =>
    Array.from(Array(size)).map((_, i) => i + from);

interface ReaderParamsProps {
    params: MainReaderParams;
    onChange: (params: MainReaderParams) => void;
    onSetDefault: () => void;
}

const ReaderParams: React.FC<ReaderParamsProps> = (props) => {
    const params: MainReaderParams = { ...defaultMainReaderSettings.params };
    const handleChange = (key: string, value: string) => {
        // @ts-ignore
        params[key] = value;
        props.onChange(params);
    };

    const fields = [
        {
            key: 'qvalue',
            options: createRange(1, 15),
        },
        {
            key: 'session',
            options: [0, 1, 2, 3, 255],
        },
        {
            key: 'scantime',
            options: createRange(1, 255),
        },
    ];

    return (
        <Form.Item label='Параметры'>
            {fields.map(({ key, options}, fIndex) => {
                // @ts-ignore
                const value = props.params[key];
                return (
                    <div
                        className='reader-settings-select-wrapper'
                        key={fIndex}
                    >
                        <div className='reader-settings-select-label'>{key}:</div>
                        <Select
                            defaultValue={value}
                            style={{ width: 120 }}
                            onChange={(value: string) => handleChange(key, value)}
                        >
                            {options.map((i, index) => (
                                <Select.Option key={index} value={i}>{i}</Select.Option>
                            ))}
                        </Select>
                        {key === 'scantime' ? (
                            <div className='reader-settings-scantime-label'>*100ms</div>
                        ) : null}
                    </div>
                );
            })}
            <Button onClick={props.onSetDefault}>Вернуть на значения по-умолчанию</Button>
        </Form.Item>
    );
};

interface ReaderSettingsProps {
    settings: MainReaderSettings;
    showMainReaderSettings: (enable: boolean) => void;
    setIpAddress: (address: string) => void;
    setIpAuto: (enable: boolean) => void;
    setMainReaderParams: (params: MainReaderParams) => void;
    setDefaultMainReaderParams: () => void;
    shouldShowPopup: boolean;
}

const ReaderSettings: React.FC<ReaderSettingsProps> = (props) => {
    const onMenuItemClickHandler = React.useCallback((event) =>
        props.setIpAddress(event.target.innerText), []);

    return (
        <Drawer
            title='Настройки главного приемника'
            position={Position.LEFT}
            isOpen={props.shouldShowPopup}
            onClose={() => props.showMainReaderSettings(false)}
            size={Drawer.SIZE_SMALL}
        >
            <div className='reader-settings-drawer-content'>
                <Switch
                    checked={props.settings.ip.auto}
                    label='Определять автоматически'
                    onChange={(evt: FormEvent) =>
                        props.setIpAuto((evt.target as HTMLInputElement).checked)}
                />
                <InputGroup
                    disabled={props.settings.ip.auto}
                    value={props.settings.ip.address}
                    placeholder='0.0.0.0'
                    onChange={(evt: FormEvent) =>
                        props.setIpAddress((evt.target as HTMLInputElement).value)}
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
                    onChange={(params: MainReaderParams) => props.setMainReaderParams(params)}
                    onSetDefault={props.setDefaultMainReaderParams}
                />
            </div>
        </Drawer>
    );
};

export default ReaderSettings;
