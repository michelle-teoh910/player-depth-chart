import { Box, Flex, Table, VisuallyHidden } from '@chakra-ui/react';
import { useState } from 'react';

import { useAppSelector } from '../../store/hook';

import { AddPlayer } from './add-player';
import { RemovePlayer } from './remove-player';
import { SportFilter } from './sport-filter';

export default function DepthChartDashboard() {
  const [selectedSport, setSelectedSport] = useState<string[]>([]);

  const sports = useAppSelector((state) => state.sports.sports);

  return (
    <Box>
      <Flex>
        <SportFilter onChange={setSelectedSport} />

        <AddPlayer />
        <RemovePlayer />
      </Flex>

      {sports.map((sport) => (
        <Box
          key={`chart-${sport.name}`}
          display={
            selectedSport.length === 0 || selectedSport.includes(sport.name)
              ? 'block'
              : 'none'
          }
        >
          <h2>{sport.name}</h2>
          <Table.Root striped>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>
                  <VisuallyHidden>Position</VisuallyHidden>
                </Table.ColumnHeader>
                <Table.ColumnHeader>Starter</Table.ColumnHeader>
                <Table.ColumnHeader>2ND</Table.ColumnHeader>
                <Table.ColumnHeader>3RD</Table.ColumnHeader>
                <Table.ColumnHeader>4TH</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sport.position.map((item) => {
                const filledSpots = item.spots;
                const missingSpots = 4 - filledSpots.length;

                return (
                  <Table.Row key={`${sport.name}-${item.name}`}>
                    <Table.Cell>{item.name}</Table.Cell>
                    {item.spots.map((player) => {
                      return (
                        <Table.Cell
                          key={`${sport.name}-${item.name}-${player}`}
                        >
                          {player}
                        </Table.Cell>
                      );
                    })}

                    {Array.from({ length: missingSpots }).map((_, index) => (
                      <Table.Cell
                        key={`${sport.name}-${item.name}-dash-${index}`}
                      >
                        –
                      </Table.Cell>
                    ))}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Box>
      ))}
    </Box>
  );
}
