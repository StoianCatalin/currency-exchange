import React from 'react';
import { Card, Layout, Divider, Button } from 'components/layout';
import { Title, Subtitle } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import CURRENCIES from 'constants/currencies';
import useExchanger from './components/exchanger/hooks/useExchanger';
import Exchanger from './components/exchanger';

export default function ExchangeScreen() {
    const exchanger = useExchanger();
    console.log('rerender');

    const fromCurrency = CURRENCIES.find(currency => currency.value === exchanger.fromInput.currency);
    const toCurrency = CURRENCIES.find(currency => currency.value === exchanger.toInput.currency);
    if (!fromCurrency || !toCurrency) {
        return null;
    }

    return (
        <Layout>
            <Card>
                <Title>Sell {fromCurrency.label}</Title>
                <Subtitle>
                    <FontAwesomeIcon icon={faChartArea} />
                    {fromCurrency.symbol}1 = {toCurrency.symbol}0.32
                </Subtitle>
                <Divider></Divider>
                <Exchanger exchanger={exchanger} />
                <Button>
                    Sell {fromCurrency.label} to {toCurrency.label}
                </Button>
            </Card>
        </Layout>
    );
} 
