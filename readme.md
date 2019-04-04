## codemods

This repository contains a collection of codemod scripts for use with
[JSCodeshift](https://github.com/facebook/jscodeshift).

### Tools

* https://astexplorer.net/- useful for testing and visualizing AST (Abstract Syntax Tree) transformations

Available types for writing codemods and manipulating AST with jscodeshift API are inherited from `ast-types` package, which implements `Esprima` API pionneered by `Mozilla Parser API`
* https://github.com/benjamn/ast-types
* https://esprima.readthedocs.io/en/latest/syntax-tree-format.html
* https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API

### Setup & Run

```sh
npm install -g jscodeshift
git clone git@github.com:ricovitch/codemod-react-default-props.git
jscodeshift -t <codemod-script> <file>
```

Use the `-d` option for a dry-run and use `-p` to print the output for
comparison.

### Included Scripts

#### `default-props`

Adds default values for optional proptypes (does nothing if defaultProps assignment exists already)

```sh
jscodeshift -t codemods/transforms/default-props.js <path>
```

### TODOs

* Use `ReactUtils` module from `react-codemod` package instead of copy-pasting
* Extract reusable util method from `default-props.js` module
* Support modules with multiple components and multiple propTypes definitions (common/InputOrStatic)
* Support functional components with HOCs / non arrow function declaration (componentName undefined)
* Support modules with existing but incomplet defaultProps ?
* Add trailing commas at end of lines (with option do deactivate ?) https://eslint.org/docs/rules/comma-dangle