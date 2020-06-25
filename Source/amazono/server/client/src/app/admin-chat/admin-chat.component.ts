import { Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AdminChatListComponent } from '../admin-chat-list/admin-chat-list.component';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss']
})
export class AdminChatComponent implements OnInit {

  convList; // all conversation
  messageList; // single message list in conversation
  activatingMessageList;
  @ViewChild('chatList') chatList: AdminChatListComponent;

  BACKEND_URL = environment.apiUrl;

  constructor(
    private rest: RestApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // remove footer and chatbox
    document.getElementsByClassName('chatbox-holder')[0].remove();
    document.getElementsByClassName('page-footer')[0].remove();
    this.activatedRoute.params.subscribe(res => {
      console.log(res.id);
      if (res) {
        this.activatingMessageList = res.id;
      }
    });
    this.rest.get(`${this.BACKEND_URL}/conversations`).then((conv: any) => {
      this.convList = conv.conversations.sort((a,b) => (a.created > b.created) ? -1 : ((b.created > a.created) ? 1 : 0))
                                        .map(c => {
                                          c['isJoinedChat'] = false;
                                          c['isClosedChat'] = false
                                          return c;
                                        });
      console.log(this.convList);
      // format to display newuser message
      this.convList.forEach(c => {
        console.log(c);
        let index = c.dialog.findIndex(d => d.from == 'otheruser');
        if (index > 0) {
          for (let i=index + 1; i<c.dialog.length-1; i++) {
            if (c.dialog[i].from == 'user'){
                c.dialog[i].from = 'newuser';
            }
          }
        }
      });


      let idArr: Array<any> = conv.conversations.map(c => c._id);
      // check param value, if match any in conversation list, then select the conversation, else select first conversation
      if (idArr.includes(this.activatingMessageList)) {
        this.chatList.selectedConv = conv.conversations.find(x => x._id == this.activatingMessageList);
        this.messageList = this.chatList.selectedConv;
      } else {
        this.chatList.selectedConv = conv.conversations[0];
        this.messageList = this.chatList.selectedConv;
      }
      console.log(this.convList);
    })

  }

  onDisplayChat(messageList) {
    console.log(messageList)
    this.messageList = messageList;
  }

  onChangeChatState({ roomId, isJoinedChat, isClosedChat }) {
    this.convList.forEach(c => {
      if (c._id === roomId) {
        console.log('change state chat on ', c._id);
        c.isJoinedChat = isJoinedChat;
        c.isClosedChat = isClosedChat;
      }
    });
  }
}
