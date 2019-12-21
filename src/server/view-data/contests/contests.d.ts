import { bool } from '../../../common/types';

export interface ContestData {
    id: number;
    name: string;
    description: string;
    laps: number;
    started_flag: bool;
    finished_flag: bool;
    start_time: number;
    finish_time: number;
}
