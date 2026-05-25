/**
 * CodeMirror 6 bundle entry.
 * Build: npm install && npm run build
 * Output: codemirror-bundle.js (IIFE, single file for offline use).
 * Exposes window.CodeMirrorBundle with createEditor(options).
 */
import { EditorView, minimalSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';

function createEditor(options) {
  const { parent, value = '', language = 'html', onChange } = options;
  const extensions = [
    minimalSetup,
    language === 'html' ? html() : language === 'css' ? css() : javascript(),
    EditorView.updateListener.of((vu) => {
      if (vu.docChanged && typeof onChange === 'function') {
        onChange(vu.state.doc.toString());
      }
    })
  ];
  const view = new EditorView({
    doc: value,
    extensions,
    parent
  });
  view.getValue = () => view.state.doc.toString();
  view.setValue = (str) => {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: str || '' }
    });
  };
  return view;
}

export { createEditor, EditorView, minimalSetup, html, javascript, css };
