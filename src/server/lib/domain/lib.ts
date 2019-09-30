import { RFIDTag } from '../readers/base-reader';

export const shouldAppendTag = (tag: RFIDTag, filter: [number, number]): boolean => {
    const { rssi } = tag;
    const [min, max] = filter;
    return rssi >= min && rssi <= max;
};
