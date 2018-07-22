import React, { Component } from 'react'

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

	componentDidMount() {
		setInterval(function() {
			this.setState({
				counter: this.state.counter + 1
			});
		}.bind(this), 16);      
	}

	render() {
		return (
			<div style={{
				    height: '200px',
				    width: '200px',
				    flex: '1 0 auto',
				    textAlign: 'center',
				    display: 'inline-block',
				    boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.2)',
				    borderRadius: '2px',
				    padding: '8px 12px',
				    backgroundColor: 'rgba(0, 0, 0, 0.05)',
				    margin: '4px'
				}}>
				<h1>Counter</h1>
				<h2>{ this.state.counter }</h2>
			</div>
		)
	}
}

export default Counter