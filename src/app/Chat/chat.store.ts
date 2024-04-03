// Import necessary dependencies and types
import { ChatStore } from "@/app/Chat/chat.types";
import { create } from "zustand";
import { ChatClient } from "../../../protoc/generated/chatapp_grpc_web_pb";
import { Message, User } from "../../../protoc/generated/chatapp_pb";
import { v4 as uuidv4 } from 'uuid';

// Create a new gRPC Chat client instance
const client  = new ChatClient("http://localhost:8080");

// Create a Zustand store for managing chat-related state
const chatStore = create<ChatStore>((set, get) => ({
    // Initialize state
    user: null,                             // Current user
    users: [],                              // List of users in the chat
    isJoinedToChat: false,                  // Flag indicating if the user is joined to the chat
    messages: [],                           // List of chat messages
    actions: {
        // Action to join the chat room
        joinToChat: (username: string, onError) => {
            // Create user
            const user = new User();
            user.setUsername(username);
            user.setId(uuidv4());

            // Attempt to join the chat room
            client.joinChat(user, undefined, (err, res) => {
                if (!res.getIsok()) {
                    // Handle error if joining chat fails
                    onError(res.getErrorcode(), res.getMessage());
                    return;
                }
                // Set the current user and update the state
                set({ user: user, isJoinedToChat: true });
            });
        },
        // Action to subscribe for updates on chat users
        subscribeForChatUsers: () => {
            const { user } = get();
            if (user) {
                // Subscribe for updates on chat users
                const stream = client.listenForUpdatedInChatRoom(user, undefined);
                stream.on("data", (response) => {
                    // Update the list of users in the chat
                    set({ users: response.getUsersList() });
                });
            }
        },
        // Action to leave the chat room
        leaveChat: () => {
            const { user } = get();
            if (user) {
                // Leave the chat room
                client.leaveChat(user, undefined, (err, res) => {
                    if (res.getIsok()) {
                        // Update the state after leaving the chat room
                        set({ isJoinedToChat: false });
                    }
                });
            }
        },
        // Action to send a message
        sendMessage: (content: string) => {
            const { user } = get();
            if (user) {
                // Create a new message
                const msg = new Message();
                msg.setFrom(user);
                msg.setMsg(content);
                msg.setTime(Date.now());

                // Send the message
                client.sendMessage(msg, undefined, () => {});
            }
        },
        // Action to subscribe for updates on chat messages
        subscribeForMessages: () => {
            const { user } = get();
            if (user) {
                // Subscribe for updates on chat messages
                const stream = client.receiveMessages(user, undefined);
                stream.on("data", (res) => {
                    const from = res.getFrom();

                    // Update the state with the received message
                    set((prev) => {
                        return {
                            messages: [
                                ...prev.messages,
                                {
                                    isMine: from?.getId() === user.getId(),
                                    userName: from?.getUsername(),
                                    time: res.getTime(),
                                    text: res.getMsg()
                                },
                            ],
                        };
                    });
                });
            }
        }
    }
}));

// Define custom hooks to access specific parts of the chat store
export const useChatStoreActions = () => chatStore((state) => state.actions);
export const useIsJoinedToChat = () => chatStore((state) => state.isJoinedToChat);
export const useUsers = () => chatStore((state) => state.users);
export const useMessages = () => chatStore((state) => state.messages);