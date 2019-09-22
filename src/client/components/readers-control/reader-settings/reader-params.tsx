import { MenuItem, Button, NumericInput } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import React from 'react';
import { createRange } from '../../../../common/helpers';
import {
    MainReaderParams,
} from '../../../../server/lib/readers/main-reader';

interface ReaderParamsProps {
    params: MainReaderParams;
    onChange: (params: MainReaderParams) => void;
    onSetDefault: () => void;
}

const ReaderParams: React.FC<ReaderParamsProps> = (props) => {
    const params: MainReaderParams = props.params;
    const onQvalueChange = React.useCallback((value) => {
        props.onChange({
            ...params,
            qvalue: value.toString(),
        });
    }, [params]);

    const onScantimeChange = React.useCallback((value) => {
        props.onChange({
            ...params,
            scantime: value.toString(),
        });
    }, [params]);

    const onSessionChange = React.useCallback((value) => {
        props.onChange({
            ...params,
            session: value.toString(),
        });
    }, [params]);

    return (
        <>
            <div className='reader-params-input-group'>
                <span className='reader-params-input-group-label'>qvalue: </span>
                <Select
                    filterable={false}
                    items={createRange(1, 15)}
                    itemRenderer={(item, { handleClick }) => (
                        <MenuItem
                            key={item}
                            text={item}
                            onClick={handleClick}
                        />
                    )}
                    onItemSelect={onQvalueChange}>
                    <Button text={props.params.qvalue} rightIcon='caret-down' />
                </Select>
            </div>

            <div className='reader-params-input-group'>
                <span className='reader-params-input-group-label'>scantime: </span>
                <NumericInput
                    min={1}
                    max={255}
                    value={props.params.scantime}
                    placeholder='20'
                    onValueChange={onScantimeChange}
                    style={{width: '64px'}}
                ></NumericInput>
                <span className='reader-params-input-group-label'>* 100ms</span>
            </div>

            <div className='reader-params-input-group'>
                <span className='reader-params-input-group-label'> session: </span>
                <Select
                    items={['0', '1', '2', '3', '255']}
                    itemRenderer={(item, { handleClick }) => (
                        <MenuItem
                            key={item}
                            text={item}
                            onClick={handleClick}
                        />
                    )}
                    onItemSelect={onSessionChange}>
                    <Button
                        text={props.params.session === '255' ? 'AUTO' : props.params.session}
                        rightIcon='caret-down'
                    />
                </Select>
            </div>
            <div className='reader-params-input-group'>
                <Button onClick={props.onSetDefault}>По-умолчанию</Button>
            </div>
        </>
    );
};

export default ReaderParams;

