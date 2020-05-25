import React from 'react';
import classNames from 'classnames';
import inputOption from '../../lib/inputOption';

const InputText = (props) => {
  const {
    onChange = () => false,
    option = [],
    type = 'text',
    name = '',
    value,
    placeholder = '',
    size = '',
    color = '',
    round = false,
    loading = false,
    disabled = false,
    readonly = false,
  } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      name,
      value: inputOption(value, option),
    });
  };

  return (
    <input
      onChange={handleChange}
      type={type}
      name={name}
      value={value}
      className={classNames(
        'input',
        {
          'is-rounded': round,
          'is-loading': loading,
          [`is-${color}`]: !!color,
          [`is-${size}`]: !!size,
        },
      )}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
    />
  );
};

export default InputText;
