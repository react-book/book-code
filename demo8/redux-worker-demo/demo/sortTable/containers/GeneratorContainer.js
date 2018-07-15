import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Generator from '../components/Generator'
import * as UserActions from '../actions/users/users'

class GeneratorContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Generator
				{...this.props}
				generateUsers={this.props.actions.generateUsers}
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
)(GeneratorContainer)