import { RFIDTag } from '../../../lib/readers/base-reader';
import RSSITrace, { RSSITraceEvent } from '../../../lib/rssi-trace';
import { UserData } from '../../database/database';

class Lap {
    public onStart: (lap: this) => void;
    public onFinish: (lap: this) => void;
    public user: UserData;
    public startTrace: RSSITrace;
    public finishTrace: RSSITrace;

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
                .on(RSSITraceEvent.ON_COMPLETE, () => {
                    if (this.onStart) {
                        this.onStart(this);
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
                        this.onFinish(this);
                    }
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
}

export default Lap;

