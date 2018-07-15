import React, {Component, PropTypes} from 'react';

class Generator extends Component {
	constructor(props) {
		super(props);
	}

	testWorker() {
		this.props.actions.testWorker(10000)
			.then(console.log.bind(console))
	}

	render() {
		return (
			<div style={{marginTop: '16px'}}>
				<div>Sort Table</div>
				<div style={{
					display: 'flex',
					flexFlow: 'row nowrap',
					flex: 1
				}}>
					<button onClick={this.props.generateUsers.bind(this, 100)}>100</button>
					<button onClick={this.props.generateUsers.bind(this, 1000)}>1000</button>
					<button onClick={this.props.generateUsers.bind(this, 10000)}>10000</button>
					<button onClick={this.testWorker.bind(this)}>test</button>
				</div>
			</div>
		);
	}
}

export default Generator;