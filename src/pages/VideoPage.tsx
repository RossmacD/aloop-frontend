import { MenuButton, Button, Flex, Menu, MenuItemProps, MenuShorthandKinds, ShorthandCollection, Chat, Text, Label, Input } from '@fluentui/react-northstar'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useGetVideoChannelQuery } from '../api/videoQueries'
import { useGetTextChannelQuery, useNewTextChannelQuery, useNewVidChannelQuery } from '../api/messageQueries'
import { VideoCall } from '../components/video/VideoCall'
import { CancelIcon, MessageChannelIcon, VertMenuIcon, VideoChannelIcon } from '../style/icons'
import { gsaTheme } from '../style/theme'
import { makeAction, makeMenuAction } from '../utils/MakeAction'
import CenteredPage from './templates/CenteredPage'
import { SocketContext } from '../components/app/SocketProvider'
import { ChatWindow } from '../components/chat/ChatWindow'
import { AuthUserContext } from '../components/app/App'
import { colors } from '../style/colors'
import { VideoMenu } from '../components/video/VideoMenu'
import { ManageWindow } from '../components/video/ManageWindow'



export interface UnseenCounter { [key: number]: number }
interface Props {

}

export const VideoPage: React.FC<Props> = ({ children }) => {
    const { data: textChanData, error: textChanError, isFetching: textChanIsFetching } = useGetTextChannelQuery();
    const [selectedRoom, setSelectedRoom] = useState<undefined | String>(undefined)
    const socketContext = useContext(SocketContext)
    const authContext = useContext(AuthUserContext);
    const [selectedTextChan, setSelectedTextChan] = useState<[number, String] | undefined>(undefined)
    const [unseenCounter, setUnseenCounter] = useState<UnseenCounter>([])
    const [managing, setManaging] = useState(false)




    const newTextRef = useRef<HTMLInputElement | null>(null)
    const { mutate: mutateTextChan, } = useNewTextChannelQuery();
    const submitNewTextChan = () => {
        if (newTextRef?.current?.value) {
            mutateTextChan({
                channel_name: newTextRef?.current?.value
            })
            newTextRef.current.value = ""
        }
    }


    const newVidRef = useRef<HTMLInputElement | null>(null)
    const { mutate: mutateVidChan, } = useNewVidChannelQuery();
    const submitNewVidChan = () => {
        if (newVidRef?.current?.value) {
            mutateVidChan({
                channel_name: newVidRef?.current?.value
            })
            newVidRef.current.value = ""
        }
    }




    const divider = (id: number) => ({
        key: 'divider' + id,
        kind: 'divider',
    })

    const textChanMenu: ShorthandCollection<MenuItemProps, MenuShorthandKinds> = useMemo(() => [
        {
            key: 'heading1',
            content: (
                <Text>Text Rooms</Text>),
            kind: "divider",

        },
        divider(1),
    ], [])


    // const addChannel: ShorthandCollection<MenuItemProps, MenuShorthandKinds> = [
    //     {
    //         key: "add-vid",
    //         content: 
    //     }
    // ]





    const [textMenuItems, setTextMenuItems] = useState(textChanMenu)

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
            <Flex style={{ width: '100vw', height: '100vh', backgroundColor: colors.grey["600"] }}>
                <Flex style={{ width: '16rem', position: 'relative', top: 0, left: 0, height: '100vh', flexDirection: "column" }}>
                    <Flex styles={{ width: "100%", height: "10vh", backgroundColor: colors.grey["700"], justifyContent: "space-between", alignItems: "center" }}>
                        <Text color={"white"}>Welcome {authContext?.selfState.user?.role_id}</Text>
                        {authContext?.selfState.user?.role_id !== 1 ? <Button primary={!managing} styles={{ justifySelf: "flex-end" }} onClick={() => setManaging(!managing)}>{managing ? "Complete" : "Manage"}</Button> : ''}
                    </Flex>
                    <Flex styles={{ flexDirection: "column", height: "45vh", backgroundColor: gsaTheme.siteVariables.colors.grey['50'] }}>
                        <Menu
                            styles={{ width: '100%', backgroundColor: gsaTheme.siteVariables.colors.grey['50'] }}
                            items={textMenuItems}
                            pointing
                            vertical
                        />
                        {managing ? <Flex styles={{ flexDirection: "column", marginTop: '0.5rem' }}>
                            <Input ref={newTextRef} placeholder="New Channel name..."></Input>
                            <Button onClick={submitNewTextChan}>Add Text Room</Button>
                        </Flex> : ""}
                    </Flex>
                    <Flex styles={{ flexDirection: "column", height: "45vh", backgroundColor: gsaTheme.siteVariables.colors.grey['50'] }}>
                        <VideoMenu setRoom={setRoom} />
                        {managing ?
                            <Flex styles={{ flexDirection: "column", marginTop: '0.5rem' }}>
                                <Input ref={newVidRef} placeholder="New Channel name..."></Input>
                                <Button onClick={submitNewVidChan}>Add Video Room</Button>
                            </Flex> : ""}
                    </Flex>
                </Flex>

                {(selectedTextChan !== undefined && !managing) ?
                    (<ChatWindow selectedTextChan={selectedTextChan} setSelectedTextChan={setSelectedTextChan} />) : managing && selectedTextChan ?
                        <ManageWindow selectedTextChan={selectedTextChan} setSelectedTextChan={setSelectedTextChan}></ManageWindow> : ""}

                <VideoCall selectedRoom={selectedRoom}></VideoCall>
            </Flex>
        </>
    )
}
