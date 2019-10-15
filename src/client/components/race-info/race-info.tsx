import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import Block from '../ui/block/block';
import {
  CurrentRaceRow,
  CurrentRaces,
} from '../../../server/controllers/race/race-info-view';
import './race-info.scss';

export interface RaceInfoProps {
  currentRaces: CurrentRaces;
  closeRace: (uid: string) => void;
}

const RaceInfo: React.FC<RaceInfoProps> = (props: RaceInfoProps) => (
    <Block>
        <table className='bp3-html-table bp3-html-table-striped'>
            <thead>
            <tr>
                <th>Имя</th>
                <th>Круг</th>
                <th>Лучшее время</th>
            </tr>
            </thead>
            <tbody>
            {props.currentRaces.map((raceRow: CurrentRaceRow) => (
                <tr key={raceRow.uid}>
                    <td>{raceRow.username}</td>
                    <td>{raceRow.laps}</td>
                    <td>{raceRow.bestlap}</td>
                    <td>
                        <Icon
                            onClick={() => props.closeRace(raceRow.uid)}
                            data-uid={raceRow.uid}
                            className='race-info-close'
                            icon={IconNames.CROSS}
                            iconSize={Icon.SIZE_LARGE}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </Block>
);

export default RaceInfo;
