import { useAppDispatch, useAppSelector } from '../../store/store';
import { GenerationsHistogramData, GridData, MAX_HISTOGRAM_GENERATIONS, tick } from './gameSlice';

export const useGameRules = () => {
	const dispatch = useAppDispatch();
	const { gridData, generationsHistogram } = useAppSelector((state) => state.game);

	const handleGameTick = () => {
		const newGridData = calculateNewGrid(gridData);
		const newGenerationsHistogram = updateGenerationsHistogram(generationsHistogram, newGridData);
		dispatch(tick({ newGridData, newGenerationsHistogram }));
	};

	const countNeighbors = (row: number, col: number) => {
		let count = 0;

		for (let i = row - 1; i <= row + 1; i++) {
			for (let j = col - 1; j <= col + 1; j++) {
				if (i < 0 || j < 0 || i >= gridData.length || j >= gridData[0].length || (i === row && j === col)) {
					continue;
				}
				if (gridData[i][j]) {
					count++;
				}
			}
		}

		return count;
	};

	const calculateCellState = (grid: GridData, row: number, col: number) => {
		const neighbors = countNeighbors(row, col);

		return (grid[row][col] && neighbors === 2) || neighbors === 3;
	};

	const calculateHistogramCellState = (prevValue: number, isAlive: boolean) => {
		if (isAlive) return 0;
		if (prevValue > MAX_HISTOGRAM_GENERATIONS || prevValue === -1) return -1;
		return prevValue + 1;
	};

	const calculateNewGrid = (sourceGrid: GridData) =>
		sourceGrid.map((row, i) => row.map((_col, j) => calculateCellState(sourceGrid, i, j)));

	const updateGenerationsHistogram = (histogramGrid: GenerationsHistogramData, dataGrid: GridData) =>
		histogramGrid.map((row, i) => row.map((_col, j) => calculateHistogramCellState(histogramGrid[i][j], dataGrid[i][j])));

	return { handleGameTick };
};
