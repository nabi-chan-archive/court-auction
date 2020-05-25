import React from 'react';
import classNames from 'classnames';

const Tag = (props) => {
  const { children, color } = props;

  return (
    <span className={classNames('tag', `is-${color}`)}>
      {children}
    </span>
  );
};

export default Tag;
