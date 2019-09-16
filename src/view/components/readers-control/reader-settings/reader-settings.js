import { Drawer, Switch, Input, Form } from 'antd';
import Block from '../../ui/block/block';
import React from 'react';
import './reader-settings.scss';

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
            <div>
                <span className='reader-settings-ip-switch-label'>Определять автоматически</span>
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
    </Drawer>
);

export default ReaderSettings;
