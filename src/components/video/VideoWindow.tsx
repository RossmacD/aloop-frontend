import { Flex, Input, Button, SendIcon, Text, List } from '@fluentui/react-northstar';
import React, { SyntheticEvent, useMemo } from 'react'
import { VideoChannelIcon, CancelIcon, AddedUserIcon } from '../../style/icons';
import { gsaTheme } from '../../style/theme';
import { MessageChannelIcon, PlusIcon } from '../../style/icons'
import { useGetUsers, UserRes } from "../../api/authQueries"
import { useGetVideoChannelUsersQuery, useAddUserVideoChannelQuery } from "../../api/videoQueries"
import { colors } from '../../style/colors'

interface Props {
    selectedRoom: [number, String],
    setSelectedRoom: React.Dispatch<React.SetStateAction<[number, String] | undefined>>
}

export const VideoWindow: React.FC<Props> = ({ children, selectedRoom, setSelectedRoom }) => {

    const { data } = useGetUsers()
    const { data: textUserData } = useGetVideoChannelUsersQuery(selectedRoom[0]);
    const { mutate } = useAddUserVideoChannelQuery()
    // const unassignedUsers = useMemo(() => {
    //     const outUsers = []

    //     for(const text of data)

    //     return outUsers
    // }, [data, textUserData])

    return (
        <Flex style={{ width: '28rem', height: '100%', position: "relative", top: 0, left: 0, flexDirection: "column" }}>
            <Flex style={{ width: "100%", padding: "1rem 0 1rem 0", backgroundColor: gsaTheme.siteVariables.colors.grey['50'], flexDirection: "column", height: "100vh", overflowY: "scroll" }} >
                <Flex style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <VideoChannelIcon /><Text size="large">{selectedRoom[1]}</Text >
                </Flex>
                <Text>Added Users:</Text>
                <List items={textUserData?.map((user: any) => ({
                    key: "added" + user.user_id,
                    // media: <Status state="error" icon={<ErrorIcon />} />,
                    icon: <AddedUserIcon />,
                    header: "🟢 " + user.first_name + " " + user.last_name,
                    content: user.email,
                    // headerMedia: <Button iconOnly icon={<PlusIcon />} onClick={() => mutate({ chan_id: selectedTextChan[0], user: user })}></Button>,
                }))} />

                {/* {textUserData?.map((user: any) => (<Text styles={{ color: colors.green["400"] }} key={`userKey:${user.user_id}`}>{user.email}</Text>))} */}
                <Text>Other Users:</Text>
                <List items={data?.filter((all_user: UserRes) => textUserData?.findIndex((added_user) => added_user.user_id === all_user.user_id) === -1).map((user: any) => ({
                    key: "added" + user.user_id,
                    // media: <Status state="error" icon={<ErrorIcon />} />,
                    // icon: <AddedUserIcon />,
                    header: user.first_name + " " + user.last_name,
                    content: user.email,
                    endMedia: <Button styles={{ position: "absolute" }} iconOnly icon={<PlusIcon />} onClick={() => mutate({ chan_id: selectedRoom[0], user: user })}></Button>,
                }))} />


                {/* {data?.filter((all_user: UserRes) => textUserData?.findIndex((added_user) => added_user.user_id === all_user.user_id) === -1).map((user: any) => (<Text key={`userKey:${user.user_id}`}>{user.email}<Button iconOnly icon={<PlusIcon />} onClick={() => mutate({ chan_id: selectedTextChan[0], user: user })}></Button></Text>))} */}
            </Flex>
            <Button onClick={() => { setSelectedRoom(undefined) }} styles={{
                alignSelf: 'flex-end', position: 'absolute', top: '1rem', right: '-1rem', ':hover': {
                    backgroundColor: gsaTheme.siteVariables.colors.grey['800'],
                },
            }} icon={<CancelIcon />} iconOnly title="Close" circular />
        </Flex >
    )
}