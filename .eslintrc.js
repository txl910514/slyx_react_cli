// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ['standard', 'standard-react'],
  // required to lint *.vue files
  plugins: [
    'html',
    'react'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'react/jsx-uses-react': 'error',
    // 'react/jsx-uses-vars': 'error',
    // 'react/jsx-indent': [0, 2],
    'jsx-quotes': [2, 'prefer-double'],  
    'react/jsx-indent-props': [0, 2]
  }
}
