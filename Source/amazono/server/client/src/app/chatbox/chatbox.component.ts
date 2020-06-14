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
        type: 'text',
        content: "hi bot",
        from: "user"
    },
    {
        type: 'text',
        content: "hi user",
        from: "bot"
    },
    {
        type: "image",
        content: "https://imgc.artprintimages.com/img/print/funny-image-from-wild-nature-gray-squirrel-sciurus-carolinensis-cute-animal-in-the-forest-ground_u-l-q1a1rxu0.jpg?h=550&p=0&w=550&background=fbfbfb",
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
            this.messageList.push({ type: "text", content: userInput, from: "user" });
            this.messageList.push({ type: "loading", content: null, from: "bot" });
            this.userInput = "";
            this.scrollToBottom();
            this.sendRASARequest(userInput);
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
            console.log(result)
            this.messageList[this.messageList.length - 1].content = result[0].text;
            this.messageList[this.messageList.length - 1].type = "text";
        }
        catch {
            this.messageList[this.messageList.length - 1].content = "There is problem communicating to server";
            this.messageList[this.messageList.length - 1].type = "text";
        }
        finally {
            this.isSendingRequest = false;
            this.scrollToBottom();
        }

    }

  }
