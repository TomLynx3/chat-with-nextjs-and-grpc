import React, {useEffect} from 'react';
import {styled} from "styled-components";
import {useChatStoreActions, useUsers} from "@/app/Chat/chat.store";

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap:8px;
  font-size: 1.125em;
  font-weight: 500;
`

// UserList component for rendering the list of users
const UserList = () => {
    // Access the list of users from the chat store
    const users = useUsers();
    // Access subscribeForChatUsers action from the chat store
    const { subscribeForChatUsers } = useChatStoreActions();

    // Subscribe for chat users when the component mounts
    useEffect(() => {
        subscribeForChatUsers();
    }, [subscribeForChatUsers]);

    // Render the user list
    return (
        <Wrapper>
            {users.map(x=><div key={x.getId()}>{x.getUsername()}</div>)}
        </Wrapper>
    );
};

export default UserList;