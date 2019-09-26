import { Intent, Toaster } from '@blueprintjs/core';

interface Notification {
    error: (msg: string) => void;
    warn: (msg: string, timeout: number) => void;
}

const Notification: Notification = {
    error: (msg: string) => {
        Toaster.create().show({
            icon: 'warning-sign',
            intent: Intent.DANGER,
            message: msg,
        });
    },
    warn: (msg: string, timeout: number) => {
        Toaster.create().show({
            icon: 'warning-sign',
            intent: Intent.WARNING,
            message: msg,
            timeout,
        });
    },
};

export default Notification;
