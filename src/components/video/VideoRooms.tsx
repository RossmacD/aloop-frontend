import { Flex, List } from "@fluentui/react-northstar";
import React, { useEffect, useState } from "react";
import { useGetVideoChannelQuery, VideoChannelRes } from "../../api/videoQueries";
// import { setGetOnlineUsers, triggerGetOnlineUsers } from "../../utils/sockets/socket";!
import { FetchTemplate } from "../FetchTemplate";

interface Props {
    data: VideoChannelRes[] | undefined,
    error: unknown,
    isFetching: boolean,
    setRoom: (room: string) => void
}

interface ReshapedroomUsers {
    [room: string]: number[]
}

export const VideoRooms: React.FC<Props> = ({ data, error, isFetching, setRoom }) => {
    const [roomUsers] = useState<ReshapedroomUsers>({})
    const [selectedRoom, setSelectedRoom] = useState<number | undefined>(undefined)
    return (
        <Flex column>
            <FetchTemplate error={error} isFetching={isFetching}>
                <List
                    selectable
                    selectedIndex={selectedRoom}
                    onSelectedIndexChange={(e, newProps) => {
                        if (newProps?.selectedIndex !== undefined && data) {
                            setSelectedRoom(newProps?.selectedIndex)
                            const selected = data[newProps?.selectedIndex]?.channel_name
                            selected ? setRoom(`${selected}`) : console.error("Could not find channelName")
                        } else {
                            console.log("AAAA", newProps)
                        }
                    }}
                    items={data?.map((channel) => {
                        return {
                            key: channel.video_channel_id,
                            header: channel.channel_name,
                        }
                    })}
                />


            </FetchTemplate>
        </Flex>
    )
};
