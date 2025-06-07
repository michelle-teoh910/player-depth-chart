import { createSlice } from '@reduxjs/toolkit';

import mockSportsData from '../../mock/sports.json';

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
  reducers: {},
});

export default sportsSlice.reducer;
