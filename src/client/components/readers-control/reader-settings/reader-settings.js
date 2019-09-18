import {Drawer, Switch, Input, Form, Select, Button} from 'antd';
import React from 'react';
import './reader-settings.scss';

const createRange = (from, size) => Array.from(Array(size)).map((_, i) => i + from);

const ReaderParams = props => {
    // TODO: import parameters from main-reader.ts
    const params = { ...props.params };
    const handleChange = (key, value) => {
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
            {fields.map(({ key, options}, fIndex) => (
                <div
                    className='reader-settings-select-wrapper'
                    key={fIndex}
                >
                    <div className='reader-settings-select-label'>{key}:</div>
                    <Select
                        defaultValue={props.params[key]}
                        style={{ width: 120 }}
                        onChange={value => handleChange(key, value)}
                    >
                    {options.map((i, index) => (
                        <Select.Option key={index} value={i}>{i}</Select.Option>
                    ))}
                    </Select>
                    {key === 'scantime' ? (
                        <div className='reader-settings-scantime-label'>*100ms</div>
                    ) : null}
                </div>
            ))}
            <Button onClick={props.onSetDefault}>Вернуть на значения по-умолчанию</Button>
        </Form.Item>
    );
};

const ReaderSettings = props => (
    <Drawer
        title='Настройки главного приемника'
        placement='left'
        closable={true}
        visible={props.settings.shouldShowPopup}
        onClose={() => props.actions.showMainReaderSettings(false)}
        width='512px'
    >
        <Form.Item label='IP адрес приёмника'>
            <div className='reader-settings-field-wrapper'>
                <span className='reader-settings-switch-label'>Определять автоматически</span>
                <Switch defaultChecked onChange={props.actions.setIpAuto}/>
            </div>
            <Input
                placeholder='0.0.0.0'
                style={{ width: '128px' }}
                disabled={props.settings.ip.auto}
                defaultValue={props.settings.ip.address}
                onChange={({target: { value}}) => props.actions.setIpAddress(value)}
            />
        </Form.Item>

        <ReaderParams
            params={props.settings.params}
            onChange={params => props.actions.setMainReaderParams(params)}
            onSetDefault={props.actions.setDefaultMainReaderParams}
        />
    </Drawer>
);

export default ReaderSettings;
