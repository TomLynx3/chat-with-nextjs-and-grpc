"use client";
import React from "react";
import styled from "styled-components";
import { useChatStoreActions } from "@/app/Chat/chat.store";
import {useForm} from "react-hook-form";

// Styled components for styling the UI elements
const Wrapper = styled.div`
  width: 600px;
  height: 150px;
  background-color: #0d1117;
  border:1px solid #30363d;
  box-shadow: 0 1px 0 0 #01040966;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap:8px;
`;

const Heading = styled.h3`
  font-size: 1.25em;
`;
const Input = styled.input<{$isError:boolean}>`
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: #e6edf3;
  width: 250px;
  border:1px solid ${props=>props.$isError ? "#f85149" : "#30363d"};
  border-radius: 6px;
  box-shadow: inset 0px 1px 0px 0px #0104093d;
  background-color: #161b22;

  &:focus-visible{
    outline: none;
  }

`;

const Button = styled.button`
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  user-select: none;
  height: 32px;
  width: 250px;
  background-color: #008000;
  box-shadow: inset 0px 1px 0px 0px #0104093d;
  border-radius: 6px;
  text-decoration: none;
  padding: 0 12px;
  color:#e6edf3;
`;

const ErrorMessage = styled.span`
  font-size: 0.875em;
  color: #f85149;
  text-align: left;
  width: 250px;
`;
// Interface representing the form data
interface Form {
    name:string
}

//React Component
const JoinToChat = () => {
    // Accessing joinToChat action from the chat store
    const { joinToChat } = useChatStoreActions();

    // React Hook Form usage for form management
    const {register,
        handleSubmit,
        formState:{errors},
        setError} = useForm<Form>()

    // Function to handle errors from joining the chat
    const onError = (errorCode:number,message:string)=>{

        if(errorCode === 1){
            setError("name",{type:"custom",message})
        }
    }

    return (
        <Wrapper>
            <Heading>Enter your username</Heading>
            <Input
                $isError={!!errors.name}
                placeholder="Your username"
                {...register("name", {
                    required: { value: true, message: "Username is required" },
                })}
            />
            {!!errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            <Button onClick={handleSubmit(data=>joinToChat(data.name,onError))}>
                Enter
            </Button>
        </Wrapper>
    );
};

export default JoinToChat;
