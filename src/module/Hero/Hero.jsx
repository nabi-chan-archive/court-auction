import React from 'react';
import classNames from 'classnames';

const Hero = (props) => {
  const {
    children,
    size,
    color,
    bold = false,
  } = props;

  return (
    <div className={classNames(
      'hero',
      {
        [`is-${size}`]: !!size,
        [`is-${color}`]: !!color,
        'is-bold': bold,
      },
    )}
    >
      {children}
    </div>
  );
};

export default Hero;
