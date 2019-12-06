import { connect } from 'react-redux';
// import { Dispatch } from 'redux';
// import { RootState } from '../../store';
// import { Events, EventsActions, EventsProps } from './events';
import { Events } from './events';


// const mapStateToProps = (state: RootState): EventsProps => ({
//
// });
//
// const mapDispatchToProps = (dispatch: Dispatch): EventsActions => ({
//
// });
//
// export const EventsContainer = connect(mapStateToProps, mapDispatchToProps)(Events);
export const EventsContainer = connect((state) => state)(Events);
