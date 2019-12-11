import { dbMorda } from '../../modules/database/database';
import { EventData } from './events';

export const getEventList = async (): Promise<EventData[]> => {
    return await dbMorda.events.get();
}
