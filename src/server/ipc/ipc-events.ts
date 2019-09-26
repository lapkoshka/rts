export enum IPC_APP {
    START = 'ipcAppStart',
    VIEW_DID_MOUNT = 'ipcAppViewDidMount',
    FAKE_MAIN_TAG = 'ipcAppFakeMainTag',
    FAKE_PORTABLE_TAG = 'ipcAppFakePortableTag',
}

export enum IPC_MAIN_READER {
    STATUS_CHANGE = 'ipcMainReaderOnStatusChange',
    ERROR = 'ipcMainReaderError',
    DISCONNECT = 'ipcMainReaderDisconnect',
    IP_RECIEVED = 'ipcMainReaderIpRecieved',
    TAG = 'ipcMainReaderTag',
    TRIGGER_CLICK = 'ipcMainReaderTriggerClick',
}

export enum IPC_PORTABLE_READER {
    STATUS_CHANGE = 'ipcPortableReaderOnStatusChange',
    ERROR = 'ipcPortableReaderError',
    DISCONNECT = 'ipcPortableReaderDisconnect',
    IP_RECIEVED = 'ipcPortableReaderIpRecieved',
    TAG = 'ipcPortableReaderTag',
    TRIGGER_CLICK = 'ipcPortableReaderTriggerClick',
}

export enum IPC_RACE {
    CURRENT_RACES_CHANGED = 'ipcRaceCurrentRacesChanged',
}

export enum IPC_REGISTRATION {
    CANCEL = 'ipcRegistrationCancel',
    SUBMIT = 'ipcRegistrationSubmit',
}

export enum IPC_RESULTS {
    USERS_DATA_UPDATE = 'ipcResultsUserDataUpdate',
    TOTAL_INFO_UPDATE = 'ipcResultsTotalInfoUpdate',
    RACE_HISTORY_UPDATE = 'ipcResultsRaceHistoryUpdate',
}
