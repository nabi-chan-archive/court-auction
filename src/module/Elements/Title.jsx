import React from 'react';

const Title = (props) => {
  const { subtitle = false, size = 3, children } = props;

  if (!subtitle) {
    switch (size) {
      case 1: return <h1 className="title is-1">{children}</h1>;
      case 2: return <h2 className="title is-2">{children}</h2>;
      case 3: return <h3 className="title is-3">{children}</h3>;
      case 4: return <h4 className="title is-4">{children}</h4>;
      case 5: return <h5 className="title is-4">{children}</h5>;
      case 6: return <h6 className="title is-6">{children}</h6>;
      default: return <h3 className="title is-3">{children}</h3>;
    }
  } else {
    switch (size) {
      case 1: return <h1 className="subtitle is-1">{children}</h1>;
      case 2: return <h2 className="subtitle is-2">{children}</h2>;
      case 3: return <h3 className="subtitle is-3">{children}</h3>;
      case 4: return <h4 className="subtitle is-4">{children}</h4>;
      case 5: return <h5 className="subtitle is-4">{children}</h5>;
      case 6: return <h6 className="subtitle is-6">{children}</h6>;
      default: return <h3 className="subtitle is-3">{children}</h3>;
    }
  }
};

export default Title;
