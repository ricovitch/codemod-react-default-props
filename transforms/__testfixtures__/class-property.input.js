const React = require('react');
const PropTypes = require('prop-types');

class ClassPropertyComponent extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    isBad: PropTypes.boolean.isRequired,
    complexData: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })).isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    isCool: PropTypes.boolean,
    files: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    }))
  };

  render() {
    return <div {...this.props} />;
  }
}

export default ClassPropertyComponent;