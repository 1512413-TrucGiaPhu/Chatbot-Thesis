import { RestApiService } from './../rest-api.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import { SocketIOChatService } from '../socketio-chat.service';

@Component({
    selector: 'app-chatbox',
    templateUrl: './chatbox.component.html',
    styleUrls: ['./chatbox.component.scss']
  })
  export class ChatboxComponent implements OnInit {

    BACKEND_URL = environment.apiUrl;

    botGreet = { type: 'text', content: "Chào anh chị, em là bot, anh chị có thắc mắc cứ hỏi ạ", from: "bot" }

    messageList = [{
        type: 'text',
        content: "hi bot",
        from: "user"
    },
        this.botGreet
    ,
    {
        type: "image",
        content: "https://imgc.artprintimages.com/img/print/funny-image-from-wild-nature-gray-squirrel-sciurus-carolinensis-cute-animal-in-the-forest-ground_u-l-q1a1rxu0.jpg?h=550&p=0&w=550&background=fbfbfb",
        from: "bot"
    }
    ];

    displayChatbox = false;
    isSendingRequest = false;

    userInput = "";

    conversationId = '';
    chatToBot = true; // false means chat to admin
    chatButtionDisabled = false;
    isWaitingForAdmin = false;
    constructor(
        public data: DataService,
        private rest: RestApiService,
        private socket: SocketIOChatService,
        private ref: ChangeDetectorRef
        ) { }

    ngOnInit(): void {
        this.socket.message.subscribe(msg => {
            console.log(msg);
            if (msg.from == this.conversationId) {
                this.chatButtionDisabled = false;
                this.isWaitingForAdmin = false;
                if (msg.content.type == 'notification') {
                    this.messageList.push({ type: 'text', content: msg.content.content, from: "notification" });
                    // end chat with admin conversation, save converation then give it to bot to handle
                    if (msg.content.shouldEnd) {
                        this.chatToBot = true;

                        this.rest.put(`${this.BACKEND_URL}/conversation`, { id: this.conversationId, userId: null, dialog: this.messageList, isClosedChat: true }).then(result => {
                            console.log('update conversation successfully', result)
                        }).catch(err => {
                            console.log(err)
                        })

                        this.messageList.push(this.botGreet);
                    }
                } 
                else {
                    this.messageList.push({ type: "text", content: msg.content, from: "otheruser" });
                }
                
                this.scrollToBottom();
            }
        });
    }

    appendMessage(userInput: any) {
        if (userInput) {
            this.messageList.push({ type: "text", content: userInput, from: "user" });
            if (this.chatToBot) {
                this.messageList.push({ type: "loading", content: null, from: "bot" });
            }
            this.userInput = "";
            this.scrollToBottom();
            if (this.chatToBot) {
                this.sendRASARequest(userInput);
            } 
            else {
                this.sendSocketIORequest(userInput);
            }
            
        }
        document.getElementById('user-input').focus();
    }

    scrollToBottom() {
        this.ref.detectChanges();
        let objDiv = document.getElementById("chatbox-messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    async sendRASARequest(userInput: any) {
        try {
            this.isSendingRequest = true;
            const result: any = await this.rest.sendMessageChatbot({ message: userInput });
            console.log(result);
            console.log(this.messageList.length);
            console.log(this.messageList);
            if (result.length <= 2)
            {
              this.messageList[this.messageList.length - 1].content = result[0].text;
              this.messageList[this.messageList.length - 1].type = "text";
              if (result[0].text.includes('google')){
                if (result[1].image){
                    this.messageList.push({ from: 'bot', content: result[1].image, type: 'image'});
                }
                // just for debug: add chat with admin button
                this.messageList.push({ from: 'bot', content: 'chat với admin', type: 'chat-button'});
              }
            }
            // Trường hợp có img & text
            else
            {
              this.messageList[this.messageList.length - 1].content = result[0].text;
              this.messageList[this.messageList.length - 1].type = "text";

              if (result[0].text.includes('google')){
                // just for debug: add chat with admin button
                this.messageList.push({ from: 'bot', content: 'chat với admin', type: 'chat-button'});
              }
            }
        }
        catch {
            this.messageList[this.messageList.length - 1].content = "Có lỗi xảy ra khi kết nối tới server";
            this.messageList[this.messageList.length - 1].type = "text";
            // just for debug: add chat with admin button
            this.messageList.push({ from: 'bot', content: 'chat với admin', type: 'chat-button'});
        }
        finally {
            this.isSendingRequest = false;
            this.scrollToBottom();
        }

    }

    sendSocketIORequest(userInput: any) {
        this.socket.sendMessage({ roomId: this.conversationId, content: userInput});
    }

    handleChatAdmin() {
        console.log(this.messageList);
        // save the conversation, then use conversation id to create room 
        this.rest.post(`${this.BACKEND_URL}/conversation/`, { userId: null, dialog: this.messageList }).then((result:any) => {
            console.log(result);
            this.conversationId = result.conversation._id;
            this.socket.joinRoom(result.conversation._id);
            this.chatToBot = false;
            this.chatButtionDisabled = true;
            this.messageList.push({ from: 'bot', content: 'Anh chị vui lòng đợi admin hỗ trợ trong giây lát', type: 'text'});
            this.isWaitingForAdmin = true;
            this.scrollToBottom();
        })
    }

  }
