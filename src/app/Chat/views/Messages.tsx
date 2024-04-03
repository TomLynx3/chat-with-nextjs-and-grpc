import React, {useEffect} from 'react';
import {styled} from "styled-components";
import {useChatStoreActions, useMessages} from "@/app/Chat/chat.store";
import MessageItem from "@/app/Chat/views/MessageItem";



const Wrapper = styled.div`
  padding: 2rem 1rem;
  display: flex;
  overflow-y: auto;
  height: 100%;
  flex-direction: column;
  gap:48px
`
// Messages component for rendering the list of messages
const Messages = () => {

    // Access the list of messages from the chat store
    const messages = useMessages();
    // Access subscribeForMessages action from the chat store
    const { subscribeForMessages } = useChatStoreActions();

    // Subscribe for new messages when the component mounts
    useEffect(() => {
        subscribeForMessages();
    }, [subscribeForMessages]);

    // Render the list of messages using MessageItem component
    return (
        <Wrapper>
            {messages.map(x=><MessageItem key={x.time} {...x} />)}
        </Wrapper>
    );
};

export default Messages;