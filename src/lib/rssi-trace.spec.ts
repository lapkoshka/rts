import { sleep } from './functions';
import { createFakeTag } from './readers/main-reader.spec';
import RSSITrace, { RSSITraceEvent, TRACE_FILLING_TIMEOUT } from './rssi-trace';
import RSSITracePoint from './rssi-trace-point';

describe('rssi-trace methods', () => {
    it('should be fired onComplete with single point', (done) => {
       const tag = createFakeTag('123', 123);
       const trace = new RSSITrace(tag);
       trace.on(RSSITraceEvent.ON_COMPLETE, (tracePoint: RSSITracePoint) => {
           expect(tracePoint.tag).toEqual({
               uid: '123',
               rssi: 123,
           });
           done();
       });
       trace.appendPoint(tag);
    });

    it('should be fired onComplete with highest rssi value', (done) => {
       const tag = createFakeTag('123', 123);
       const trace = new RSSITrace(tag);
       trace.on(RSSITraceEvent.ON_COMPLETE, (tracePoint: RSSITracePoint) => {
           expect(tracePoint.tag).toEqual({
               uid: '123',
               rssi: 124,
           });
           done();
       });
       trace.appendPoint(tag);
       trace.appendPoint(createFakeTag('123', 124));
       trace.appendPoint(createFakeTag('123', 2));
       trace.appendPoint(createFakeTag('123', 99));
    });

    it('should raise an exception that trace is completed', async (done) => {
       const tag = createFakeTag('123', 123);
       const trace = new RSSITrace(tag);
       trace.appendPoint(tag);
       await sleep(TRACE_FILLING_TIMEOUT + 100);
       try {
           trace.appendPoint(createFakeTag('123', 321));
       } catch (e) {
           expect(e.message).toMatch('Can\'t append point to completed trace');
           done();
       }
    });

    it('should raise an exception that UIDs should be equals', (done) => {
        const tag = createFakeTag('123', 123);
        const trace = new RSSITrace(tag);
        trace.appendPoint(tag);
        try {
            trace.appendPoint(createFakeTag('123456', 321));
        } catch (e) {
            expect(e.message).toMatch('UIDs should be equals');
            done();
        }
    });
});
