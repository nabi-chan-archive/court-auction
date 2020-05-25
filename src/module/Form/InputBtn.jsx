import React from 'react';
import classNames from 'classnames';

const Buttons = (props) => {
  const {
    align,
    addons,
    size,
    children,
  } = props;

  return (
    <div className={classNames(
      'buttons',
      {
        'has-addons': addons,
        [`are-${size}`]: !!size,
        [`is-${align}`]: align,
      },
    )}
    >
      {children}
    </div>
  );
};

const Button = (props) => {
  const {
    children,
    type = 'submit',
    onClick = () => false,
    size,
    color,
    light = false,
    outlined = false,
    inverted = false,
    fullwidth = false,
    rounded = false,
    loading = false,
    disabled = false,
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        'button',
        {
          [`is-${size}`]: !!size,
          [`is-${color}`]: !!color,
          'is-light': light,
          'is-inverted': inverted,
          'is-outlined': outlined,
          'is-fullwidth': fullwidth,
          'is-rounded': rounded,
          'is-loading': loading,
        },
      )}
    >
      {children}
    </button>
  );
};

export { Buttons, Button };
