import { Web3ReactProvider } from '@web3-react/core';
import { ToastContainer } from 'components/Toast/Toast';
import { DesignProvider } from 'design/DesignContext';
import { DesignSystem } from 'design/enums/design-system.enum';
import { reduxStore } from 'global-state';
import { getLibrary } from 'helpers/blockchain.helpers';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'reflect-metadata';
import { IntlProvider } from 'utilities/i18n/IntlContext';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <DesignProvider system={DesignSystem.MATERIAL_UI}>
        <IntlProvider>
          <ReduxProvider store={reduxStore}>
            <BrowserRouter>
              <App />

              <ToastContainer position="bottom-right" />
            </BrowserRouter>
          </ReduxProvider>
        </IntlProvider>
      </DesignProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
