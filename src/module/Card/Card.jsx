import React from 'react';
import classNames from 'classnames';

const Card = (props) => {
  const { children } = props;

  return (
    <div className={classNames('card')}>
      {children}
    </div>
  );
};

export default Card;
