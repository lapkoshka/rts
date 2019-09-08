import React from 'react';
import styles from './style.scss';
import Block from '../ui/block';

const ReaderButton = props => (
  <div className="reader-button" onClick={props.onClick}>
    <div className={`reader-button-status reader-button-status-${props.status}`}></div>
    <span className="reader-title">{props.name}</span>
  </div>
);

const ReaderControl = props => (
  <Block>
    <div className="readers-buttons">
      <ReaderButton
        name="Главный считыватель"
        status={props.main.status}
        onClick={props.triggerMainReader}/>

      <ReaderButton
        name="Портативный считыватель"
        status={props.portable.status}
        onClick={props.triggerPortableReader}/>
    </div>
  </Block>
);

export default ReaderControl;
