import { MenuItem, Button, NumericInput } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import React, { FC, memo, useCallback } from 'react';
import { makeArr } from '../../../../common/helpers';
import {
    MainReaderParams,
} from '../../../../server/lib/readers/main-reader';

interface ReaderParamsProps {
    params: MainReaderParams;
    setMainReaderParams: (params: MainReaderParams) => void;
    setDefaultMainReaderParams: () => void;
}

const SESSION_DEFAULT_VALUES = ['0', '1', '2', '3', '255'];

export const MainReaderParameters: FC<ReaderParamsProps> = memo((props) => {
    const params: MainReaderParams = props.params;
    const onQvalueChange = useCallback(
        (value) => {
            props.setMainReaderParams({
                ...params,
                qvalue: value.toString(),
            });
    },
        [props, params],
    );

    const onScantimeChange = useCallback(
        (value) => {
            props.setMainReaderParams({
                ...params,
                scantime: value.toString(),
            });
    },
        [props, params],
    );

    const onSessionChange = useCallback(
        (value) => {
            props.setMainReaderParams({
                ...params,
                session: value.toString(),
            });
    },
        [props, params],
    );

    const { qvalue, session, scantime } = props.params;
    return (
        <>
            <div className='reader-params-input-group'>
                <span className='reader-params-input-group-label'>qvalue: </span>
                <Select
                    filterable={false}
                    items={makeArr(1, 16)}
                    itemRenderer={(item, { handleClick }) => (
                        <MenuItem
                            key={item}
                            text={item}
                            onClick={handleClick}
                        />
                    )}
                    onItemSelect={onQvalueChange}>
                    <Button text={qvalue} rightIcon='caret-down' />
                </Select>
            </div>

            <div className='reader-params-input-group'>
                <span className='reader-params-input-group-label'>scantime: </span>
                <NumericInput
                    min={1}
                    max={255}
                    value={scantime}
                    placeholder='20'
                    onValueChange={onScantimeChange}
                    style={{width: '64px'}}
                ></NumericInput>
                <span className='reader-params-input-group-label'>* 100ms</span>
            </div>

            <div className='reader-params-input-group'>
                <span className='reader-params-input-group-label'> session: </span>
                <Select
                    filterable={false}
                    items={SESSION_DEFAULT_VALUES}
                    itemRenderer={(item, { handleClick }) => (
                        <MenuItem
                            key={item}
                            text={item}
                            onClick={handleClick}
                        />
                    )}

                    onItemSelect={onSessionChange}>
                    <Button
                        text={session === '255' ? 'AUTO' : session}
                        rightIcon='caret-down'
                    />
                </Select>
            </div>
            <div className='reader-params-input-group'>
                <Button onClick={props.setDefaultMainReaderParams}>По-умолчанию</Button>
            </div>
        </>
    );
});

