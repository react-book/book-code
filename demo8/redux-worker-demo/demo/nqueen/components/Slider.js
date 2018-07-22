import React, { Component } from 'react'

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: 0
        };
    }

	componentDidMount() {
		var v = 5;
		setInterval(function() {
			if (this.state.steps > 460) {
				v = -5;
			} 

			if (this.state.steps < 0) {
				v = 5;
			}

			this.setState({
				steps: this.state.steps + v
			});
		}.bind(this), 16);      
	}

	render() {
		return (
			<div style={{
				    height: '200px',
				    width: '200px',
				    flex: '0 0 auto',
				    display: 'inline-block',
				    boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.2)',
				    borderRadius: '2px',
				    padding: '8px 12px',
				    backgroundColor: 'rgba(0, 0, 0, 0.05)',
				    margin: '4px',
		            position: 'relative',
				    left: this.state.steps,
				}}>
				<h1>Slider</h1>
			</div>
		)
	}
}

export default Slider