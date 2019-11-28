import { Icon, Popconfirm } from 'antd';
import React from 'react';

export const renderDeleteButton = (title: string, callback: () => void) => (
    <Popconfirm
        title={title}
        onConfirm={callback}
        okText='Да'
        cancelText='Нет'
    >
        <Icon type='delete'/>
    </Popconfirm>
);
