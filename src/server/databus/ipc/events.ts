export enum IPC_APP {
    START = 'ipc/app/start',
    VIEW_DID_MOUNT = 'ipc/app/view_did_mount',
    FAKE_MAIN_TAG = 'ipc/app/fake_main_tag',
    FAKE_PORTABLE_TAG = 'ipc/app/fake_portable_tag',
}

export enum IPC_MAIN_READER {
    STATUS_CHANGE = 'ipc/main_reader/status_change',
    ERROR = 'ipc/main_reader/error',
    DISCONNECT = 'ipc/main_reader/disconnect',
    IP_RECIEVED = 'ipc/main_reader/ip_recieved',
    TAG = 'ipc/main_reader/tag',
    TRIGGER_CLICK = 'ipc/main_reader/trigger_click',
}

export enum IPC_PORTABLE_READER {
    STATUS_CHANGE = 'ipc/portable_reader/status_change',
    ERROR = 'ipc/portable_reader/error',
    DISCONNECT = 'ipc/portable_reader/disconnect',
    IP_RECIEVED = 'ipc/portable_reader/ip_recieved',
    TAG = 'ipc/portable_reader/tag',
    TRIGGER_CLICK = 'ipc/portable_reader/trigger_click',
}

export enum IPC_RACE {
    CURRENT_RACES_CHANGED = 'ipc/race/current_races_changed',
    UPDATE_RACE_PARAMS = 'ipc/race/update_race_params',
    ON_CLOSE_RACE = 'ipc/race/on_close_race',
}

export enum IPC_REGISTRATION {
    CANCEL = 'ipc/registration/cancel',
    SUBMIT = 'ipc/registration/submit',
    ATTACH_USER = 'ipc/registration/attach_user',
    DEATTACH_TAG = 'ipc/registration/deattach_tag',
    DEATTACH_CONTEST = 'ipc/registration/deattach_contest',
}

export enum IPC_RESULTS {
    USERS_DATA_UPDATE = 'ipc/results/user_data_update',
    TOTAL_INFO_UPDATE = 'ipc/results/total_info_update',
    RACE_HISTORY_UPDATE = 'ipc/results/race_history_update',
    CURRENT_USERS_DATA_UPDATE = 'ipc/results/user_data_update',
    CURRENT_TOTAL_INFO_UPDATE = 'ipc/results/total_info_update',
    CURRENT_RACE_HISTORY_UPDATE = 'ipc/results/current_race_history_update',
    ON_RACE_DELETE = 'ipc/results/on_race_delete',
}

export enum IPC_RSSI_CHART {
    DATA = 'ipc/rssi_chart/data',
    ENABLE = 'ipc/rssi_chart/enable',
}

export enum IPC_CONTESTS {
    CREATE = 'ipc/contests/create',
    LIST = 'ipc/contests/list',
    SETTINGS_CHANGE = 'ipc/contests/settings_change',
    CONTEST_CREATED = 'ipc/contests/contest_created',
    DELETE = 'ipc/contests/delete',
    ON_CONTEST_DELETED = 'ipc/contests/on_contest_deleted',
    START = 'ipc/contests/start',
    CLOSE = 'ipc/contests/close',
    START_ERROR = 'ipc/contests/start_error',
    SET_SELECTED_CONTEST = 'ipc/contests/set_selected_contest',
    SELECTED_CONTEST_ID = 'ipc/contests/selected_contest_id'
}
