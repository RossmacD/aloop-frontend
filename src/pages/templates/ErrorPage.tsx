import React, { ReactElement } from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { gsaTheme } from '../../style/theme';
import { Link } from 'react-router-dom';

interface ErrorPageProps {
    error: {
        number: number;
        message: string;
    }
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => (
    <Flex styles={{ minHeight: '100vh', width: '100%', justifyContent: 'center', backgroundColor: gsaTheme.siteVariables.colors.grey[300] }}>
        <Flex style={{ fontSize: '15rem', justifyContent: 'center', alignItems: 'center' }}>🤯</Flex>
        <Flex styles={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '10vh 2rem', padding: '2rem' }}>
            <h1 style={{ fontSize: '6rem', fontWeight: 700 }}>{error.number}</h1>
            <h1>{error.message}</h1>
            <Button as={Link} to='/' primary >Take me Home</Button>
        </Flex>
    </Flex >
);


export default ErrorPage;