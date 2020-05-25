import React from 'react';
import classNames from 'classnames';

const Form = (props) => {
  const { onSubmit, formData, children } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={classNames('full-width')}>
      {children}
    </form>
  );
};

export default Form;
