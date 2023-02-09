import fs from 'fs';
import { resolve } from 'path';
import ts from 'rollup-plugin-ts';
import commonjs from '@rollup/plugin-commonjs';

const outputDir = resolve('./dist');

const rmdir = (dir) => fs.existsSync(dir) && fs.statSync(dir).isDirectory() && fs.rmSync(dir, { recursive: true });

const interop = (id) => {
  const patterns = [
    'clsx',
    '@mui/material'
  ];
  const regex = new RegExp(`^(${patterns.join('|')})`);
  if (regex.test(id)) {
    return 'auto';
  }
  return 'default';
};

export default {
  input  : 'src/index.ts',
  output : [
    {
      file   : `${outputDir}/index.js`,
      format : 'cjs',
      interop: interop
    }
  ],
  plugins: [
    rmdir(outputDir),
    ts({
      tsconfig: './tsconfig.json'
    }),
    commonjs({
      include     : ['node_modules/**'],
      ignoreGlobal: false
    })
  ]
};
