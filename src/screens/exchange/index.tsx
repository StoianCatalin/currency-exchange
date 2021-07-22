import { Card, Layout, Divider, Button } from 'components/layout';
import React from 'react';
import { Title, Subtitle } from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import CurrencyInput from './components/currency-input';

export default function ExchangeScreen() {

    return (
        <Layout>
            <Card>
                <Title>Sell RON</Title>
                <Subtitle>
                    <FontAwesomeIcon icon={faChartArea} />
                    RON 1 = $0.32
                </Subtitle>
                <Divider></Divider>
                <CurrencyInput />
                <CurrencyInput />
                <Button>Sell RON to EUR</Button>
            </Card>
        </Layout>
    );
} 
