import React from 'react';
import classNames from 'classnames';

const Container = (props) => {
  const { children, fluid, breakpoint } = props;

  return (
    <div className={classNames('container', { 'is-fluid': fluid, [`is-${breakpoint}`]: !!breakpoint })}>
      {children}
    </div>
  );
};

export default Container;
