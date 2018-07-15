import React, { createClass } from 'react'

export default createClass({
  getInitialState() {
      return {
          degree: 0  
      };
  },

  componentDidMount() {
    this.interval = setInterval(function() {
      this.setState({
        degree: this.state.degree + 5
      });
    }.bind(this), 16);
  },

  componentWillUnmount() {
    const interval = this.interval;
    if (interval) {
      clearInterval(interval);
    }
  },

  render() {
    return (
      <div style={this.props.style}>
        <div style={{
          position: "absolute",
          right: "0",
          left: "0",
          height: '25px',
          width: '25px',
          flex: '0 0 auto',
          textAlign: 'center',
          display: 'inline-block',
          border: '1px solid red',
          borderRadius: '2px',
          margin: 'auto',
          opacity: '.7',
          transform: 'rotate(' + this.state.degree + 'deg)',
        }}>
        </div>
      
        <div style={{
          position: "absolute",
          right: "0",
          left: "0",
          height: '25px',
          width: '25px',
          flex: '0 0 auto',
          textAlign: 'center',
          display: 'inline-block',
          border: '1px solid orange',
          borderRadius: '2px',
          margin: 'auto',
          opacity: '.7',
          transform: 'rotate(' + ( this.state.degree + 10 ) + 'deg)',
        }}>
        </div>

        <div style={{
          position: "absolute",
          right: "0",
          left: "0",
          height: '25px',
          width: '25px',
          flex: '0 0 auto',
          textAlign: 'center',
          display: 'inline-block',
          border: '1px solid yello',
          borderRadius: '2px',
          margin: 'auto',
          opacity: '.7',
          transform: 'rotate(' + ( this.state.degree + 20 ) + 'deg)',
        }}>
        </div>
        <div style={{
          position: "absolute",
          right: "0",
          left: "0",
          height: '25px',
          width: '25px',
          flex: '0 0 auto',
          textAlign: 'center',
          display: 'inline-block',
          border: '1px solid blue',
          borderRadius: '2px',
          margin: 'auto',
          opacity: '.7',
          transform: 'rotate(' + ( this.state.degree + 30 ) + 'deg)',
        }}>
        </div>
        <div style={{
          position: "absolute",
          right: "0",
          left: "0",
          height: '25px',
          width: '25px',
          flex: '0 0 auto',
          textAlign: 'center',
          display: 'inline-block',
          border: '1px solid green',
          borderRadius: '2px',
          margin: 'auto',
          opacity: '.7',
          transform: 'rotate(' + ( this.state.degree + 40 ) + 'deg)',
        }}>
        </div>
      </div>

    )
  },
});