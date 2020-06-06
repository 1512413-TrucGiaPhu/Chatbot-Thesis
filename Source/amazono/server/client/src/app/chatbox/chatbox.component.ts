import { RestApiService } from './../rest-api.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-chatbox',
    templateUrl: './chatbox.component.html',
    styleUrls: ['./chatbox.component.scss']
  })
  export class ChatboxComponent implements OnInit {

    BACKEND_URL = environment.apiUrl;

    messageList = [{
        content: "hi bot",
        from: "user"
    },
    {
        content: "hi user",
        from: "bot"
    }];

    displayChatbox = false;
    isSendingRequest = false;

    userInput = "";

    constructor(
        public data: DataService, 
        private rest: RestApiService,
        private ref: ChangeDetectorRef
        ) { }

    ngOnInit(): void {

    }
    
    appendMessage(userInput: any) {
        if (userInput) {
            this.messageList.push({ content: userInput, from: "user" });
            this.messageList.push({ content: null, from: "bot" })
            this.userInput = "";
            this.ref.detectChanges();
            this.scrollToBottom();
            this.sendRASARequest(userInput);
        }
        document.getElementById('user-input').focus();
    }

    scrollToBottom() {
        let objDiv = document.getElementById("chatbox-messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    async sendRASARequest(userInput: any) {
        try {
            this.isSendingRequest = true;
            const result: any = await this.rest.sendMessageChatbot({ message: userInput });
            console.log(result)
            this.messageList[this.messageList.length - 1].content = result[0].text;
        }
        catch {
            this.messageList[this.messageList.length - 1].content = "There is problem communicating to server";
        }
        finally {
            this.isSendingRequest = false;
        }

    }

  }
