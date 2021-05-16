import { Menu, MenuItemProps, MenuShorthandKinds, ShorthandCollection } from '@fluentui/react-northstar'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetVideoChannelQuery } from '../../api/videoQueries';
import { colors } from '../../style/colors'
import { VideoChannelIcon } from '../../style/icons';
import { makeAction } from '../../utils/MakeAction';

interface Props {
    setRoom: (room: String) => void
}

export const VideoMenu: React.FC<Props> = ({ children, setRoom }) => {
    const { data, error, isFetching } = useGetVideoChannelQuery();

    const divider = (id: number) => ({
        key: 'divider' + id,
        kind: 'divider',
    })


    const vidChanMenu: ShorthandCollection<MenuItemProps, MenuShorthandKinds> = useMemo(() => [
        {
            key: 'heading2',
            content: "Video Rooms",
            kind: "divider",

        },
        divider(2),
    ], [])

    const [vidMenuItems, setVidMenuItems] = useState(vidChanMenu)

    useEffect(() => {
        if (data) {
            setVidMenuItems([
                ...vidChanMenu,
                ...data.map((channel) => ({
                    key: "vidChan:" + channel.video_channel_id,
                    icon: <VideoChannelIcon />,
                    content: channel.channel_name,
                    action: () => {
                        setRoom(channel.channel_name)
                    },
                    children: makeAction,
                }))
            ])
        }
    }, [setRoom, data, vidChanMenu])


    return (
        <Menu
            styles={{ height: '50vh', width: '100%', backgroundColor: colors.grey['50'] }}
            items={vidMenuItems}
            pointing
            vertical
        />
    )
}