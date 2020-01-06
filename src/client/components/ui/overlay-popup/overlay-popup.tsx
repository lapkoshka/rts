import { Overlay } from '@blueprintjs/core';
import React, { FC } from 'react';
import styles from './overlay-popup.module.css';

interface OverlayPopupProps {
    isOpen: boolean;
    onClose: VoidFunction;
    title?: string;
}

export const OverlayPopup: FC<OverlayPopupProps> = (props) => (
    <Overlay
        isOpen={props.isOpen}
        onClose={props.onClose}
    >
        <div className={styles.overlay}>
              <div className={styles.popup}>
                  {
                      props.title ? (
                          <h2>{props.title}</h2>
                      ) : null
                  }
                {props.children}
            </div>
        </div>
    </Overlay>
)
