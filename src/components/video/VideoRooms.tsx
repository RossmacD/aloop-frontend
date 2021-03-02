import { Flex } from "@fluentui/react-northstar";
import React, { useEffect, useState } from "react";
import { useGetVideoChannelQuery } from "../../api/videoQueries";
import { setGetOnlineUsers, triggerGetOnlineUsers } from "../../utils/sockets/socket";
import { FetchTemplate } from "../FetchTemplate";

interface Props {
}

interface ReshapedroomUsers {
    [room: string]: number[]
}

export const VideoRooms: React.FC<Props> = () => {
    // const [videoChannels, setVideoChannels] = useState([]);
    const { data, error, isFetching } = useGetVideoChannelQuery();
    const [roomUsers, setRoomUsers] = useState<ReshapedroomUsers>({})
    useEffect(() => {
        // Handle GetUsers return from ws
        setGetOnlineUsers((json) => {
            let roomMap: ReshapedroomUsers = {}
            for (const roomUser of json.online_users) {
                roomMap[roomUser.room] = roomUser.user_ids
            }
            setRoomUsers(roomMap)
        })
        // Send GetUsers
        triggerGetOnlineUsers()

        return setGetOnlineUsers((json) => { console.error(json) })
    }, [])
    return (
        <Flex column>
            <FetchTemplate error={error} isFetching={isFetching}>
                {data?.map(({ channel_name, video_channel_id }) => (
                    <p key={video_channel_id}>Room {video_channel_id}: {channel_name} { roomUsers[channel_name] ? "" : ""}</p>
                ))}
            </FetchTemplate>
        </Flex>
    )
};
