import React from 'react';
import classNames from 'classnames';

const Columns = (props) => {
  const {
    children,
    gap = 2,
    multi = false,
  } = props;

  return (
    <div className={classNames('columns', `is-${gap}`, { 'is-multiline': multi, 'is-variable': !!gap })}>
      {children}
    </div>
  );
};

export default Columns;
