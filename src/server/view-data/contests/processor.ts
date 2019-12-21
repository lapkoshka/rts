import { dbMorda } from '../../modules/database/database';
import { ContestData } from './contests';

export const getContestList = async (): Promise<ContestData[]> => {
    return await dbMorda.contests.get();
}
