import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import {generateNodePath} from '../src/DOMUtil.js';

describe('DOMUtil.generateNodePath', function() {

  it('should render a non-<div>\'s nodeName', function() {
    const wrapper = mount(
      <span>Lorem ipsum dolor sit amet.</span>
    );
    expect(generateNodePath(wrapper.find('span').node, wrapper.node)).to.equal('span');
  });

  it('should not render a <div>\'s nodeName', function() {
    const wrapper = mount(
      <div>Lorem ipsum dolor sit amet.</div>
    );
    expect(generateNodePath(wrapper.find('div').node, wrapper.node)).to.equal('');
  });

  it('should render a <div>\'s className', function() {
    const wrapper = mount(
      <div className="hero">Lorem ipsum dolor sit amet.</div>
    );
    expect(generateNodePath(wrapper.find('div').node, wrapper.node)).to.equal('.hero');
  });

  it('should render multiple classNames', function() {
    const wrapper = mount(
      <span className="lorem-ipsum message">Lorem ipsum dolor sit amet.</span>
    );
    expect(generateNodePath(wrapper.find('span').node, wrapper.node)).to.equal('span.lorem-ipsum.message');
  });

  it('should ignore "invisible" <div> elements', function() {
    const wrapper = mount(
      <div className="root">
        <div className="hero">
          <div>
            <h1 className="heading big">Coding Test</h1>
          </div>
        </div>
      </div>
    );
    expect(generateNodePath(wrapper.find('h1').node, wrapper.node)).to.equal('.root .hero h1.heading.big');
  });
});
