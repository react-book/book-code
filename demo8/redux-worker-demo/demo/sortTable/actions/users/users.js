export function sortFirstName(reverse) {
	return {
		type: 'SORT_BY_FIRST',
		reverse: reverse
	};
}

export function sortLastName(reverse) {
	return {
		type: 'SORT_BY_LAST',
		reverse: reverse
	};
}

export function sortDateOfBirth(reverse) {
	return {
		type: 'SORT_BY_DOB',
		reverse: reverse
	};
}

export function generateUsers(num) {
	return {
		type: 'GENERATE_USERS',
		number: num
	};
}

export function testWorker(n) {
	return {
		task: 'GENERATE',
		number: n
	};
};

