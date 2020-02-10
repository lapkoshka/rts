import { ContestViewUpdater } from './domains/contests';
import { RaceViewUpdater } from './domains/race';
import { ResultsViewUpdater } from './domains/results';

export class View {
    public static contests = ContestViewUpdater;
    public static race = RaceViewUpdater;
    public static results = ResultsViewUpdater;
}
