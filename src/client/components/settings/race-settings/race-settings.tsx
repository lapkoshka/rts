import { Button, NumberRange, NumericInput, RangeSlider } from '@blueprintjs/core';
import React, { FC, memo, useCallback } from 'react';
import { RaceParams } from '../../../../server/lib/domain/race';

export interface RaceSettingsProps {
    setRaceParams: (params: RaceParams) => void;
    raceParams: RaceParams;
    applyRaceParams: (params: RaceParams) => void;
}

export const RaceSettings: FC<RaceSettingsProps> = memo((props) => {
    const handleSliderValueChange = useCallback(
        (value: NumberRange) => {
            props.setRaceParams({
                ...props.raceParams,
                rssiFilter: value,
            });
        },
    [props],
    );

    const handleRSSITimeoutChange = useCallback(
        (value: number) => {
            props.setRaceParams({
                ...props.raceParams,
                rssiTraceTimeout: value,
            });
        },
        [props],
    );

    const handleMaxLapsChange = useCallback(
        (value: number) => {
            props.setRaceParams({
                ...props.raceParams,
                maxLaps: value,
            });
        },
        [props],
    );

    const onApplyClick = useCallback(
        () => {
            props.applyRaceParams(props.raceParams);
        },
        [props],
    );
    return (
      <>
          <span>Количество кругов</span>
          <NumericInput
              value={props.raceParams.maxLaps}
              placeholder='2'
              onValueChange={handleMaxLapsChange}
              style={{width: '64px'}}
          ></NumericInput>
          <span>Захват меток по уровню сигнала</span>
          <RangeSlider
              min={0}
              max={80}
              stepSize={5}
              labelStepSize={20}
              onChange={handleSliderValueChange}
              value={props.raceParams.rssiFilter}
              vertical={false}
          />
          <span>Ширина RSSI-Trace</span>
          <NumericInput
              value={props.raceParams.rssiTraceTimeout}
              placeholder='1000'
              onValueChange={handleRSSITimeoutChange}
              style={{width: '64px'}}
          ></NumericInput>
          <div className='race-params-input-group'>
              <Button onClick={onApplyClick}>Применить</Button>
          </div>
      </>
    );
});
