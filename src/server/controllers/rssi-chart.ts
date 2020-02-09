import { IPC_RSSI_CHART } from '../databus/ipc/events';
import { READER_EVENT, RFIDTag } from '../lib/readers/base-reader';
import { IpcRoot } from '../databus/ipc/root';
import { performance } from 'perf_hooks';
import { MainReader } from '../lib/readers/main-reader';

export interface ChartEnableInfo {
    enable: boolean;
    uid: string;
}
interface RSSIChartPoint {
    x: string;
    y: number;
}

export type RSSIChartTrace = RSSIChartPoint[];

const cutTrace = (trace: RSSIChartTrace): void => {
    if (trace.length > 50) {
        trace.shift();
    }
};

const getPoint = (tag: RFIDTag): RSSIChartPoint => ({
    x: performance.now().toString().split('.')[0],
    y: tag.rssi,
});

const trace: RSSIChartTrace = [];
const enableInfo: ChartEnableInfo = {
    enable: false,
    uid: '-',
};

export const initRSSIController = (mReader: MainReader) => {
    IpcRoot.on<ChartEnableInfo>(IPC_RSSI_CHART.ENABLE, (info) => {
        enableInfo.enable = info.enable;
        enableInfo.uid = info.uid;
    });

    mReader.on(READER_EVENT.TAG, (tag: RFIDTag) => {
        if (!enableInfo.enable || enableInfo.uid !== tag.uid) {
            return;
        }

        cutTrace(trace);
        const point = getPoint(tag);
        trace.push(point);

        IpcRoot.send<RSSIChartTrace>(IPC_RSSI_CHART.DATA, trace);
    });
};
