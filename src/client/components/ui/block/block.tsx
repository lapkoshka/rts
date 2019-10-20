import React from 'react';
import './block.scss';

interface UIBlock {
    visible?: boolean;
}

const Block: React.FC<UIBlock> = (props) => {
    const isVisible = props.visible === undefined || props.visible === true;
    return (
        <div className={`ui-block${isVisible ? '' : '-hide'}`}>
            {props.children}
        </div>
    );
};

export default Block;
