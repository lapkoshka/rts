import { Icon, Popconfirm } from 'antd';
import React from 'react';

const renderDeleteButton = (title, callback) => (
    <Popconfirm
        title={title}
        onConfirm={callback}
        okText='Да'
        cancelText='Нет'
    >
        <Icon type='delete'/>
    </Popconfirm>
);

export default renderDeleteButton;
