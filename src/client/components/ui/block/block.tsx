import React from 'react';
import './block.scss';

const Block: React.FC = (props) => (
    <div className='ui-block'>
        {props.children}
    </div>
);

export default Block;
