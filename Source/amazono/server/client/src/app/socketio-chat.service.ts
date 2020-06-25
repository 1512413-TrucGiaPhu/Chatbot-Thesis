import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

export class SocketIOChatService {
    constructor(private socket: Socket) { }

    message = this.socket.fromEvent<any>('admin-chat');
    allMessages = this.socket.fromEvent<any>('chat-message');

    sendMessage(message: any) {
        this.socket.emit('admin-chat', message);
    }

    sendMessageAll(message) {
      this.socket.emit('chat-message', message);
    }

    joinRoom(roomId) {
      this.socket.emit('create-room', roomId);
    }

}