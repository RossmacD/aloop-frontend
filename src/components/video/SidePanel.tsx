

import { Flex, Text, Button } from '@fluentui/react-northstar'
import React from 'react'

interface Props {

}

export const SidePanel: React.FC<Props> = ({ children }) => {
    return (
        <Flex styles={{ position: 'absolute', height: '100%', left: 0, top: 0, bottom: 0 }}>

            {children}
        </Flex >
    )
}