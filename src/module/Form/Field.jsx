import React from 'react';
import classNames from 'classnames';

const Field = (props) => {
  const {
    children,
    align = '',
    addons = false,
    group = false,
    multiline = false,
    horizontal = false,
  } = props;

  return (
    <div className={classNames(
      'field',
      {
        'has-addons': addons,
        'is-grouped': group,
        'is-grouped-multiline': multiline,
        'is-horizontal': horizontal,
        [`has-addons-${align}`]: !!align && addons,
        [`is-grouped-${align}`]: !!align && group,
      },
    )}
    >
      {children}
    </div>
  );
};

export default Field;
