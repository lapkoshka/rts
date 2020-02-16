import React, { FC } from 'react';
import { RaceHistoryViewData, TotalInfoViewData } from '../../../server/view/domains/results';
import { RaceInfoContainer } from '../../components/race-info/race-info-container';
import { RaceHistory } from '../../components/results-info/tabs/history';
import './results.scss';
import { TotalInfo } from '../../components/results-info/tabs/total';
import { Block } from '../../components/ui/block/block';

export interface ResultsViewProps {
    history: RaceHistoryViewData;
    total: TotalInfoViewData;
}

// todo:
//  имя текущего мероприятия
//  данные только о текущем мероприятии
//  момент с отсутствием данных
export const ResultsView: FC<ResultsViewProps> = (props) => {
    return (
        <div className='results-view-layout'>
            Название мероприятия
            <div className='race-view-raceinfo'>
                <Block>
                    <div className='results-view-title'>Текущая гонка</div>
                    <RaceInfoContainer />
                </Block>
            </div>
            <div className='results-view-history'>
                <Block>
                    <div className='results-view-title'>История заездов</div>
                    <RaceHistory history={props.history}/>
                </Block>
            </div>
            <div className='results-view-total'>
                <Block>
                    <div className='results-view-title'>Топ участников</div>
                    <TotalInfo info={props.total}/>
                </Block>
            </div>
        </div>
    );
};
