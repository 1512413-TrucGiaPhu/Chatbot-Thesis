import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { SocketIOChatService } from '../socketio-chat.service';

@Component({
  selector: 'app-admin-chat-detail',
  templateUrl: './admin-chat-detail.component.html',
  styleUrls: ['./admin-chat-detail.component.scss']
})
export class AdminChatDetailComponent implements OnInit {

  private _messageList;
  dialog = [];
  userInput = "";

  @Input() 
  set messageList(messageList) {
    if (messageList) {
      this._messageList = messageList;
      this.dialog = messageList.dialog;
      this.socket.joinRoom(messageList._id);
      this.scrollToBottom()
    }
  };
  get messageList() {
    return this._messageList;
  }

  @Output() changeChatState = new EventEmitter();

  constructor(
    private socket: SocketIOChatService,
    private ref: ChangeDetectorRef
    ) {
        // scroll to bottom on first load
        setTimeout(() => {
          document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;
        }, 500)
     }

  ngOnInit() {
    this.socket.message.subscribe(msg => {
      console.log(msg);
      if (msg.from == this.messageList._id) {
        this.dialog.push({ type: "text", content: msg.content, from: "newuser" });
        this.scrollToBottom();
      }
    });
  }

  joinChat() {
    this.sendSocketIORequest({ type: 'notification', content: 'Admin đã tham gia cuộc hội thoại' });
    this.changeChatState.next({ roomId: this.messageList._id, isJoinedChat: true, isClosedChat: false })
  }

  endChat() {
    this.sendSocketIORequest({ type: 'notification', content: 'Admin đã rời cuộc hội thoại', shouldEnd: true});
    this.changeChatState.next({ roomId: this.messageList._id, isJoinedChat: false, isClosedChat: true })
  }

  appendMessage(userInput: any) {
    if (userInput) {
        this.dialog.push({ type: "text", content: userInput, from: "otheruser" });
        this.userInput = "";
        this.scrollToBottom();
        this.sendSocketIORequest(userInput);
    }
    document.getElementById('user-input').focus();
  }

  sendSocketIORequest(userInput: any) {
    this.socket.sendMessage({ roomId: this.messageList._id, content: userInput});
  }

  scrollToBottom() {
      this.ref.detectChanges();
      let objDiv = document.getElementById("chatbox-messages");
      objDiv.scrollTop = objDiv.scrollHeight;
  }

}
