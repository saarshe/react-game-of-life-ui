// src/components/Grid.tsx
import React, { useCallback } from 'react';
import { useAppDispatch } from '../../store/store';
import { GenerationsHistogramData, GridData, MAX_HISTOGRAM_GENERATIONS, toggleCell } from '../game-controller/gameSlice';
import './Grid.css';

interface GridProps {
	gridData: GridData;
	histogramData: GenerationsHistogramData;
}

export const Grid: React.FC<GridProps> = ({ gridData, histogramData }) => {
	const dispatch = useAppDispatch();

	const handleToggleCell = useCallback(
		(row: number, col: number) => {
			dispatch(toggleCell({ row, col }));
		},
		[dispatch],
	);

	const getStyles = (value: number): React.CSSProperties => {
		if (value <= 0) return {};
		return { background: 'blue', opacity: (MAX_HISTOGRAM_GENERATIONS - 3 * value) / MAX_HISTOGRAM_GENERATIONS };
	};

	return (
		<div className="grid">
			{gridData.map((row, rowIndex) => (
				<div key={rowIndex} className="row">
					{row.map((cell, colIndex) => (
						<div
							key={colIndex}
							className={`cell ${cell ? 'alive' : 'dead'}`}
							style={getStyles(histogramData[rowIndex][colIndex])}
							onClick={() => handleToggleCell(rowIndex, colIndex)}
						></div>
					))}
				</div>
			))}
		</div>
	);
};
