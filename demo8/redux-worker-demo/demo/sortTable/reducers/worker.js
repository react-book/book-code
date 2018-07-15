import reducer from '../reducers'
import { createWorker } from 'redux-worker'

import Faker, {fake} from 'faker'

const generateUser = () => {
	return {
		uuid: Faker.random.uuid(),
		firstName: fake('{{name.firstName}}'),
		lastName: fake('{{name.lastName}}'),
		dateOfBirth: fake('{{date.past}}')
	};
}

const generateUsers = (n) => {
	let users = [];
	for (let i = 0; i < n; i++) {
		users.push(generateUser());
	}

	return users;
}


let worker = createWorker();

worker.registerReducer(reducer);

worker.registerTask('GENERATE', function(a) {
	let num = a.number;
	return generateUsers(num);
});

function getTime(timestamp) {
	return new Date(timestamp).getTime();
}