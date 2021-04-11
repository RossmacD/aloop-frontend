import { Flex } from '@fluentui/react-northstar'
import React from 'react'

interface Props {

}

export const AdminPage: React.FC<Props> = ({ children }) => {
    return (
        <Flex>
            {children}
        </Flex>
    )
}