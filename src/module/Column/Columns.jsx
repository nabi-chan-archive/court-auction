import React from 'react';
import classNames from 'classnames';

const Columns = (props) => {
  const {
    children,
    gap,
    multi = false,
  } = props;

  return (
    <div className={classNames('columns', `is-${gap}`, { 'is-multiline': multi })}>
      {children}
    </div>
  );
};

export default Columns;
