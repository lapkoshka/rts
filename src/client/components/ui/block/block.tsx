import React, { FC } from 'react';
import './block.scss';

interface UIBlock {
    visible?: boolean;
}

export const Block: FC<UIBlock> = (props) => {
    const isVisible = props.visible === undefined || props.visible === true;
    return (
        <div className={`ui-block${isVisible ? '' : '-hide'}`}>
            {props.children}
        </div>
    );
};


