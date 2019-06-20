import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Socket, SocketIoConfig } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatList:Map<string, MessageService> = new Map<string, MessageService>();
  config: SocketIoConfig = { url: 'http://188.166.38.127:5000', options: {} };

  constructor() { }

  newChat(chatId:string){
    this.chatList.set(chatId, new MessageService(new Socket(this.config)))
    return true;
  }

  getChat(chatId:string){
    return this.chatList.get(chatId);
  }
}
