import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserTable from '../components/UserTable'
import * as UserActions from '../actions/users/users'

class Table extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { users, actions } = this.props;
		const { sortFirstName, sortLastName, sortDateOfBirth } = actions;
		return (
			<UserTable 
				users={users}
				onClickFirstName={sortFirstName}
				onClickLastName={sortLastName}
				onClickDoB={sortDateOfBirth}
				/>
		)
	}
}

function mapStateToProps(state) {
	return {
		users: state.users
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(UserActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Table)