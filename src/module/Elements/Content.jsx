import React from 'react';
import classNames from 'classnames';

const Content = (props) => {
  const { children, size = 'normal' } = props;

  return (
    <div className={classNames('content', `is-${size}`)}>
      {children}
    </div>
  );
};

export default Content;
