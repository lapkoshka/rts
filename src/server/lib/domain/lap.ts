import * as EventEmitter from 'events';
import { RFIDTag } from '../readers/base-reader';
import RSSITrace, { RSSITraceEvent } from '../rssi-trace';

export enum LAP_EVENT {
    ON_START = 'onLapStart',
    ON_FINISH = 'onLapFinish',
}

class Lap extends EventEmitter {
    public startTrace: RSSITrace;
    public finishTrace: RSSITrace;
    private traceTimeout: number;

    constructor(traceTimeout: number) {
        super();
        this.startTrace = undefined;
        this.finishTrace = undefined;
        this.traceTimeout = traceTimeout;
    }

    public appendTag(tag: RFIDTag): void {
        if (!this.startTrace) {
            this.startTrace = new RSSITrace(tag, this.traceTimeout);
            this.startTrace
                .on(RSSITraceEvent.ON_COMPLETE, () => {
                    this.emit(LAP_EVENT.ON_START, this);
                });
        }

        if (!this.startTrace.completed) {
            this.startTrace.appendPoint(tag);
            return;
        }

        if (!this.finishTrace) {
            this.finishTrace = new RSSITrace(tag, this.traceTimeout);
            this.finishTrace
                .on(RSSITraceEvent.ON_COMPLETE, () => {
                    this.emit(LAP_EVENT.ON_FINISH, this);
                });
        }

        if (!this.finishTrace.completed) {
            this.finishTrace.appendPoint(tag);
            return;
        }
    }

    public getTotalTime(): number {
        const highestStart = this.startTrace.getHighestPoint();
        const highestFinish = this.finishTrace.getHighestPoint();
        return highestFinish.timestamp - highestStart.timestamp;
    }

    public isCompleted(): boolean {
        return this.finishTrace && this.finishTrace.completed;
    }
}

export default Lap;
