import React, { Component } from 'react'

class Spinner extends Component {
	constructor(props) {
        super(props);
        this.state = {
            degree: 0
        };
    }
	componentDidMount() {
		setInterval(function() {
			this.setState({
				degree: this.state.degree + 5
			});
		}.bind(this), 16);      
	}
	render() {
		return (
			<div style={{
				    height: '200px',
				    width: '200px',
				    flex: '0 0 auto',
				    textAlign: 'center',
				    display: 'inline-block',
				    boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.2)',
				    borderRadius: '2px',
				    padding: '8px 12px',
				    backgroundColor: 'rgba(0, 0, 0, 0.05)',
				    margin: '4px',
				    transform: 'rotateY(' + this.state.degree + 'deg)'
				}}>
				<h1>Spinner</h1>
			</div>
		)
	}
}
export default Spinner