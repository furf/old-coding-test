import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import OutputBox from '../src/OutputBox';

describe('<OutputBox />', function() {
  it('contains <dl>', function() {
    const output = {};
    expect(shallow(<OutputBox output={output} />).contains(<dl/>)).to.equal(true);
  });

  it('renders an output ({ x: 42 })', function() {
    const state = { x: 42 };
    const wrapper = mount(<OutputBox output={state} />);
    expect(wrapper.find('dt')).to.have.length(1);
    expect(wrapper.find('dd')).to.have.length(1);
    expect(wrapper.find('dt').text()).to.equal('x:');
    expect(wrapper.find('dd').text()).to.equal('42');
  });

  it('does not render a null output ({ x: null })', function() {
    const state = { x: null };
    const wrapper = mount(<OutputBox output={state} />);
    expect(wrapper.find('dt')).to.have.length(0);
    expect(wrapper.find('dd')).to.have.length(0);
  });
});
