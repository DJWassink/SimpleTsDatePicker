import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';

import pkg from './package.json';

const shared = {
    external: ['react'],
    input: `compiled/simple_datepicker.js`
};

export default [
    Object.assign({}, shared, {
        output: {
            exports: 'named',
            file:
                process.env.NODE_ENV === 'production'
                    ? './dist/simple_datepicker.umd.min.js'
                    : './dist/simple_datepicker.umd.js',
            format: 'umd',
            globals: {react: 'React'},
            name: 'SimpleDatePicker',
            sourcemap: true
        },

        plugins: [
            postcss({
                extract: true
            }),
            resolve(),
            replace({
                exclude: 'node_modules/**',
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }),
            commonjs({
                include: /node_modules/,
                namedExports: {
                    'node_modules/prop-types/index.js': [
                        'object',
                        'oneOfType',
                        'string',
                        'node',
                        'func',
                        'bool',
                        'element'
                    ]
                }
            }),
            sourceMaps(),
            process.env.NODE_ENV === 'production' && filesize(),
            process.env.NODE_ENV === 'production' &&
                uglify({
                    compress: {keep_infinity: true, pure_getters: true},
                    ecma: 5,
                    output: {comments: false, ascii_only: true},
                    toplevel: false,
                    warnings: true
                })
        ]
    }),

    Object.assign({}, shared, {
        external: shared.external.concat(Object.keys(pkg.dependencies)),
        output: [
            {
                file: 'dist/simple_datepicker.es6.js',
                format: 'es',
                sourcemap: true
            },
            {
                file: 'dist/simple_datepicker.js',
                format: 'cjs',
                sourcemap: true
            }
        ],
        plugins: [
            postcss({extract: true}),
            resolve(),
            sourceMaps(),
            process.env.NODE_ENV === 'production' && filesize()
        ]
    })
];
