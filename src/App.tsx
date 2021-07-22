import useAccountContext, { AccountContext } from 'contexts/accounts';
import React from 'react';
import { Helmet } from 'react-helmet';
import ExchangeScreen from './screens/exchange';

function App() {
  const { contextValue } = useAccountContext();
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Exhange Widget - Revolut HomeTask</title>
      </Helmet>
      <AccountContext.Provider value={contextValue}>
        <ExchangeScreen />
      </AccountContext.Provider>
    </div>
  );
}

export default App;
