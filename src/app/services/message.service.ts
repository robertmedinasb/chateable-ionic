import { Injectable } from "@angular/core";
import { Message } from "../models/message";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  messageList: AngularFireList<any>;
  selectedMessage: Message = new Message();

  constructor(private firebase: AngularFireDatabase) {}

  getMessages() {
    this.messageList = this.firebase.list("messages");
    return this.messageList;
  }

  sendMessage(message: Message) {
    let currentuser = JSON.parse(localStorage.getItem("currentuser"));
    let owner = currentuser.$username;
    if (message.$body != undefined)
      this.messageList.push({
        body: message.$body,
        owner: owner,
      });
  }

  updateMessage(message: Message) {
    this.messageList.update(message.$key, {
      body: message.$body,
    });
  }

  deleteMessage($key: string) {
    this.messageList.remove($key);
  }
}
