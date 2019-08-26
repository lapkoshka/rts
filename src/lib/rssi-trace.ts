import RSSITracePoint from './rssi-trace-point';
import { RFIDTag } from './types';
import * as EventEmitter from 'events';

export const TRACE_FILLING_TIMEOUT = 3000;

export enum RSSITraceEvent {
    ON_COMPLETE = 'onComplete',
}

class RSSITrace extends EventEmitter {
    public completed: boolean;
    private tag: RFIDTag;
    private points: RSSITracePoint[];

    constructor(tag: RFIDTag) {
        super();
        this.tag = tag;
        this.points = [];
        this.completed = false;
    }

    public appendPoint(tag: RFIDTag): void {
        if (this.completed) {
            throw Error('Can\'t append point to completed trace');
        }

        if (this.tag.uid !== tag.uid) {
            throw Error('UIDs should be equals');
        }

        if (this.points.length === 0) {
            this.openTraceFilling();
        }

        this.points.push(new RSSITracePoint(tag));
    }

    public getHighestPoint(): RSSITracePoint {
        // TODO: if has a several points with equal rssi value, then take by timestamp
        // TODO: bug, sort mutate source array
        return this.points.sort((a: RSSITracePoint, b: RSSITracePoint) =>
            b.tag.rssi - a.tag.rssi)[0];
    }

    private openTraceFilling(autoclose: boolean = true): void {
        if (autoclose) {
            setTimeout(() => {
                this.completed = true;
                this.emit(RSSITraceEvent.ON_COMPLETE, this.getHighestPoint());
            }, TRACE_FILLING_TIMEOUT);
        }
    }
}

export default RSSITrace;
