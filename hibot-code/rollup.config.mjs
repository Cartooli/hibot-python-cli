import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'editor-bundle.mjs',
  output: {
    file: 'codemirror-bundle.js',
    format: 'iife',
    name: 'CodeMirrorBundle'
  },
  plugins: [nodeResolve()]
};
