

import { Flex } from '@fluentui/react-northstar'
import React from 'react'

interface Props {

}

export const SidePanel: React.FC<Props> = ({ children }) => {
    return (
        <Flex styles={{ position: 'absolute', height: '100vh', left: 0 }}>
            {children}
        </Flex >
    )
}