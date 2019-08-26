import { RFIDTag } from './types';

class RSSITracePoint {
    public tag: RFIDTag;
    public timestamp: number;

    constructor(tag: RFIDTag) {
        this.tag = tag;
        this.timestamp = new Date().valueOf();
    }
}

export default RSSITracePoint;
