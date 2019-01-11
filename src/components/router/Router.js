/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';

const getCurrentPath = () => {
  const path = document.location.pathname
  return path.substring(path.lastIndexOf('/'))
}

export class Router extends React.Component {
  state = {
    route: getCurrentPath()
  }

  handleLinkClick = (route) => {
    this.setState({route});
    history.pushState(null, 'Some title', route);
  }

  static childContextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }

  getChildContext() {
    return {
        route: this.state.route,
        linkHandler: this.handleLinkClick
    }
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.setState({route: getCurrentPath()});
    };
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}