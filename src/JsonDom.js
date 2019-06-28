import React from 'react';

function createChildren(children) {
  if (Array.isArray(children)) {
    return children.map((childData, i) => <JsonDom data={childData} key={i} />);
  } else if (typeof children === 'string') {
    return children;
  }
  return null;
}

export default function JsonDom(props) {
  const { data } = props;
  const {
    tagName = 'div',
    className = '',
    style = null,
    children = [],
  } = data;

  return React.createElement(tagName, {
    className,
    style,
  }, createChildren(children));
}

JsonDom.propTypes = {
  data: React.PropTypes.object.isRequired,
};
