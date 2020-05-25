import React from 'react';
import classNames from 'classnames';

const Figure = (props) => {
  const {
    children,
    size = 150,
    ratio = [],
  } = props;

  return (
    <figure className={classNames(
      'image',
      {
        [`is-${size}x${size}`]: !!size,
        [`is-${ratio[0]}by${ratio[1]}`]: ratio.length,
      },
    )}
    >
      {children}
    </figure>
  );
};

const Image = (props) => {
  const {
    src,
    alt,
    round = false,
  } = props;

  return (
    <img
      src={src}
      alt={alt}
      className={classNames({
        'is-round': round,
      })}
    />
  );
};

export { Figure, Image };
