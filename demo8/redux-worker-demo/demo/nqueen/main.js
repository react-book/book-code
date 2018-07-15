import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import App from './components/App'
import { applyWorker } from 'redux-worker'
import createLogger from 'redux-logger';

const logger = createLogger();

// 创建一个新的worker，指定一个脚本来执行worker线程:
const worker = new Worker('./dist/worker.bundle.js');

const enhancerWithWorker = compose(
	// 使用 thunk 和 logger 中间件:
	applyMiddleware(thunk, logger),
	applyWorker(worker)
);

const store = createStore(rootReducer, {}, enhancerWithWorker);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
)
