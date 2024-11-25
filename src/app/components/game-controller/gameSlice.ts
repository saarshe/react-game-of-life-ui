import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const GRID_SIZE = 30;

export type GridData = boolean[][];
export type GenerationsHistogramData = number[][];
export const MAX_HISTOGRAM_GENERATIONS = 100;

interface GameState {
	gridData: GridData;
	generationsHistogram: GenerationsHistogramData;
	isRunning: boolean;
}

const initialState: GameState = {
	gridData: Array(GRID_SIZE)
		.fill(null)
		.map(() => Array(GRID_SIZE).fill(false)),
	generationsHistogram: Array(GRID_SIZE)
		.fill(-1)
		.map(() => Array(GRID_SIZE).fill(-1)),
	isRunning: false,
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		toggleCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
			const { row, col } = action.payload;
			state.gridData[row][col] = !state.gridData[row][col];
		},
		startGame: (state) => {
			state.isRunning = true;
		},
		stopGame: (state) => {
			state.isRunning = false;
		},
		resetGame: (state) => {
			state.gridData = Array(GRID_SIZE)
				.fill(null)
				.map(() => Array(GRID_SIZE).fill(false));
			state.isRunning = false;
		},
		tick: (state, payload) => {
			state.gridData = payload.payload.newGridData;
			state.generationsHistogram = payload.payload.newGenerationsHistogram;
		},
	},
});

export const { toggleCell, startGame, stopGame, resetGame, tick } = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
