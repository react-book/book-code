import createWorker from '../src/createWorker';
import 'babel-polyfill';

describe('createWorker', () => {
	let worker;

	beforeEach(() => {
		worker = createWorker();
	})

	afterEach(() => {
		worker.destroy();
	});

	it('should have create ReduxWorker', () => {
		expect(typeof worker.tasks).toBe('object');
		expect(typeof worker.state).toBe('object');
		expect(worker.reducer).toBe(null);
		expect(typeof worker.transform).toBe('function');
	});

	it('should registerReducer', () => {
		let reducer = () => {};
		worker.registerReducer(reducer);
		expect(worker.reducer).toBe(reducer);
	});

	it('should registerTask', () => {
		let task = () => {};
		worker.registerTask('testTask', task);
		expect(worker.tasks.testTask).toBe(task);
	});

	describe('Behavior of ReduxWorker', () => {
		let taskOne = (data) => {
			return data.num + 1;
		};

		let reducer;

		beforeEach(() => {
			reducer = jasmine.createSpy('reducer');
			worker.registerReducer(reducer);
			worker.registerTask('taskOne', taskOne);
			spyOn(self, 'postMessage');
			reducer.calls.reset();
			self.postMessage.calls.reset();
		});

		it('should run action through reducer', () => {
			let event = new Event('message');

			event.data = {
				type: 'ACTION',
				data: 'DATA'
			}

			self.dispatchEvent(event);
			let args = reducer.calls.first().args;

			expect(self.postMessage).toHaveBeenCalledWith({
				type: 'ACTION',
				state: undefined,
				action: {
					type: 'ACTION',
					data: 'DATA'
				}
			});

			expect(args[ 0 ]).toBe(undefined);
			expect(args[ 1 ]).toEqual({
				type: 'ACTION',
				data: 'DATA'
			});
		});

		it('should run task through tasksRunner', () => {
			let event = new Event('message');

			event.data = {
				task: 'taskOne',
				num: 2,
				_taskId: 0
			}

			self.dispatchEvent(event);

			expect(self.postMessage).toHaveBeenCalledWith({
				_taskId: 0,
				response: 3
			});
		});
	});


});