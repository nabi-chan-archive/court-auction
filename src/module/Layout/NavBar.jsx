import React from 'react';
import classNames from 'classnames';

const NavBar = (props) => {
  const {
    children,
    direction,
  } = props;
  return (
    <div className={classNames('navbar', `is-fixed-${direction}`)}>
      {children}
    </div>
  );
};

export default NavBar;
