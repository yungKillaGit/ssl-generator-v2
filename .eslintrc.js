module.exports = {

    env: {
        // browser: true,
        es6: true,
        node: true,
    },

    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },

    plugins: [
        'node',
    ],

    extends: [
        'eslint:recommended',
    ],

    settings: {},

    rules: {
        'array-element-newline': ['warn', 'consistent'],
        'arrow-parens': ['warn', 'as-needed'],
        'arrow-spacing': 'warn',
        'block-scoped-var': 'error',
        'brace-style': ['warn', '1tbs'],
        'comma-dangle': ['warn', 'always-multiline'],
        'comma-spacing': 'warn',
        // 'curly': ['warn', 'multi-or-nest', 'consistent'],
        'curly': ['warn', 'all'],
        'dot-location': ['warn', 'property'],
        'eol-last': ['warn', 'always'],
        'func-call-spacing': 'warn',
        'function-paren-newline': ['warn', 'consistent'],
        'getter-return': 'warn',
        'indent': ['warn', 4, {MemberExpression: 1, SwitchCase: 1}],
        'key-spacing': ['warn', {afterColon: true, mode: 'strict'}],
        'keyword-spacing': ['warn', {after: true, before: true}],
        'linebreak-style': ['error', 'unix'],
        'lines-around-comment': ['warn', {beforeBlockComment: true}],
        'lines-between-class-members': ['warn', 'always'],
        'newline-per-chained-call': ['warn', {ignoreChainWithDepth: 3}],
        'no-async-promise-executor': 'warn',
        'no-cond-assign': 'warn',
        'no-console': 'off',
        'no-control-regex': 'warn',
        'no-extra-parens': 'warn',
        'no-multi-spaces': 'warn',
        'no-multiple-empty-lines': ['warn', {max: 1, maxEOF: 1, maxBOF: 0}],
        'no-return-await': 'warn',
        'no-trailing-spaces': ['warn', {ignoreComments: true}],
        'no-unused-vars': 'warn',
        'no-whitespace-before-property': 'warn',
        'object-curly-newline': ['warn', {multiline: true, minProperties: 5}],
        'object-curly-spacing': ['warn', 'never'],
        'object-property-newline': ['warn', {allowAllPropertiesOnSameLine: true}],
        'one-var': ['warn', 'never'],
        'prefer-arrow-callback': 'warn',
        'prefer-const': 'warn',
        'prefer-template': 'warn',
        'quote-props': ['warn', 'consistent-as-needed', {numbers: true}],
        'quotes': ['warn', 'single'],
        'semi': ['warn', 'always'],
        'sort-imports': ['warn', {ignoreDeclarationSort: true}],
        'space-before-blocks': 'warn',
        'space-before-function-paren': ['warn', {anonymous: 'never', named: 'never', asyncArrow: 'always'}],
        'space-in-parens': ['warn', 'never'],
        'space-infix-ops': ['warn', {int32Hint: true}],
        'space-unary-ops': ['warn', {words: true, nonwords: false}],
        'spaced-comment': ['warn', 'always', {exceptions: ['-', '+']}],
        'switch-colon-spacing': ['warn', {after: true, before: false}],
        'template-curly-spacing': 'warn',
        'template-tag-spacing': ['warn', 'never'],
        'use-isnan': 'warn',
    },

    // TypeScript overrides
    overrides: [
        {
            files: ['*.ts', '*.tsx'],

            parserOptions: {project: './tsconfig.json'},

            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
            ],

            plugins: [
                '@typescript-eslint',
                'import',
                'mocha',
                'node',
            ],

            rules: {
                'brace-style': 'off',
                'comma-spacing': 'off',
                'func-call-spacing': 'off',
                'keyword-spacing': 'off',
                'lines-between-class-members': 'off',
                'no-extra-parens': 'off',
                'no-unused-vars': 'off',
                'quotes': 'off',
                'semi': 'off',
                'space-before-function-paren': 'off',
                '@typescript-eslint/brace-style': ['warn', '1tbs'],
                '@typescript-eslint/camelcase': 'off',
                '@typescript-eslint/comma-spacing': 'warn',
                '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/func-call-spacing': 'warn',
                '@typescript-eslint/keyword-spacing': ['warn', {after: true, before: true}],
                '@typescript-eslint/lines-between-class-members': ['warn', 'always'],
                '@typescript-eslint/member-delimiter-style': 'warn',
                '@typescript-eslint/naming-convention': ['warn',
                    {selector: 'variable', format: ['camelCase', 'UPPER_CASE']},
                    {selector: 'variable', types: ['boolean'], format: ['PascalCase'], prefix: ['can', 'did', 'do', 'has', 'is', 'should', 'use', 'will', 'with']},
                    {selector: 'class', format: ['PascalCase']},
                    {selector: 'class', modifiers: ['abstract'], format: ['PascalCase'], custom: {regex: '^Abstract[A-Z]', match: true}},
                    {selector: 'interface', format: ['PascalCase'], custom: {regex: '^I[A-Z]', match: true}},
                ],
                '@typescript-eslint/no-empty-function': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-extra-parens': 'warn',
                '@typescript-eslint/quotes': ['warn', 'single'],
                '@typescript-eslint/semi': ['warn', 'always'],
                '@typescript-eslint/space-before-function-paren': ['warn', {anonymous: 'never', named: 'never', asyncArrow: 'always'}],
                'import/order': ['warn', {'alphabetize': {order: 'asc', caseInsensitive: true}, 'newlines-between': 'always'}],
                // 'import/group-exports': 'warn',
            },
        },
    ],
};