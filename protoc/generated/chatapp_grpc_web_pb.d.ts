import * as grpcWeb from 'grpc-web';

import * as chatapp_pb from './chatapp_pb';


export class ChatClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  leaveChat(
    request: chatapp_pb.User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: chatapp_pb.Response) => void
  ): grpcWeb.ClientReadableStream<chatapp_pb.Response>;

  joinChat(
    request: chatapp_pb.User,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: chatapp_pb.Response) => void
  ): grpcWeb.ClientReadableStream<chatapp_pb.Response>;

  sendMessage(
    request: chatapp_pb.Message,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: chatapp_pb.Response) => void
  ): grpcWeb.ClientReadableStream<chatapp_pb.Response>;

  receiveMessages(
    request: chatapp_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<chatapp_pb.Message>;

  listenForUpdatedInChatRoom(
    request: chatapp_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<chatapp_pb.UserList>;

}

export class ChatPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  leaveChat(
    request: chatapp_pb.User,
    metadata?: grpcWeb.Metadata
  ): Promise<chatapp_pb.Response>;

  joinChat(
    request: chatapp_pb.User,
    metadata?: grpcWeb.Metadata
  ): Promise<chatapp_pb.Response>;

  sendMessage(
    request: chatapp_pb.Message,
    metadata?: grpcWeb.Metadata
  ): Promise<chatapp_pb.Response>;

  receiveMessages(
    request: chatapp_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<chatapp_pb.Message>;

  listenForUpdatedInChatRoom(
    request: chatapp_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<chatapp_pb.UserList>;

}

