import { RFIDTag } from './readers/base-reader';
import { RSSITracePoint } from './rssi-trace-point';
import { EventEmitter } from 'events';

export const TRACE_FILLING_TIMEOUT = 1000;

export enum RSSITraceEvent {
    ON_COMPLETE = 'onComplete',
}

export class RSSITrace extends EventEmitter {
    public completed: boolean;
    private tag: RFIDTag;
    private points: RSSITracePoint[];
    private traceFillingTimeout: number;

    constructor(tag: RFIDTag, timeout: number) {
        super();
        this.tag = tag;
        this.points = [];
        this.completed = false;
        this.traceFillingTimeout = timeout;
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

    public getSortedPoints(): RSSITracePoint[] {
    /* We have to point out that array already sorted by timestamp. */
        return this.points
            .map((x: RSSITracePoint) => x)
            .sort((a: RSSITracePoint, b: RSSITracePoint) =>
                b.tag.rssi - a.tag.rssi);
    }

    public getHighestPoint(): RSSITracePoint {
        /**
         * If serveral points have equal rssi values,
         * then the earliest point is the highest one.
         */
        return this.getSortedPoints()[0];
    }

    private openTraceFilling(autoclose = true): void {
        if (autoclose) {
            setTimeout(() => {
                this.completed = true;
                this.emit(RSSITraceEvent.ON_COMPLETE, this.getHighestPoint());
            }, this.traceFillingTimeout);
        }
    }
}
