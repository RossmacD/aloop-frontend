import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { gsaTheme } from './style/theme';
import { Provider } from '@fluentui/react-northstar';
import { bobbing } from './style/animations';
gsaTheme.animations.bobbing = bobbing;

ReactDOM.render(
  <React.StrictMode>
    <Provider theme={gsaTheme}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
