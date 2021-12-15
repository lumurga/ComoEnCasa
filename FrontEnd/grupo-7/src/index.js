import React, {Suspense} from 'react';
import "./i18n"
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<h1>Loading...</h1>} >
    <App/>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

