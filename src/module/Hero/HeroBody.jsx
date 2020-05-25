import React from 'react';
import classNames from 'classnames';

const HeroBody = (props) => {
  const { children } = props;

  return (
    <div className={classNames('hero-body')}>
      {children}
    </div>
  );
};

export default HeroBody;
