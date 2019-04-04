/* eslint-disable no-console */
import ReactUtils from './utils/ReactUtils';

// helpers inspired from
// https://github.com/reactjs/react-codemod/blob/master/transforms/React-PropTypes-to-prop-types.js
const hasImportOrRequire = (j, root, packageName) => {
  const hasImport = root.find(j.ImportDeclaration, {
    source: { value: packageName },
  }).length > 0;

  const hasRequire = root.find(j.CallExpression, {
    callee: { name: 'require' },
    arguments: { 0: { value: packageName } },
  }).length > 0;

  return hasImport || hasRequire;
};

/**
 * returns React component name (default to named export)
 * @param r ReactUtils instance
 * @param root
 * @returns {*}
 */
const getReactComponentName = (j, r, root) => {
  const classPath = root.find(j.ClassDeclaration);
  if (classPath.size()) {
    return r.getComponentName(classPath.at(0).get());
  }

  const exportPath = root.find(j.ExportDefaultDeclaration);
  if (exportPath.size()) {
    return exportPath.at(0).get().node.declaration.name;
  }

  const moduleExportPath = root.find(j.AssignmentExpression, {
    left: {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: 'module',
      },
      property: {
        type: 'Identifier',
        name: 'exports',
      },
    },
  });
  if (moduleExportPath) {
    return moduleExportPath.at(0).get().node.right.name;
  }

  return null;
};

/**
 * filter method to use with AssignmentExpression node collections
 * eg. ComponentClassName.propTypes
 * @param name left property name
 * @returns {function({node: *}): (*|boolean)}
 */
const hasLeftProperty = name => ({ node }) => (
  node.operator === '='
  && node.left.type === 'MemberExpression'
  && node.right.type === 'ObjectExpression'
  && node.left.property.type === 'Identifier'
  && node.left.property.name === name
);

/**
 * filter method to use with ClassProperty node collections
 * eg. static propTypes = {...}
 * @param name identifier name
 * @returns {function({node: *}): (*|boolean)}
 */
const hasIdentifier = name => ({ node }) => (
  node.key
  && node.key.type === 'Identifier'
  && node.key.name === name
);

/**
 * filter method to return only optional props
 * @param prop
 */
const isPropOptional = prop => {
  const valueType = prop.value.type;
  if (valueType === 'MemberExpression') {
    return !(prop.value.property.name === 'isRequired');
  }
  return true;
};

/**
 * jscodeshift compatible transform
 * @param file input src file
 * @param api jscodeshift api
 * @returns {*}
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const r = ReactUtils(j);
  const root = j(file.source);

  // no 'prop-types' import or require : do nothing
  // already has defaultProps : do nothing
  const hasProptypesImport = hasImportOrRequire(j, root, 'prop-types');
  const hasDefaultProps = root.find(j.AssignmentExpression).filter(hasLeftProperty('defaultProps')).length > 0;
  if (!r.hasReact(root) || !hasProptypesImport || hasDefaultProps) {
    return root.toSource();
  }

  // get proptypes in different flavors
  const propTypesAssignments = root.find(j.AssignmentExpression).filter(hasLeftProperty('propTypes'));
  const propTypesClassProperties = root.find(j.ClassProperty).filter(hasIdentifier('propTypes'));
  const hasPropTypesAssignment = propTypesAssignments.size() > 0;
  const hasPropTypesClassProperty = propTypesClassProperties.size() > 0;

  let propTypesPath;
  let props = [];
  if (hasPropTypesAssignment) {
    propTypesPath = propTypesAssignments.at(0).get();
    props = propTypesPath.node.right.properties;
  } else if (hasPropTypesClassProperty) {
    propTypesPath = propTypesClassProperties.at(0).get();
    props = propTypesPath.node.value.properties;
  }
  props = props.filter(isPropOptional);
  if (props.length === 0) {
    return root.toSource();
  }

  const componentName = getReactComponentName(j, r, root);
  console.info(`Component: ${componentName} has ${props.length} optional props`);

  // map optional props to defaultProps
  const defaultProps = j.objectExpression(props
    .map((prop) => {
      const propName = prop.key.name;
      const propType = (prop.value.property && prop.value.property.name) || 'complex';
      return j.property(
        'init',
        j.identifier(propName),
        j.literal((propType === 'boolean' || propType === 'bool') ? false : null),
      );
    })
  );

  // set default props in different flavors
  if (hasPropTypesAssignment) {
    j(propTypesPath.parent).insertAfter(
      j.expressionStatement(
        j.assignmentExpression(
          '=',
          j.memberExpression(
            j.identifier(componentName),
            j.identifier('defaultProps'),
            false,
          ),
          defaultProps,
        )
      )
    );

  } else if (hasPropTypesClassProperty) {
    j(propTypesPath).insertAfter(
      j.classProperty(
        j.identifier('defaultProps'),
        defaultProps,
        null,
        true,
      )
    );
  }

  return root.toSource();
}
