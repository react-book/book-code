import reducer from '../reducers'
import solve from '../solver'
import { createWorker } from 'redux-worker'

let worker = createWorker();

worker.registerReducer(reducer);

worker.registerTask('NQUEEN_TASK', function(a) {
	let n = a.number;
	return +n < 16 ? solve(+n).length : 'N is too large...';
});