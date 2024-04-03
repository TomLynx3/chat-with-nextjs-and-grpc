// /src/app/Chat/chat.types.ts

import { User } from "../../../protoc/generated/chatapp_pb";

// Interface representing a single chat message
export interface IMessage {
    isMine: boolean;        // Indicates if the message is sent by the current user
    text: string;           // Content of the message
    time: number;           // Timestamp of when the message was sent
    userName?: string;      // Optional username of the sender
}

// Interface representing the Zustand store for the chat application
export interface ChatStore {
    user: User | null;      // Current user information
    users: User[];          // List of users in the chat
    messages: IMessage[];   // List of chat messages
    isJoinedToChat: boolean;// Indicates whether the user has joined the chat
    actions: ChatStoreActions; // Actions available in the chat store
}

// Interface representing the actions available in the chat store
export interface ChatStoreActions {
    joinToChat: (username: string, onError: Function) => void;     // Action to join the chat room
    subscribeForChatUsers: () => void;                             // Action to subscribe for updates on chat users
    leaveChat: () => void;                                          // Action to leave the chat room
    sendMessage: (content: string) => void;                         // Action to send a message
    subscribeForMessages: () => void;                               // Action to subscribe for updates on chat messages
}
