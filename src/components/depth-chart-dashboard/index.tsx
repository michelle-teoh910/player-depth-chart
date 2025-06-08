import { Box, Flex, Heading, Table, VisuallyHidden } from '@chakra-ui/react';
import { useState } from 'react';

import { useAppSelector } from '../../store/hook';

import { LINEUP_SPOTS } from '../../utility/constants';

import { AddPlayer } from './add-player';
import { RemovePlayer } from './remove-player';
import { SportFilter } from './sport-filter';

export default function DepthChartDashboard() {
  const [selectedSport, setSelectedSport] = useState<string[]>([]);

  const sports = useAppSelector((state) => state.sports.sports);

  return (
    <Box maxW={1080} mx="auto" px={{ base: '16px', md: '24px' }} pt="24px">
      <Flex
        justifyContent="space-between"
        rowGap={'8px'}
        flexDir={{ base: 'column-reverse', md: 'row' }}
        mb="24px"
      >
        <SportFilter onChange={setSelectedSport} />

        <Flex columnGap={'8px'}>
          <RemovePlayer />
          <AddPlayer />
        </Flex>
      </Flex>

      {sports.map((sport) => (
        <Box
          display={
            selectedSport.length === 0 || selectedSport.includes(sport.name)
              ? 'block'
              : 'none'
          }
          mb="24px"
          key={`chart-${sport.name}`}
        >
          <Heading as="h2" textAlign={'left'} pb="16px">
            {sport.name}
          </Heading>

          <Table.ScrollArea borderWidth="1px" maxW="1080">
            <Table.Root striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader w={'148px'}>
                    <VisuallyHidden>Position</VisuallyHidden>
                  </Table.ColumnHeader>

                  {LINEUP_SPOTS.map((spot, index) => {
                    return (
                      <Table.ColumnHeader key={`t-col-header-${spot}-${index}`}>
                        {spot}
                      </Table.ColumnHeader>
                    );
                  })}
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
          </Table.ScrollArea>
        </Box>
      ))}
    </Box>
  );
}
