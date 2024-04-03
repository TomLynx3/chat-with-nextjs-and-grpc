// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var chatapp_pb = require('./chatapp_pb.js');

function serialize_Message(arg) {
  if (!(arg instanceof chatapp_pb.Message)) {
    throw new Error('Expected argument of type Message');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Message(buffer_arg) {
  return chatapp_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Response(arg) {
  if (!(arg instanceof chatapp_pb.Response)) {
    throw new Error('Expected argument of type Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Response(buffer_arg) {
  return chatapp_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_User(arg) {
  if (!(arg instanceof chatapp_pb.User)) {
    throw new Error('Expected argument of type User');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_User(buffer_arg) {
  return chatapp_pb.User.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UserList(arg) {
  if (!(arg instanceof chatapp_pb.UserList)) {
    throw new Error('Expected argument of type UserList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UserList(buffer_arg) {
  return chatapp_pb.UserList.deserializeBinary(new Uint8Array(buffer_arg));
}


// Definition of Chat service
var ChatService = exports.ChatService = {
  // Method to leave the chat
leaveChat: {
    path: '/Chat/leaveChat',
    requestStream: false,
    responseStream: false,
    requestType: chatapp_pb.User,
    responseType: chatapp_pb.Response,
    requestSerialize: serialize_User,
    requestDeserialize: deserialize_User,
    responseSerialize: serialize_Response,
    responseDeserialize: deserialize_Response,
  },
  // Method to join the chat and continuously receive updates on users in the chat
joinChat: {
    path: '/Chat/joinChat',
    requestStream: false,
    responseStream: false,
    requestType: chatapp_pb.User,
    responseType: chatapp_pb.Response,
    requestSerialize: serialize_User,
    requestDeserialize: deserialize_User,
    responseSerialize: serialize_Response,
    responseDeserialize: deserialize_Response,
  },
  // Method to send a message
sendMessage: {
    path: '/Chat/sendMessage',
    requestStream: false,
    responseStream: false,
    requestType: chatapp_pb.Message,
    responseType: chatapp_pb.Response,
    requestSerialize: serialize_Message,
    requestDeserialize: deserialize_Message,
    responseSerialize: serialize_Response,
    responseDeserialize: deserialize_Response,
  },
  // Method to continuously receive messages
receiveMessages: {
    path: '/Chat/receiveMessages',
    requestStream: false,
    responseStream: true,
    requestType: chatapp_pb.User,
    responseType: chatapp_pb.Message,
    requestSerialize: serialize_User,
    requestDeserialize: deserialize_User,
    responseSerialize: serialize_Message,
    responseDeserialize: deserialize_Message,
  },
  // Method to listen for updated user list in the chat room
listenForUpdatedInChatRoom: {
    path: '/Chat/listenForUpdatedInChatRoom',
    requestStream: false,
    responseStream: true,
    requestType: chatapp_pb.User,
    responseType: chatapp_pb.UserList,
    requestSerialize: serialize_User,
    requestDeserialize: deserialize_User,
    responseSerialize: serialize_UserList,
    responseDeserialize: deserialize_UserList,
  },
};

exports.ChatClient = grpc.makeGenericClientConstructor(ChatService);
