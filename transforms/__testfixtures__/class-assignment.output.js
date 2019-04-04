const React = require('react');
const PropTypes = require('prop-types');

class ClassAssignmentExpressionComponent extends React.PureComponent {
  render() {
    return <div {...this.props} />;
  }
}

ClassAssignmentExpressionComponent.propTypes = {
  data: PropTypes.array.isRequired,
  isBad: PropTypes.boolean.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  isCool: PropTypes.boolean
};

ClassAssignmentExpressionComponent.defaultProps = {
  height: null,
  width: null,
  isCool: false
};

export default ClassAssignmentExpressionComponent;
