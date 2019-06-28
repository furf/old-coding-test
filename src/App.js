import React, { Component } from 'react';

import JsonDom from './JsonDom.js';
import OutputBox from './OutputBox.js';
import DOM_DATA from '../data/dom.json';
import { generateNodePath, getOffset, getComputedStyle } from './DOMUtil';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    // Bind event handlers to the component instance.
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  getDefaultState() {
    return {
      x: null,
      y: null,
      z: null,
      path: null,
    };
  }

  handleMouseOver(event) {
    this.setState({
      path: generateNodePath(event.target, this.refs.root) || '👻',
      z: getComputedStyle(event.target, 'z-index'),
    });
  }

  handleMouseMove(event) {
    const { pageX, pageY, target } = event;
    const { left, bottom } = getOffset(target);
    this.setState({
      x: pageX - left,
      y: bottom - pageY,
    });
  }

  handleMouseOut() {
    this.setState(this.getDefaultState());
  }

  render() {
    return (
      <div
        ref="root"
        onMouseOver={this.handleMouseOver}
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}
      >
        <JsonDom data={DOM_DATA} />
        <OutputBox output={this.state} />
      </div>
    );
  }
}
