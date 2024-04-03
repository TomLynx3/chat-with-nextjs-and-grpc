import { createServer } from "http";
import { parse } from "url";
import next from "next";
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { sendUnaryData, ServerUnaryCall,} from "@grpc/grpc-js";
import {User, UserList, Response, Message,UnimplementedChatService} from "./protoc/generated/chatapp";
import { ServerWritableStream} from "@grpc/grpc-js/src/server-call";

//Custom Next.js server setup

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    }).listen(port);

    console.log(
        `> Server listening at http://localhost:${port} as ${
            dev ? "development" : process.env.NODE_ENV
        }`,
    );
});



//gRPC setup


const PROTO_FILE_PATH:string = "chatapp.proto"
//Our Envoy instance URI
const gRPC_SERVER_URI:string = "0.0.0.0:9090"

// Load protocol buffer definitions
const packageDefinition = protoLoader.loadSync(PROTO_FILE_PATH,  {keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

// Load gRPC package definition
grpc.loadPackageDefinition(packageDefinition);

// Create a new gRPC server instance
const server = new grpc.Server();

// Here will be stored our chat users
let users:ChatUser[] = []

// Function to handle user joining the chat
const joinChat = (call:ServerUnaryCall<User, Response>, callback:sendUnaryData<Response>) => {
    const user:User = call.request

    try {
        // Check if user already exists with the same username
        const userAlreadyExists = users.find(x=>x.userName.toLowerCase() === user.userName.toLowerCase())

        if (userAlreadyExists) {
            callback(null,new Response({isOk:false,errorCode:1,message:"Please choose a different username"}))
            return
        } else {
            // Add the user to the list of users
            users.push({
                id: user.id,
                userName: user.userName,
                chatStream: null,
                msgStream: null,
            });

            // Get updated list of users and notify all users in the chat about the new user
            const chatUsers = getUsers()

            users.map(x=>x.chatStream?.write(new UserList({users:chatUsers})))

            callback(null,new Response({isOk:true}))
        }
    } catch (err:any) {
        console.log(err)
        callback(err,new Response({isOk:false,errorCode:0,message:"Unhandled error"}))
    }
}

// Function to handle user leaving the chat
const leaveChat = (call:ServerUnaryCall<User, Response>,callback:sendUnaryData<Response>) => {
    const user:User = call.request

    try {
        // Remove the user from the list of users
        users = users.filter(x=>x.id !== user.id)

        // Get updated list of users and notify all users in the chat about the user leaving
        const userList: User[] = getUsers()

        users.forEach((user)=>{
            user.chatStream?.write(new UserList({users:userList}))
        })
        callback(null,new Response({isOk:true}))
    } catch (err:any) {
        callback(err, new Response({isOk:false,errorCode:0,message:"Unhandled error"}));
    }
}

// Function to handle sending messages
const sendMessage = (call:ServerUnaryCall<Message, Response>,callback:sendUnaryData<Response>) => {
    const msg:Message = call.request

    try {
        // Send message to all users in the chat
        users.forEach((user:ChatUser)=>{
            user.msgStream?.write(msg)
        })
        callback(null,new Response({isOk:true}))
    } catch (err:any) {
        callback(err,new Response({isOk:false,errorCode:0,message:"Unhandled error"}))
    }
}

// Function to handle receiving messages
const receiveMessages:any = (call: ServerWritableStream<User, Message>) => {
    const userData: User = call.request;
    const user = users.find(x=>x.id === userData.id)

    if (user) {
        user.msgStream = call
    }
}

// Function to listen for updates in the chat room
const listenForUpdatedInChatRoom:any = (call:ServerWritableStream<User,UserList>) => {
    const userData: User = call.request;
    const user = users.find(x=>x.id === userData.id)

    if (user) {
        user.chatStream = call

        // Get updated list of users and notify all users in the chat about the changes
        const chatUsers = getUsers()
        users.forEach(x=>x.chatStream?.write(new UserList({users:chatUsers})))
    }


}

// Add services to the server
server.addService(UnimplementedChatService.definition,{
    joinChat: joinChat,
    leaveChat: leaveChat,
    sendMessage: sendMessage,
    receiveMessages: receiveMessages,
    listenForUpdatedInChatRoom: listenForUpdatedInChatRoom
})

// Bind the server to the specified URI
server.bindAsync(gRPC_SERVER_URI,grpc.ServerCredentials.createInsecure(),(err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log("gRPC server is running")
    }
})

// Function to get a list of users
function getUsers():User[]{
    return users.map((user:ChatUser) => new User({ id: user.id, userName: user.userName }));
}

// Interface defining a chat user
interface ChatUser{
    msgStream:ServerWritableStream<User, Message> | null; // Stream to send messages to chat user
    chatStream:ServerWritableStream<User, UserList> | null; // Used to notify user about users in the chat
    id:string;
    userName:string;
}