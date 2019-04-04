// @see https://github.com/facebook/jscodeshift#unit-testing
import { defineTest } from 'jscodeshift/dist/testUtils';

// test cases that should do no changes
defineTest(__dirname, 'default-props', null, 'no-imports');
defineTest(__dirname, 'default-props', null, 'has-default');

// proptypes declared as component Assignment Expression (Class)
defineTest(__dirname, 'default-props', null, 'class-assignment');

// proptypes declared as component Assignment Expression (functional)
defineTest(__dirname, 'default-props', null, 'functional-assignment');

// proptypes declared as component Assignment Expression (functional)
defineTest(__dirname, 'default-props', null, 'module-export');

// proptypes declared as component Class Property (static)
defineTest(__dirname, 'default-props', null, 'class-property');

// component that extends a custom class, and export with a hoc
defineTest(__dirname, 'default-props', null, 'extend-custom-hoc');