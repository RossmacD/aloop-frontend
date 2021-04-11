import { MenuButton, Button, Flex, Menu, MenuItemProps, MenuShorthandKinds, ShorthandCollection, Chat, Text, Label } from '@fluentui/react-northstar'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useGetVideoChannelQuery } from '../api/videoQueries'
import { useGetTextChannelQuery } from '../api/messageQueries'
import { VideoCall } from '../components/video/VideoCall'
import { CancelIcon, MessageChannelIcon, VertMenuIcon } from '../style/icons'
import { gsaTheme } from '../style/theme'
import { makeAction, makeMenuAction } from '../utils/MakeAction'
import CenteredPage from './templates/CenteredPage'
import { SocketContext } from '../components/app/SocketProvider'
import { ChatWindow } from '../components/chat/ChatWindow'
import { AuthUserContext } from '../components/app/App'
export interface UnseenCounter { [key: number]: number }
interface Props {

}

export const VideoPage: React.FC<Props> = ({ children }) => {
    const { data: vidChanData, error, isFetching } = useGetVideoChannelQuery();
    const { data: textChanData, error: textChanError, isFetching: textChanIsFetching } = useGetTextChannelQuery();
    // const { data: textChanData, error: textChanError, isFetching: textChanIsFetching } = useGetTextChannelQuery();
    const [selectedRoom, setSelectedRoom] = useState<undefined | String>(undefined)
    const socketContext = useContext(SocketContext)
    const authContext = useContext(AuthUserContext);
    const [selectedTextChan, setSelectedTextChan] = useState<[number, String] | undefined>(undefined)
    const [unseenCounter, setUnseenCounter] = useState<UnseenCounter>([])
    const divider = (id: number) => ({
        key: 'divider' + id,
        kind: 'divider',
    })

    const textChanMenu: ShorthandCollection<MenuItemProps, MenuShorthandKinds> = useMemo(() => [
        {
            key: 'heading1',
            content: "Text Channels",
            kind: "divider",

        },
        divider(1),
    ], [])

    const vidChanMenu: ShorthandCollection<MenuItemProps, MenuShorthandKinds> = useMemo(() => [
        {
            key: 'heading2',
            content: "Video Rooms",
            kind: "divider",

        },
        divider(2),
    ], [])

    const [textMenuItems, setTextMenuItems] = useState(textChanMenu)
    const [vidMenuItems, setVidMenuItems] = useState(vidChanMenu)

    const setRoom = useMemo(() => (room: String) => {
        socketContext?.socket?.current?.joinVidChan(room, (action) => {
            console.log("Selecting room:", `${room}`)
            setSelectedRoom(`#?${room}`)
        })
    }, [socketContext?.socket])

    useEffect(() => {
        if (textChanData && authContext?.selfState.user) {
            setTextMenuItems([
                ...textChanMenu,
                ...textChanData.map((channel) => ({
                    key: channel.text_channel_id,
                    icon: <MessageChannelIcon />,
                    role_id: authContext?.selfState.user?.role_id,
                    unseen: unseenCounter[channel.text_channel_id],
                    content: (
                        <Text content={channel.channel_name} />
                    ),
                    action: () => {
                        setSelectedTextChan([channel.text_channel_id, channel.channel_name])
                        setUnseenCounter(oldCounter => {
                            oldCounter[channel.text_channel_id] = 0
                            return { ...oldCounter }
                        })
                    },
                    children: makeMenuAction,
                })),
            ])
        }
    }, [textChanData, unseenCounter, authContext?.selfState.user, textChanMenu])


    useEffect(() => {
        if (vidChanData) {
            setVidMenuItems(() => ({
                ...vidChanMenu,
                ...vidChanData.map((channel) => ({
                    key: channel.video_channel_id,
                    content: channel.channel_name,
                    action: () => {
                        setRoom(channel.channel_name)
                    },
                    children: makeAction,
                }))
            }))
        }
    }, [setRoom, vidChanData, vidChanMenu])




    useEffect(() => {
        if (socketContext.socketReady && socketContext?.socket?.current) {
            socketContext.socket.current.changeSetUnseetCounter(setUnseenCounter)
            console.log("Successful update")
        } else {
            console.log("Didnt set thingy", socketContext.socketReady, socketContext?.socket?.current)
        };
        return () => {
            socketContext?.socket?.current?.clearHandler("ROOM_JOIN");
            socketContext?.socket?.current?.changeSetUnseetCounter(undefined);
        }
    }, [socketContext?.socket, socketContext.socketReady])


    useEffect(() => {
        if (selectedTextChan && unseenCounter[selectedTextChan[0]] !== 0) {
            setUnseenCounter(counter => {
                counter[selectedTextChan[0]] = 0
                return { ...counter }
            })
        }
    }, [unseenCounter, selectedTextChan])

    return (
        <>
            <Flex style={{ width: '100vw', height: '100vh' }}>
                <Flex style={{ width: '16rem', position: 'relative', top: 0, left: 0, height: '100vh', flexDirection: "column" }}>
                    <Menu
                        styles={{ height: '50vh', width: '100%', backgroundColor: gsaTheme.siteVariables.colors.grey['50'] }}
                        items={textMenuItems}
                        pointing
                        vertical
                    />
                    <Menu
                        styles={{ height: '50vh', width: '100%', backgroundColor: gsaTheme.siteVariables.colors.grey['50'] }}
                        items={vidMenuItems}
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
