import React, { useContext, useRef } from 'react'
import { Flex, Chat, Button, ChatItemProps, ShorthandCollection, Input } from "@fluentui/react-northstar"
import { CancelIcon, MessageIcon, SendIcon } from '../../style/icons'
import { gsaTheme } from '../../style/theme'
import { MessageRes, useGetTextChannelMessagesQuery, useNewMessageQuery } from '../../api/messageQueries'
import { AuthUserContext } from '../app/App'

interface Props {
    setSelectedTextChan: React.Dispatch<React.SetStateAction<[number, String] | undefined>>
    selectedTextChan: [number, String]
}

export const ChatWindow: React.FC<Props> = ({ children, setSelectedTextChan, selectedTextChan }) => {
    const { data, error, isFetching } = useGetTextChannelMessagesQuery(selectedTextChan[0]);
    const { mutate } = useNewMessageQuery();
    const authContext = useContext(AuthUserContext)
    const messageInput = useRef<HTMLInputElement | null>(null)



    const mapDataToItems = (data: MessageRes[] | undefined): ShorthandCollection<ChatItemProps> => {
        return data?.map((message) => ({
            message: (
                <Chat.Message content={message.contents} author={message.author_id} timestamp={message.created_at} mine={message.author_id === authContext?.selfState.user?.user_id} />
            ),
            // contentPosition: message.author_id === authContext?.selfState.user?.user_id ? 'end' : 'start',
            attached: 'top',
            key: 'message-id-' + message.message_id,
        })) || []
    }

    const sendMessage = () => {
        if (messageInput?.current?.value) {
            mutate({
                contents: messageInput.current.value,
                text_channel_id: selectedTextChan[0]
            })
            messageInput.current.value = ""
        } else {
            console.log("No value")
        }
    }

    return (
        <Flex style={{ width: '20rem', height: '100%', position: "relative", top: 0, left: 0, flexDirection: "column" }}>
            <Chat style={{ width: "100%", padding: 0, flex: 1, overflowY: 'scroll', flexDirection: 'column-reverse' }} items={mapDataToItems(data).reverse()} />
            <Flex style={{ width: "100%", padding: "1rem 0 1rem 0", backgroundColor: gsaTheme.siteVariables.colors.grey['100'] }} >
                <Input fluid placeholder="Search..." iconPosition="start" icon={<MessageIcon />} ref={messageInput} />
                <Button
                    onClick={sendMessage}
                    icon={<SendIcon />} iconOnly title="Send" circular />
            </Flex>
            <Button onClick={() => { setSelectedTextChan(undefined) }} styles={{
                alignSelf: 'flex-end', position: 'absolute', top: '1rem', right: '-1rem', ':hover': {
                    backgroundColor: gsaTheme.siteVariables.colors.grey['800'],
                },
            }} icon={<CancelIcon />} iconOnly title="Close" circular />
        </Flex>
    )
}