import { Button, Flex, Menu, MenuItemProps, MenuShorthandKinds, ShorthandCollection, Chat, Text, Label } from '@fluentui/react-northstar'
import React, { useContext, useEffect, useState } from 'react'
import { useGetVideoChannelQuery } from '../api/videoQueries'
import { useGetTextChannelQuery } from '../api/messageQueries'
import { VideoCall } from '../components/video/VideoCall'
import { CancelIcon } from '../style/icons'
import { gsaTheme } from '../style/theme'
import { makeAction } from '../utils/MakeAction'
import CenteredPage from './templates/CenteredPage'
import { SocketContext } from '../components/app/SocketProvider'
import { ChatWindow } from '../components/chat/ChatWindow'
interface Props {

}

export const VideoPage: React.FC<Props> = ({ children }) => {
    const { data, error, isFetching } = useGetVideoChannelQuery();
    const { data: textChanData, error: textChanError, isFetching: textChanIsFetching } = useGetTextChannelQuery();
    // const { data: textChanData, error: textChanError, isFetching: textChanIsFetching } = useGetTextChannelQuery();
    const [selectedRoom, setSelectedRoom] = useState<undefined | String>(undefined)
    const socketContext = useContext(SocketContext)
    const [selectedTextChan, setSelectedTextChan] = useState<[number, String] | undefined>(undefined)
    const [unseenCounter, setUnseenCounter] = useState<number[]>([])
    const divider = (id: number) => ({
        key: 'divider' + id,
        kind: 'divider',
    })

    const textChanMenu: ShorthandCollection<MenuItemProps, MenuShorthandKinds> = [
        {
            key: 'heading1',
            content: "Text Channels",
            kind: "divider",

        },
        divider(1),
    ]

    const vidChanMenu: ShorthandCollection<MenuItemProps, MenuShorthandKinds> = [
        {
            key: 'heading2',
            content: "Video Rooms",
            kind: "divider",

        },
        divider(2),
    ]

    const [menuItems, setMenuItems] = useState(vidChanMenu)

    const setRoom = (room: String) => {
        socketContext?.socket?.current?.joinVidChan(room, (action) => {
            console.log("Selecting room:", `${room}`)
            setSelectedRoom(`#?${room}`)
        })
    }

    useEffect(() => {
        if (data && textChanData) {
            setMenuItems([
                ...textChanMenu,
                ...textChanData.map((channel) => ({
                    key: channel.text_channel_id,
                    content: (
                        <Text content={(<>
                            {channel.channel_name}
                            {unseenCounter[channel.text_channel_id] && unseenCounter[channel.text_channel_id] > 0 ? <Label
                                styles={{ position: "absolute", right: "0.1rem" }}
                                content={unseenCounter[channel.text_channel_id]}
                                // color={""}
                                circular
                            /> : ""}
                        </>)} >

                        </Text>),
                    action: () => {
                        setSelectedTextChan([channel.text_channel_id, channel.channel_name])
                        setUnseenCounter(oldCounter => {
                            oldCounter[channel.text_channel_id] = 0
                            return [...oldCounter]
                        })
                    },
                    children: makeAction,
                })),
                ...vidChanMenu,
                ...data.map((channel) => ({
                    key: channel.video_channel_id,
                    content: channel.channel_name,
                    action: () => {
                        setRoom(channel.channel_name)
                    },
                    children: makeAction,
                }))])
        }
    }, [data, textChanData])

    useEffect(() => {
        socketContext?.socket?.current?.changeSetUnseetCounter(setUnseenCounter);
        return () => {
            socketContext?.socket?.current?.clearHandler("ROOM_JOIN");
            socketContext?.socket?.current?.changeSetUnseetCounter(undefined);
        }
    }, [])


    return (
        <>
            <Flex style={{ width: '100vw', height: '100vh' }}>
                <Flex style={{ width: '16rem', position: 'relative', top: 0, left: 0, height: '100vh' }}>
                    <Menu
                        styles={{ height: '100vh', width: '100%', backgroundColor: gsaTheme.siteVariables.colors.grey['50'] }}
                        items={menuItems}
                        pointing
                        vertical
                    />

                </Flex>
                {selectedTextChan !== undefined ? (
                    <ChatWindow selectedTextChan={selectedTextChan} setSelectedTextChan={setSelectedTextChan} />
                ) : ""}

                {/* <VideoCall selectedRoom={selectedRoom}></VideoCall> */}
            </Flex>
        </>
    )
}
