import { IPC_RSSI_CHART } from '../databus/ipc/events';
import { READER_EVENT, RFIDTag } from '../lib/readers/base-reader';
import { IpcRoot } from '../databus/ipc/root';
import { mainReader } from '../modules/readers/main-reader';
import { performance } from 'perf_hooks';

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

export const initRSSIController = () => {
    IpcRoot.on<ChartEnableInfo>(IPC_RSSI_CHART.ENABLE, (info) => {
        enableInfo.enable = info.enable;
        enableInfo.uid = info.uid;
    });

    mainReader.on(READER_EVENT.TAG, (tag: RFIDTag) => {
        if (!enableInfo.enable || enableInfo.uid !== tag.uid) {
            return;
        }

        cutTrace(trace);
        const point = getPoint(tag);
        trace.push(point);

        IpcRoot.send<RSSIChartTrace>(IPC_RSSI_CHART.DATA, trace);
    });
};
