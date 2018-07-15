import React, { createClass } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import Nqueen from '../components/Nqueen'
import actions from '../actions/nqueen/nqueen.js'

const NqueenContainer = createClass({
	render() {
		return <Nqueen {...this.props} />
	}
})

function mapStateToProps(state) {
	return {
		answer: state.nqueen.answer,
		numberOfSquares: state.nqueen.numberOfSquares,
		isCalculating: state.nqueen.isCalculating
	}
}

function mapDispatcherToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatcherToProps
)(NqueenContainer);
