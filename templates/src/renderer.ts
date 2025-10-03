/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter';
import './index.css';

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack',
);

// 获取根元素
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

// 创建 React 根并渲染应用
const root = createRoot(container);
root.render(React.createElement(AppRouter));
