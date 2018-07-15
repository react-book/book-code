const defer = function() {
    let result = {};
    result.promise = new Promise(function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
};

const applyWorker = (worker) => {
	return createStore => (reducer, initialState, enhancer) => {
		// 判断浏览器是否支持 worker
		if (!(worker instanceof Worker)) {
			console.error('Expect input to be a Web Worker. Fall back to normal store.');
			return createStore(reducer, initialState, enhancer);
		}

		// 新增强 store 的 reducer 函数：
		let replacementReducer = (state, action) => {
			if (action.state) {
				return action.state;
			}
			return state;
		}

		// Task id;
		let taskId = 0;
		let taskCompleteCallbacks = {};

		// 使用新 reducer 产生新 store
		let store = createStore(replacementReducer, reducer({}, {}), enhancer);

		// 老 dispatch 函数
		let next = store.dispatch;

		// 替换 dispatch 函数，增加一层判断
		store.dispatch = (action) => {
			if (typeof action.type === 'string') {
				if (window.disableWebWorker) {
					return next({
						type: action.type,
						state: reducer(store.getState(), action)
					});
				}
				worker.postMessage(action);
			}

			if (typeof action.task === 'string') {
				let task = Object.assign({}, action, { _taskId: taskId });
				let deferred = defer();

				taskCompleteCallbacks[ taskId ] = deferred
				taskId++;
				worker.postMessage(task);
				return deferred.promise;
			} 
		}

		store.isWorker = true;
		
		// worker 监听事件
		worker.addEventListener('message', function(e) {
			let action = e.data;
			if (typeof action.type === 'string') {
				next(action);
			}

			if (typeof action._taskId === 'number') {
				let wrapped = taskCompleteCallbacks[ action._taskId ];

				if (wrapped) {
					wrapped.resolve(action);
					delete taskCompleteCallbacks[ action._taskId ];
				}
			}
		});

		return store;
	}
}

export default applyWorker