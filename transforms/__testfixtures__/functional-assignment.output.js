const React = require('react');
const PropTypes = require('prop-types');

const FunctionalAssignmentExpressionComponent = props => (
  <div {...this.props} />
);

FunctionalAssignmentExpressionComponent.propTypes = {
  data: PropTypes.array.isRequired,
  isBad: PropTypes.boolean.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  isCool: PropTypes.boolean
};

FunctionalAssignmentExpressionComponent.defaultProps = {
  height: null,
  width: null,
  isCool: false
};

export default FunctionalAssignmentExpressionComponent;
