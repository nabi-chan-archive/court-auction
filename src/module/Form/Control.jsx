import React from 'react';
import classNames from 'classnames';

const Control = (props) => {
  const {
    iconLeft = false,
    iconRight = false,
    expanded = false,
    children,
  } = props;

  return (
    <div className={classNames(
      'control',
      {
        'has-icons-left': iconLeft,
        'has-icons-right': iconRight,
        'is-expanded': expanded,
      },
    )}
    >
      {children}
    </div>
  );
};

export default Control;
