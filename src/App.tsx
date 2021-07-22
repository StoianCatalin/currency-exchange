import React from 'react';
import { Helmet } from 'react-helmet';
import ExchangeScreen from './screens/exchange';

function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Exhange Widget - Revolut HomeTask</title>
      </Helmet>
      <ExchangeScreen />
    </div>
  );
}

export default App;
