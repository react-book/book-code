import { combineReducers } from 'redux'
import users from './users/users'

const sortTableApp = combineReducers({
	users
});

export default sortTableApp