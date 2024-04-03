import React, {useEffect} from 'react';
import {styled} from "styled-components";
import UserList from "@/app/Chat/views/UserList";
import {useChatStoreActions} from "@/app/Chat/chat.store";
import InputBox from "@/app/Chat/views/InputBox";
import Messages from "@/app/Chat/views/Messages";


const Wrapper = styled.div`
  width: 950px;
  height: 650px;
  background-color: #0d1117;
  border:1px solid #30363d;
  box-shadow: 0 1px 0 0 #01040966;
  border-radius: 8px;
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const UsersWrapper = styled.div`
    width: 25%;
    border-right: 1px solid #30363d;

  @media (max-width: 768px) {
    display: none;
  }
`

const MainWindow = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-end;
`

const InputBoxWrapper = styled.div`
    height: 20%;
    border-top:1px solid #30363d;
    padding: 1rem;
`

// Chat component representing the main chat interface
const Chat = () => {
    // Access leaveChat action from the chat store
    const { leaveChat } = useChatStoreActions();

    // Effect to handle leaving chat when the component unmounts or the browser is closed
    useEffect(() => {
        const beforeUnloadHandler = () => {
            leaveChat(); // Call leaveChat action when the browser is closed or the component unmounts
        };

        // Add event listener for beforeunload event
        window.addEventListener("beforeunload", beforeUnloadHandler);

        // Clean-up function to remove event listener
        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
        };
    }, [leaveChat]);

    return (
        <Wrapper>
            <UsersWrapper>
                <UserList />
            </UsersWrapper>
            <MainWindow>
                <Messages />
                <InputBoxWrapper>
                    <InputBox />
                </InputBoxWrapper>
            </MainWindow>
        </Wrapper>
    );
};

export default Chat;