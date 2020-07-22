import { keys } from 'lodash';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    external: [
      'lodash/clone',
      'lodash/camelCase',
      'lodash/find',
      'lodash/forEach',
      'lodash/isEmpty',
      'lodash/keys',
      'lodash/map',
      'lodash/merge',
      'lodash/toLower',
      'lodash/toUpper',
      ...keys(pkg.dependencies),
      ...keys(pkg.peerDependencies),
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        interop: false,
        esModule: false,
        preferConst: true,
        strict: true,
      },
      { file: pkg.module, format: 'es' },
    ],
  },
];
