import React from 'react';
import styled from "styled-components";

import moment from "moment"
import {IMessage} from "@/app/Chat/chat.types";

const Wrapper = styled.div<{$isMine:boolean}>`
  padding: 0.5rem 1.5rem;
  border: ${props=>props.$isMine ? "none" : "1px solid #30363d"};
  border-radius: 6px;
  box-shadow: ${props=>props.$isMine ? "none" : "inset 0px 1px 0px 0px #0104093d"};
  background-color: ${props=>props.$isMine ? "#218aff" : "#161b22"};
  color: #e6edf3;
  width: fit-content;
  position: relative;
  align-self: ${props=>props.$isMine ? "flex-end" : "flex-start"};
`

const UserName = styled.div`
  position: absolute;
  top: -20px;
  left: 0;
  font-size:0.675em
`

const Time = styled.div`
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size:0.675em;
  width:100%;
  white-space: nowrap;
`


const Message = ({userName,text,isMine,time}:IMessage) => {
    return (
        <Wrapper $isMine={isMine}>
            {!isMine && <UserName>{userName}</UserName>}
            {text}
            <Time>{moment(time).format("DD.MM.YY HH:mm")}</Time>
        </Wrapper>
    );
};

export default Message;