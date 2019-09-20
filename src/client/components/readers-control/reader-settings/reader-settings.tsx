import { Drawer, Switch, Input, Form, Select, Button } from 'antd';
import React from 'react';
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
const ReaderSettings: React.FC<ReaderSettingsProps> = (props) => (
    <Drawer
        title='Настройки главного приемника'
        placement='left'
        closable={true}
        visible={props.shouldShowPopup}
        onClose={() => props.showMainReaderSettings(false)}
        width='512px'
    >
        <Form.Item label='IP адрес приёмника'>
            <div className='reader-settings-field-wrapper'>
                <span className='reader-settings-switch-label'>Определять автоматически</span>
                <Switch defaultChecked onChange={props.setIpAuto}/>
            </div>
            <Input
                placeholder='0.0.0.0'
                style={{ width: '128px' }}
                disabled={props.settings.ip.auto}
                defaultValue={props.settings.ip.address}
                onChange={({target: { value}}) => props.setIpAddress(value)}
            />
        </Form.Item>

        <ReaderParams
            params={props.settings.params}
            onChange={(params: MainReaderParams) => props.setMainReaderParams(params)}
            onSetDefault={props.setDefaultMainReaderParams}
        />
    </Drawer>
);

export default ReaderSettings;
