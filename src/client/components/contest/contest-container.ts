import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getIpcRenderer } from '../../../common/ipc';
import { IPC_CONTESTS } from '../../../server/ipc/ipc-events';
import { ContestData } from '../../../server/view-data/contests/contests';
import { RootState, store } from '../../store';
import { setContestList } from '../../store/contest-info';
import { Contest, ContestActions, ContestProps } from './contest';
const ipc = getIpcRenderer();

const mapStateToProps = (state: RootState): ContestProps => ({
    list: state.contestInfo.contestList,
});

const mapDispatchToProps = (dispatch: Dispatch): ContestActions => ({
    onContestCreate: () => {
        ipc.send(IPC_CONTESTS.CREATE);
    },
});

const { dispatch } = store;
ipc.on(IPC_CONTESTS.LIST, (_, list: ContestData[]) => {
    dispatch(setContestList(list));
});


export const ContestContainer = connect(mapStateToProps, mapDispatchToProps)(Contest);
