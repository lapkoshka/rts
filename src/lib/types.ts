export interface User {
    uid: string;
    firstname?: string;
    lastname?: string;
    alreadyRegistred: boolean;
}

export interface Race {
    uid: string;
    time: number;
}

export interface RFIDTag {
    uid: string;
    rssi?: string;
}
