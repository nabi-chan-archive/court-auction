import React from 'react';
import classNames from 'classnames';

const CardContent = (props) => {
  const { children } = props;

  return (
    <div className={classNames('card-content')}>
      {children}
    </div>
  );
};

export default CardContent;
