
import React from 'react';
import AppNavBar from './components/AppNavBar';
import Editor from './components/Editor';

export default () => (
  <div>
    <AppNavBar label="App" screen="app/main" />
    <h1>The App</h1>
    <Editor />
  </div>
);
