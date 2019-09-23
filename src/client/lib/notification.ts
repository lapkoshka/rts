import { Intent, Toaster } from '@blueprintjs/core';

interface Notification {
    error: (msg: string) => void;
}

const Notification: Notification = {
    error: (msg: string) => {
        Toaster.create().show({
            icon: 'warning-sign',
            intent: Intent.DANGER,
            message: msg,
        });
    },
};

export default Notification;
