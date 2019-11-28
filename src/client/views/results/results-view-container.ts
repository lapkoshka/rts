import { connect } from 'react-redux';
import { RootState } from '../../store';
import { ResultsView, ResultsViewProps } from './results';

const mapStateToProps = (state: RootState): ResultsViewProps => ({
    history: state.resultsInfo.history,
    total: state.resultsInfo.total,
});

export const ResultsViewContainer = connect(mapStateToProps)(ResultsView);
