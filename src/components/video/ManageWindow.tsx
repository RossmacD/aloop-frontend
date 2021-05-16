import { Flex, Input, Button, SendIcon, Text } from '@fluentui/react-northstar';
import React, { SyntheticEvent } from 'react'
import { MessageIcon, CancelIcon } from '../../style/icons';
import { gsaTheme } from '../../style/theme';
import { MessageChannelIcon } from '../../style/icons'
import { useGetUsers } from "../../api/authQueries"
import { useGetTextChannelUsersQuery } from "../../api/messageQueries"
import { colors } from '../../style/colors'

interface Props {
    selectedTextChan: [number, String],
    setSelectedTextChan: React.Dispatch<React.SetStateAction<[number, String] | undefined>>
}

export const ManageWindow: React.FC<Props> = ({ children, selectedTextChan, setSelectedTextChan }) => {

    const { data } = useGetUsers()
    const { data: textuserData } = useGetTextChannelUsersQuery(selectedTextChan[0]);

    return (
        <Flex style={{ width: '24rem', height: '100%', position: "relative", top: 0, left: 0, flexDirection: "column" }}>
            <Flex style={{ width: "100%", padding: "1rem 0 1rem 0", backgroundColor: gsaTheme.siteVariables.colors.grey['100'], flexDirection: "column" }} >
                <Flex style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <MessageChannelIcon /><Text size="largest">{selectedTextChan[1]}</Text >
                </Flex>
                <Text>Users:</Text>
                {data?.map((user: any) => (<Text styles={textuserData?.filter(text_user => user.user_id === text_user.user_id).length !== 0 ? { color: colors.green["400"] } : {}} key={`userKey:${user.user_id}`}>{user.email}</Text>))}
            </Flex>
            <Button onClick={() => { setSelectedTextChan(undefined) }} styles={{
                alignSelf: 'flex-end', position: 'absolute', top: '1rem', right: '-1rem', ':hover': {
                    backgroundColor: gsaTheme.siteVariables.colors.grey['800'],
                },
            }} icon={<CancelIcon />} iconOnly title="Close" circular />
        </Flex >
    )
}