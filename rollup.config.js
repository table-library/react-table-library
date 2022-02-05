import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
// import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import ts from '@wessberg/rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default {
  input: {
    main: './src/index.ts',
    types: './src/types/index.ts',
    common: './src/common/index.ts',
    table: './src/table/index.ts',
    theme: './src/theme/index.ts',
    sort: './src/sort/index.ts',
    select: './src/select/index.ts',
    tree: './src/tree/index.ts',
    pagination: './src/pagination/index.ts',
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
    ts({
      transpiler: 'babel',
    }),
    // typescript({ sourceMap: true }),
    terser({
      module: true,
    }),
  ],
};
