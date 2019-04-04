const React = require('react');
const PropTypes = require('prop-types');

class HasDefaultComponent extends React.PureComponent {
  render() {
    return <div {...this.props} />;
  }
}

HasDefaultComponent.propTypes = {
  data: PropTypes.array.isRequired,
  isCool: PropTypes.boolean,
};

HasDefaultComponent.defaultProps = {
  isCool: false,
};

export default HasDefaultComponent;
