import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import mockSportsData from '../../mock/sports.json';

import { MAX_PLAYERS } from '../../utility/constants';

type Player = string;

type Position = {
  name: string;
  spots: Player[];
};

type Sport = {
  name: string;
  position: Position[];
};

type SportsState = {
  sports: Sport[];
};

const initialState: SportsState = mockSportsData;

const sportsSlice = createSlice({
  name: 'sports',
  initialState,
  reducers: {
    addPlayer: (
      state,
      action: PayloadAction<{
        sportName: string;
        positionName: string;
        spot?: string;
        playerName: string;
      }>
    ) => {
      const {
        sportName,
        positionName,
        spot: spotIndex,
        playerName,
      } = action.payload;

      const sport = state.sports.find((sport) => sport.name === sportName);

      if (!sport) return;

      const position = sport.position.find((pos) => pos.name === positionName);

      if (!position) return;

      position.spots.splice(
        spotIndex
          ? Number(spotIndex)
          : Math.min(position.spots.length, MAX_PLAYERS - 1),
        0,
        playerName
      );

      if (position.spots.length > MAX_PLAYERS) {
        position.spots = position.spots.slice(0, MAX_PLAYERS);
      }
    },
  },
});

export const { addPlayer } = sportsSlice.actions;
export default sportsSlice.reducer;
