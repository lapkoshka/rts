import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getIpcRenderer } from '../../../common/ipc';
import { IPC_CONTESTS } from '../../../server/ipc/ipc-events';
import { ContestFormData } from '../../../server/modules/database/tables/contests';
import { ContestData } from '../../../server/view-data/contests/contests';
import { RootState, store } from '../../store';
import { setContestList, setSelectedContest} from '../../store/contest-info';
import { Contest, ContestActions, ContestProps } from './contest';
import { selectContest } from './selectors';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): ContestProps => ({
    list: state.contestInfo.contestList,
    selectedContest: selectContest(state.contestInfo.contestList, state.contestInfo.selectedContest),
});

const mapDispatchToProps = (dispatch: Dispatch): ContestActions => ({
    onContestCreate: () => {
        ipc.send(IPC_CONTESTS.CREATE);
    },
    onContestSettingsChange: (data: ContestFormData) => {
        ipc.send(IPC_CONTESTS.SETTINGS_CHANGE, data);
    },
    onContestSelect: (id: number) => {
        dispatch(setSelectedContest(id));
    }
});

const { dispatch } = store;
ipc.on(IPC_CONTESTS.LIST, (_, list: ContestData[]) => {
    dispatch(setContestList(list));
});


export const ContestContainer = connect(mapStateToProps, mapDispatchToProps)(Contest);
