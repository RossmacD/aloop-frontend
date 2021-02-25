import { Flex } from "@fluentui/react-northstar";
import React, { useEffect, useState } from "react";
import { useGetVideoChannelQuery } from "../../api/videoQueries";
import { FetchTemplate } from "../FetchTemplate";

interface Props {
}

export const VideoRooms: React.FC<Props> = () => {
    // const [videoChannels, setVideoChannels] = useState([]);
    const { data, error, isFetching } = useGetVideoChannelQuery();
    // useEffect(() => {

    // }, [])
    return (
        <Flex column>
            <FetchTemplate error={error} isFetching={isFetching}>
                {data?.map(({ channel_name, video_channel_id }) => (
                    <p key={video_channel_id}>Room {video_channel_id}: {channel_name}</p>
                ))}
            </FetchTemplate>
        </Flex>
    )
};
