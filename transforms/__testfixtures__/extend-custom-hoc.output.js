const React = require('react');
const PropTypes = require('prop-types');

const someHoc = require('../someHoc');
const CustomClassComponent = require('../CustomClassComponent');

class ExtendCustomHocComponent extends CustomClassComponent {
  render() {
    return <div {...this.props} />;
  }
}

ExtendCustomHocComponent.propTypes = {
  data: PropTypes.array.isRequired,
  isBad: PropTypes.boolean.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  isCool: PropTypes.boolean
};

ExtendCustomHocComponent.defaultProps = {
  height: null,
  width: null,
  isCool: false
};

export default someHoc(ExtendCustomHocComponent);
