import React, { FC } from 'react';
import { RaceHistory } from '../../../server/controllers/results/history';
import { TotalInfo } from '../../../server/controllers/results/total';
import { RaceInfoContainer } from '../../components/race-info/race-info-container';
import { renderRaceHistory } from '../../components/results-info/tabs/history';
import './results.scss';
import { renderTotalInfo } from '../../components/results-info/tabs/total';
import { Block } from '../../components/ui/block/block';

export interface ResultsViewProps {
    history: RaceHistory;
    total: TotalInfo;
}

export const ResultsView: FC<ResultsViewProps> = (props) => {
    return (
        <div className='results-view-layout'>
            <div className='race-view-raceinfo'>
                <Block>
                    <div className='results-view-title'>Текущая гонка</div>
                    <RaceInfoContainer />
                </Block>
            </div>
            <div className='results-view-history'>
                <Block>
                    <div className='results-view-title'>История заездов</div>
                    { renderRaceHistory(props.history) }
                </Block>
            </div>
            <div className='results-view-total'>
                <Block>
                    <div className='results-view-title'>Топ участников</div>
                    { renderTotalInfo(props.total) }
                </Block>
            </div>
        </div>
    );
};
