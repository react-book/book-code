import React, { Component, PropTypes } from 'react';

class ScrollPos extends Component {

  static proptypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    position: null
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getBounds = (element) => {
    if (this.bounds) return;
    this.bounds = element && element.getBoundingClientRect();
  }

  handleScroll = (event) => {
    // console.log(event)
    const scrollTop = event.target.scrollingElement.scrollTop;

    this.setState({position: scrollTop})
  }

  render() {
    return (
      <div ref={this.getBounds}>{
        this.props.children(this.state.position)
      }</div>
    )
  }
}

export default ScrollPos;
