import React, { Component } from 'react';

const OUTPUT_BOX_STYLES = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: 250,
  padding: 20,
  backgroundColor: 'lightyellow',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
  fontSize: '13px',
};

const OUTPUT_TERM_STYLES = {
  display: 'inline',
  textTransform: 'capitalize',
};

const OUTPUT_DEFINITION_STYLES = {
  display: 'inline',
  marginLeft: 0,
};

/**
 * Remove key-value pair from output if value is null. (The value is evaluated
 * against the bound object.)
 * @param {String} key
 * @this {Object} output props
 * @return {Boolean}
 */
function filterNotNull(key) {
  return this[key] !== null;
}

/**
 * Render term and definition elements for a specified key-value pair. (The
 * value is evaluated against the bound object.)
 * @param {String} key
 * @this {Object} output props
 * @return {Array}
 */
function mapOutputElements(key) {
  return [
    <dt style={OUTPUT_TERM_STYLES} className="output-term">{key}:</dt>,
    <dd style={OUTPUT_DEFINITION_STYLES} className="output-definition">{this[key]}</dd>,
  ];
}

export default class OutputBox extends Component {

  constructor(props) {
    super(props);
    this.renderOutputValues = this.renderOutputValues.bind(this);
  }

  renderOutputValues() {
    const { output } = this.props;
    return Object.keys(output)
      .filter(filterNotNull, output)
      .map(mapOutputElements, output);
  }

  render() {
    return (
      <div style={OUTPUT_BOX_STYLES}>
        <dl>
          {this.renderOutputValues()}
        </dl>
      </div>
    );
  }
}

OutputBox.propTypes = {
  output: React.PropTypes.object.isRequired,
};
