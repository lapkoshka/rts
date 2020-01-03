export enum IPC_APP {
    START = 'ipc/AppStart',
    VIEW_DID_MOUNT = 'ipc/App/ViewDidMount',
    FAKE_MAIN_TAG = 'ipc/App/FakeMainTag',
    FAKE_PORTABLE_TAG = 'ipc/App/FakePortableTag',
}

export enum IPC_MAIN_READER {
    STATUS_CHANGE = 'ipc/MainReader/OnStatusChange',
    ERROR = 'ipc/MainReader/Error',
    DISCONNECT = 'ipc/MainReader/Disconnect',
    IP_RECIEVED = 'ipc/MainReader/IpRecieved',
    TAG = 'ipc/MainReader/Tag',
    TRIGGER_CLICK = 'ipc/MainReader/TriggerClick',
}

export enum IPC_PORTABLE_READER {
    STATUS_CHANGE = 'ipc/PortableReader/OnStatusChange',
    ERROR = 'ipc/PortableReader/Error',
    DISCONNECT = 'ipc/PortableReader/Disconnect',
    IP_RECIEVED = 'ipc/PortableReader/IpRecieved',
    TAG = 'ipc/PortableReader/Tag',
    TRIGGER_CLICK = 'ipc/PortableReader/TriggerClick',
}

export enum IPC_RACE {
    CURRENT_RACES_CHANGED = 'ipc/Race/CurrentRacesChanged',
    UPDATE_RACE_PARAMS = 'ipc/Race/UpdateRaceParams',
    ON_CLOSE_RACE = 'ipc/Race/OnCloseRace',
}

export enum IPC_REGISTRATION {
    CANCEL = 'ipc/Registration/Cancel',
    SUBMIT = 'ipc/Registration/Submit',
}

export enum IPC_RESULTS {
    USERS_DATA_UPDATE = 'ipc/Results/UserDataUpdate',
    TOTAL_INFO_UPDATE = 'ipc/Results/TotalInfoUpdate',
    RACE_HISTORY_UPDATE = 'ipc/Results/RaceHistoryUpdate',
    ON_RACE_DELETE = 'ipc/Results/OnRaceDelete',
    ON_USER_DELETE = 'ipc/Results/OnUserDelete',
}

export enum IPC_RSSI_CHART {
    DATA = 'ipc/RssiChartData',
    ENABLE = 'ipc/RssiEnable',
}

export enum IPC_CONTESTS {
    CREATE = 'ipc/Contest/Create',
    LIST = 'ipc/Contest/List',
    SETTINGS_CHANGE = 'ipc/Contests/SettingsChange',
}
