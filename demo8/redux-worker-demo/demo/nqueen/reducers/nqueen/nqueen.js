import solve from '../../solver'

const intState = {
	isCalculating: false,
	numberOfSquares: 1,
	answer: null
}

const startNQueen = (state) => {
	return Object.assign({}, state, {
		isCalculating: true,
		answer: null
	});
}

const calculateNQueen = (state, n) => {
	return {
		numberOfSquares: n,
		isCalculating: true,
		answer: +n < 16 ? solve(+n).length : 'N is too large...'
	};
}

const completeNQueen = (state) => {
	return Object.assign({}, state, {
		isCalculating: false
	});
}

export default (state = intState, action) => {
	switch (action.type) {
		case 'START_NQUEEN':
			return startNQueen(state);
		case 'CALCULATE_NQUEEN':
			return calculateNQueen(state, action.number);
		case 'COMPLETE_NQUEEN':
			return completeNQueen(state);
		default:
			return state;
	}
}
