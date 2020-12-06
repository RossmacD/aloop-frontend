import React, { ReactElement } from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { gsaTheme } from '../../style/theme';

interface Props {
    vertCenter?: boolean
}

const CenteredPage: React.FC<Props> = ({ children, vertCenter: vertCenter = false }) => (
    <Flex styles={{ height: '100vh', overflowY: 'scroll', width: '100%', justifyContent: 'center', backgroundColor: gsaTheme.siteVariables.colors.grey[200] }}>
        <Flex styles={{ minHeight: '80vh', height: 'fit-content', justifyContent: vertCenter ? 'center' : 'flex-start', alignItems: 'center', flexDirection: 'column', margin: '10vh 2rem', padding: '2rem', backgroundColor: gsaTheme.siteVariables.colors.white, width: 'min( 50rem, 100%)' }}>
            {children}
        </Flex>
    </Flex>
);


export default CenteredPage;
