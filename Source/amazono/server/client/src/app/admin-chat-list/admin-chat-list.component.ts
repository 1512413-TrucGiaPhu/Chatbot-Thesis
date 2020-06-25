import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-chat-list',
  templateUrl: './admin-chat-list.component.html',
  styleUrls: ['./admin-chat-list.component.scss']
})
export class AdminChatListComponent implements OnInit {

  // getter and setter for conversation list, 
  private _convList;
  @Input() 
  set convList(convList) {
    if (convList) {
      this._convList = convList;
      console.log(convList);
      // preselect first element of conversation list

      // this.selectedConv = convList[0];
      // this.displayChatList(this.selectedConv);
    }
  };
  get convList() {
    return this._convList;
  }

  selectedConv;

  @Output() displayChat = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  displayChatList(message) {
    this.displayChat.emit(message);
    console.log(this.selectedConv);
  }


}
