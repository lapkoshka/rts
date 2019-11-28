import { sleep } from './functions';
import { createFakeTag } from './readers/main-reader.spec';
import { RSSITrace, RSSITraceEvent } from './rssi-trace';
import { RSSITracePoint } from './rssi-trace-point';

const TRACE_FILLING_TIMEOUT = 1000;

describe('rssi-trace methods', () => {
    describe('should be fired onComplete', () => {
        it('with single point', (done) => {
            const tag = createFakeTag('123', 123);
            const trace = new RSSITrace(tag, TRACE_FILLING_TIMEOUT);
            trace.on(RSSITraceEvent.ON_COMPLETE, (tracePoint: RSSITracePoint) => {
                expect(tracePoint.tag).toEqual({
                    uid: '123',
                    rssi: 123,
                });
                done();
            });
            trace.appendPoint(tag);
        });

        it('should be highest rssi value', (done) => {
            const tag = createFakeTag('123', 123);
            const trace = new RSSITrace(tag, TRACE_FILLING_TIMEOUT);
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

        it('should be earlier timestamp if rssi values are equals', async (done) => {
            const tag = createFakeTag('123', 1);
            const trace = new RSSITrace(tag, TRACE_FILLING_TIMEOUT);
            trace.on(RSSITraceEvent.ON_COMPLETE, (tracePoint: RSSITracePoint) => {
                const points = trace.getSortedPoints();
                expect(tracePoint).toBe(points[0]);
                expect(tracePoint.timestamp).toBeLessThanOrEqual(points[1].timestamp);
                done();
            });

            trace.appendPoint(createFakeTag('123', 2));
            await sleep(100);
            trace.appendPoint(createFakeTag('123', 42));
            await sleep(100);
            trace.appendPoint(createFakeTag('123', 2));
            await sleep(100);
            trace.appendPoint(createFakeTag('123', 3));
            await sleep(100);
            trace.appendPoint(createFakeTag('123', 42));
        });
    });

    describe('should raise an exception', () => {
        it('race is completed', async (done) => {
            const tag = createFakeTag('123', 123);
            const trace = new RSSITrace(tag, TRACE_FILLING_TIMEOUT);
            trace.appendPoint(tag);
            await sleep(TRACE_FILLING_TIMEOUT + 100);
            try {
                trace.appendPoint(createFakeTag('123', 321));
            } catch (e) {
                expect(e.message).toMatch('Can\'t append point to completed trace');
                done();
            }
        });

        it('UIDs should be equals', (done) => {
            const tag = createFakeTag('123', 123);
            const trace = new RSSITrace(tag, TRACE_FILLING_TIMEOUT);
            trace.appendPoint(tag);
            try {
                trace.appendPoint(createFakeTag('123456', 321));
            } catch (e) {
                expect(e.message).toMatch('UIDs should be equals');
                done();
            }
        });
    });
});
