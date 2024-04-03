"use client"
import JoinToChat from "@/app/Chat/views/JoinToChat";
import {styled} from "styled-components";
import {useIsJoinedToChat} from "@/app/Chat/chat.store";
import Chat from "@/app/Chat/views/Chat";


const Main = styled.main`
  @media (max-width: 768px) {
    width: 95%;
  }
`
export default function Home() {

    const isJoinedToChat = useIsJoinedToChat()

  return (
      <Main>
          {isJoinedToChat ? <Chat /> : <JoinToChat />}
      </Main>
  );
}
