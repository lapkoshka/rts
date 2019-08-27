import { RFIDTag } from '../../../lib/readers/base-reader';
import RSSITrace, { RSSITraceEvent } from '../../../lib/rssi-trace';
import RSSITracePoint from '../../../lib/rssi-trace-point';
import { UserData } from '../../database/database';

class Lap {
    public onStart: (tracePoint: RSSITracePoint) => void;
    public onFinish: (user: UserData, time: number) => void;
    private user: UserData;
    private startTrace: RSSITrace;
    private finishTrace: RSSITrace;

    constructor(user: UserData) {
        this.user = user;
        this.startTrace = undefined;
        this.finishTrace = undefined;
        this.onStart = undefined;
        this.onFinish = undefined;
    }

    public appendTag(tag: RFIDTag): void {
        if (!this.startTrace) {
            this.startTrace = new RSSITrace(tag);
            this.startTrace
                .on(RSSITraceEvent.ON_COMPLETE, (tracePoint: RSSITracePoint) => {
                    if (this.onStart) {
                        this.onStart(tracePoint);
                    }
                });
        }

        if (!this.startTrace.completed) {
            this.startTrace.appendPoint(tag);
            return;
        }

        if (!this.finishTrace) {
            this.finishTrace = new RSSITrace(tag);
            this.finishTrace
                .on(RSSITraceEvent.ON_COMPLETE, () => {
                    if (this.onFinish) {
                        this.onFinish(this.user, this.getTotalTime());
                    }
                });
        }

        if (!this.finishTrace.completed) {
            this.finishTrace.appendPoint(tag);
            return;
        }
    }

    private getTotalTime(): number {
        const highestStart = this.startTrace.getHighestPoint();
        const highestFinish = this.finishTrace.getHighestPoint();
        return highestFinish.timestamp - highestStart.timestamp;
    }
}

export default Lap;

