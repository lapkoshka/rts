// i dont like placement of this module

export interface User {
    uid: string;
    firstname?: string;
    lastname?: string;
    alreadyRegistred: boolean;
}

export interface Race {
    firstname: string;
    lastname: string;
    besttime: number;
    count: number;
}

export interface RFIDTag {
    uid: string;
    rssi: number;
}
