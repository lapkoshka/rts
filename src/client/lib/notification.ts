import { Intent, Toaster } from '@blueprintjs/core';

interface Notification {
    [key: string]: (msg: string, timeout: number) => void;
}

export const Notification: Notification = {
    error: (msg: string, timeout = 2000) => {
        Toaster.create().show({
            icon: 'warning-sign',
            intent: Intent.DANGER,
            message: msg,
            timeout,
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
    success: (msg: string, timeout: number) => {
        Toaster.create().show({
            icon: 'warning-sign',
            intent: Intent.SUCCESS,
            message: msg,
            timeout,
        });
    },
};
