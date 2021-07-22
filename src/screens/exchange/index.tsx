import React, { useContext } from 'react';
import { Card, Layout, Divider, Button } from 'components/layout';
import { Title, Subtitle } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import CurrencyInput from './components/currency-field';
import CurrencySwitchButton from './components/currency-switch-button';
import CURRENCIES from 'constants/currencies';
import { AccountContext } from 'contexts/accounts';

export default function ExchangeScreen() {
    const { state } = useContext(AccountContext);
    console.log(state);
    return (
        <Layout>
            <Card>
                <Title>Sell RON</Title>
                <Subtitle>
                    <FontAwesomeIcon icon={faChartArea} />
                    RON 1 = $0.32
                </Subtitle>
                <Divider></Divider>
                <CurrencyInput currencies={CURRENCIES} />
                <CurrencySwitchButton />
                <CurrencyInput currencies={CURRENCIES} />
                <Button>Sell RON to EUR</Button>
            </Card>
        </Layout>
    );
} 
