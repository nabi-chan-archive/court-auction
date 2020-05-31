import React, { Component } from 'react';

const codeSplit = (getComponent) => {
  class CodeSplit extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Splitted: null,
      };
      getComponent().then(({ default: Splitted }) => {
        this.setState({
          Splitted,
        });
      });
    }

    render() {
      const { Splitted } = this.state;
      if (!Splitted) {
        return null;
      }
      return <Splitted {...this.props} />;
    }
  }

  return CodeSplit;
};

export default codeSplit;
