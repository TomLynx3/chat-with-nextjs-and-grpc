import React from 'react';
import {styled} from "styled-components";
import {useChatStoreActions} from "@/app/Chat/chat.store";
import {useForm} from "react-hook-form";

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #30363d;
  border-radius: 6px;
  box-shadow: inset 0px 1px 0px 0px #0104093d;
  background-color: #161b22;
  color: #e6edf3;
  resize: none;

  &:focus-visible{
    outline: none;
  }
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap:8px;
`

const SendMsgButton = styled.button`
  font-weight: 500;

  cursor: pointer;
  appearance: none;
  user-select: none;
  height: 32px;
  width: 170px;
  background-color: #008000;
  box-shadow: inset 0px 1px 0px 0px #0104093d;
  border-radius: 6px;
  color:#e6edf3;
  font-size: 14px;
  text-decoration: none;
  padding: 0 12px;

  align-self: flex-end;
`
// InputBox component for message input and send button
const InputBox = () => {
    // Access sendMessage action from the chat store
    const {sendMessage} = useChatStoreActions()
    // React Hook Form usage for form management
    const {register,handleSubmit,reset} = useForm()

    return (
        <Wrapper>
            <TextArea placeholder={"Enter you message"} {...register("text",{required:true})} />
            <SendMsgButton onClick={handleSubmit((data:Record<string,any>)=>{
                // Call sendMessage action with the message text
                sendMessage(data.text as string)
                // Reset the form after sending the message
                reset({text:""})
            })}>Send message</SendMsgButton>
        </Wrapper>
    );
};

export default InputBox;