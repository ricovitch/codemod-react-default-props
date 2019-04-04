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

export default ClassAssignmentExpressionComponent;
