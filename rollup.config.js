import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
// import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import ts from '@wessberg/rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default {
  input: {
    main: './src/index.js', // ts
    common: './src/common/index.js', // ts
    panel: './src/panel/index.js', // ts
    table: './src/table/index.js', // ts
    theme: './src/theme/index.js', // ts
    sort: './src/sort/index.js', // ts
    select: './src/select/index.js', // ts
    tree: './src/tree/index.js', // ts
    pagination: './src/pagination/index.js', // ts
  },

  output: [
    // ES module version, for modern browsers
    {
      name: '@table-library/react-table-library',
      dir: `${__dirname}/lib`,
      format: 'es',
      sourcemap: true,
      entryFileNames: '[name].js',
      // preserveModules: true,
    },
    // SystemJS version, for older browsers
    // {
    //   dir: `${__dirname}/lib/nomodule`,
    //   format: 'system',
    //   sourcemap: true,
    // },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    del({ targets: 'lib/*' }),
    peerDepsExternal(),
    postcss({
      modules: true,
    }),
    resolve({
      browser: true,
    }),
    commonjs({
      sourceMap: true,
      exclude: 'src/**',
    }),
    // ts({
    //   transpiler: 'babel'
    // }),

    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
    // typescript({ sourceMap: true }),
    terser({
      module: true,
    }),
  ],
};
