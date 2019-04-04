const React = require('react');

class NoImportsComponent extends React.PureComponent {
  render() {
    return <div {...this.props} />;
  }
}

export default NoImportsComponent;
