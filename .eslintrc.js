const OFF = 'off';
const ERROR = 'error';
// const WARN = 'warn';

module.exports = {
  root          : true,
  parser        : '@typescript-eslint/parser',
  plugins       : [
    '@typescript-eslint'
  ],
  extends       : [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  env           : {
    node : true,
    mocha: true
  },
  ignorePatterns: [
    'node_modules',
    '*.config.*',
    'dist',
    '*.stories.tsx',
    '*.stories.mdx',
  ],
  rules         : {
    '@typescript-eslint/ban-ts-comment'    : [
      ERROR,
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore'      : 'allow-with-description',
        'ts-nocheck'     : 'allow-with-description',
        'ts-check'       : 'allow-with-description'
      }
    ],
    'no-shadow'                            : OFF,
    '@typescript-eslint/no-shadow'         : ERROR,
    '@typescript-eslint/no-empty-interface': OFF,
    '@typescript-eslint/no-explicit-any'   : [
      ERROR,
      {
        ignoreRestArgs: true
      }
    ],
    'react/no-unknown-property'            : [
      ERROR,
      { ignore: ['css'] }
    ]
  }
};
