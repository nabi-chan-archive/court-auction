import React from 'react';
import classNames from 'classnames';

const Column = (props) => {
  const { width, children } = props;

  return (
    <div className={classNames('column', { [`is-${width}`]: !!width })}>
      {children}
    </div>
  );
};

export default Column;
