import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React, { FC } from 'react';
import { CurrentRaceRow, CurrentRaces } from '../../../server/view/domains/race';
import './race-info.scss';

export interface RaceInfoProps {
    currentRaces: CurrentRaces;
    closeRace: (uid: string) => void;
}

export const RaceInfo: FC<RaceInfoProps> = (props: RaceInfoProps) => (
    <table className='bp3-html-table bp3-html-table-striped'>
        <thead>
            <tr>
                <th>Имя</th>
                <th>Круг</th>
                <th>Лучший круг</th>
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
);
