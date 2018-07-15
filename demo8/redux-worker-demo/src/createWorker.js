const createWorker = (reducer) => {
	// 实例化一个 ReduxWorekr
	let worker = new ReduxWorker();
	
	let messageHandler = (e) => {
		var action = e.data;

		if (typeof action.type === 'string') {
			if (!worker.reducer || typeof worker.reducer !== 'function') {
				throw new Error('Expect reducer to be function. Have you registerReducer yet?');
			}

			// 计算新的 state
			let state = worker.state;
			state = worker.state = worker.reducer(state, action);
			state = worker.transform(state);

			// 将新的 state 发送到主线程
			self.postMessage({
				type: action.type,
				state: state,
				action: action
			});

			return;
		}

		if (typeof action.task === 'string' && typeof action._taskId === 'number') {
			let taskRunner = worker.tasks[ action.task ];

			if (!taskRunner || typeof taskRunner !== 'function') {
				throw new Error('Cannot find runner for task ' + action.task + '. Have you registerTask yet?');
			}

			// 将新的 state 发送到主线程
			self.postMessage({
				_taskId: action._taskId,
				response: taskRunner(action)
			});
		}
	}

	worker.destroy = () => {
		self.removeEventListener('message', messageHandler);
	}

	self.addEventListener('message', messageHandler);


	return worker;
}

class ReduxWorker {
	constructor() {
		this.tasks = {};

		this.state = {};
		this.reducer = null;
		this.transform = function(state) { return state; }
	}

	registerReducer(reducer, transform) {
		this.reducer = reducer;
		this.state = reducer({}, {});
	}

	registerTask(name, taskFn) {
		this.tasks[ name ] = taskFn;
	}

}

export default createWorker