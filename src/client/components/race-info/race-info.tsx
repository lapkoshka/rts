import { Table } from 'antd';
import React from 'react';
import Block from '../ui/block/block';
import {
  CurrentRaceRow,
  CurrentRaces
} from "../../../server/controllers/race/race-info-view";

export interface RaceInfoProps {
  currentRaces: CurrentRaces;
}

const getColumns = () => ([
    {
        title: 'Имя',
        dataIndex: 'username',
        key: 'username',
    },
]);

const addKeys = (data: CurrentRaces) =>
    data.map((item: CurrentRaceRow, index: number) => ({
        ...item,
        key: index,
    }));

const RaceInfo: React.FC<RaceInfoProps> = (props: RaceInfoProps) => (
    <Block>
        <Table
            columns={getColumns()}
            dataSource={addKeys(props.currentRaces)}
        />
    </Block>
);

export default RaceInfo;
