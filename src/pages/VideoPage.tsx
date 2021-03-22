import { Button, Flex, Menu, MenuItemProps, MenuShorthandKinds, ShorthandCollection } from '@fluentui/react-northstar'
import React, { useEffect, useState } from 'react'
import { useGetVideoChannelQuery } from '../api/videoQueries'
import { VideoCall } from '../components/video/VideoCall'
import { CancelIcon } from '../style/icons'
import { gsaTheme } from '../style/theme'
import { makeAction } from '../utils/MakeAction'
import CenteredPage from './templates/CenteredPage'

interface Props {

}

export const VideoPage: React.FC<Props> = ({ children }) => {
    const { data, error, isFetching } = useGetVideoChannelQuery();
    const [selectedRoom, setSelectedRoom] = useState<undefined | String>(undefined)

    const divider = {
        key: 'divider',
        kind: 'divider',
    }


    const defaultMenu: ShorthandCollection<MenuItemProps, MenuShorthandKinds> = [

        {
            key: 'heading2',
            content: "Video Rooms",
            kind: "divider",

        },
        divider,
    ]


    const [menuItems, setMenuItems] = useState(defaultMenu)

    const setRoom = (room: String) => {
        setSelectedRoom(`#?${room}`)
    }

    useEffect(() => {
        if (data) {
            setMenuItems([...defaultMenu, ...data.map((channel) => ({
                key: channel.video_channel_id,
                content: channel.channel_name,
                action: () => {
                    setRoom(channel.channel_name)
                },
                children: makeAction,
            }))])
        }
    }, [data])




    return (
        <>
            <Flex style={{ width: '16rem', position: 'relative', top: 0, left: 0, height: '100vh' }}>
                <Menu
                    styles={{ height: '100vh', width: '100%', backgroundColor: gsaTheme.siteVariables.colors.grey['50'] }}
                    items={menuItems}
                    pointing
                    vertical
                />
                <Button onClick={() => { }} styles={{
                    alignSelf: 'flex-end', position: 'absolute', top: '1rem', right: '-1rem', ':hover': {
                        backgroundColor: gsaTheme.siteVariables.colors.grey['100'],
                    },
                }} icon={<CancelIcon />} iconOnly title="Close" circular />
            </Flex>
            <VideoCall selectedRoom={selectedRoom}></VideoCall>
        </>
    )
}



// <CenteredPage>
//         {/* <SidePanel> */ }
// {/* <VideoRooms data={data} error={error} isFetching={isFetching} setRoom={setRoom} /> */ }
// {/* {selectedRoom} */ }
// {/* </SidePanel> */ }
// {/* <VideoCall /> */ }
//     // </CenteredPage >