(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReduxWorker"] = factory();
	else
		root["ReduxWorker"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createWorker = exports.applyWorker = undefined;

	var _createWorker = __webpack_require__(1);

	var _createWorker2 = _interopRequireDefault(_createWorker);

	var _applyWorker = __webpack_require__(2);

	var _applyWorker2 = _interopRequireDefault(_applyWorker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.applyWorker = _applyWorker2.default;
	exports.createWorker = _createWorker2.default;
	exports.default = { applyWorker: _applyWorker2.default, createWorker: _createWorker2.default };

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var createWorker = function createWorker(reducer) {
		// Initialize ReduxWorekr
		var worker = new ReduxWorker();

		self.addEventListener('message', function (e) {
			var action = e.data;

			if (typeof action.type === 'string') {
				if (!worker.reducer || typeof worker.reducer !== 'function') {
					throw new Error('Expect reducer to be function. Have you registerReducer yet?');
				}

				// Set new state
				var state = worker.state;
				state = worker.state = worker.reducer(state, action);
				state = worker.transform(state);

				// Send new state to main thread
				self.postMessage({
					type: action.type,
					state: state,
					action: action
				});

				return;
			}

			if (typeof action.task === 'string' && typeof action._taskId === 'number') {
				var taskRunner = worker.tasks[action.task];

				if (!taskRunner || typeof taskRunner !== 'function') {
					throw new Error('Cannot find runner for task ' + action.task + '. Have you registerTask yet?');
				}

				// Send new state to main thread
				self.postMessage({
					_taskId: action._taskId,
					response: taskRunner(action)
				});
			}
		});

		return worker;
	};

	var ReduxWorker = function () {
		function ReduxWorker() {
			_classCallCheck(this, ReduxWorker);

			// Taskrunners
			this.tasks = {};

			// Redux-specific variables
			this.state = {};
			this.reducer = null;
			this.transform = function (state) {
				return state;
			};
		}

		_createClass(ReduxWorker, [{
			key: 'registerReducer',
			value: function registerReducer(reducer, transform) {
				this.reducer = reducer;
				this.state = reducer({}, {});
			}
		}, {
			key: 'registerTask',
			value: function registerTask(name, taskFn) {
				this.tasks[name] = taskFn;
			}
		}]);

		return ReduxWorker;
	}();

	exports.default = createWorker;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var defer = function defer() {
		var result = {};
		result.promise = new Promise(function (resolve, reject) {
			result.resolve = resolve;
			result.reject = reject;
		});
		return result;
	};

	var applyWorker = function applyWorker(worker) {
		return function (createStore) {
			return function (reducer, initialState, enhancer) {
				if (!(worker instanceof Worker)) {
					console.error('Expect input to be a Web Worker. Fall back to normal store.');
					return createStore(reducer, initialState, enhancer);
				}

				// New reducer for workified store
				var replacementReducer = function replacementReducer(state, action) {
					if (action.state) {
						return action.state;
					}
					return state;
				};

				// Start task id;
				var taskId = 0;
				var taskCompleteCallbacks = {};

				// Create store using new reducer
				var store = createStore(replacementReducer, reducer({}, {}), enhancer);

				// Store reference of old dispatcher
				var next = store.dispatch;

				// Replace dispatcher
				store.dispatch = function (action) {
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
						var task = Object.assign({}, action, { _taskId: taskId });
						var deferred = defer();

						taskCompleteCallbacks[taskId] = deferred;
						taskId++;
						worker.postMessage(task);
						return deferred.promise;
					}
				};

				store.isWorker = true;

				// Add worker events listener
				worker.addEventListener('message', function (e) {
					var action = e.data;
					if (typeof action.type === 'string') {
						next(action);
					}

					if (typeof action._taskId === 'number') {
						var wrapped = taskCompleteCallbacks[action._taskId];

						if (wrapped) {
							wrapped.resolve(action);
							delete taskCompleteCallbacks[action._taskId];
						}
					}
				});

				return store;
			};
		};
	};

	exports.default = applyWorker;

/***/ }
/******/ ])
});
;