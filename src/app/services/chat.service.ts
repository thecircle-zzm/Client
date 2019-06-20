import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Socket, SocketIoConfig } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatList:Map<string, MessageService> = new Map<string, MessageService>();
  config: SocketIoConfig = { url: 'http://145.49.6.171:5000', options: {} };

  constructor() { }

  newChat(chatId:string){
    this.chatList.set(chatId, new MessageService(new Socket(this.config)))
    return true;
  }

  getChat(chatId:string){
    return this.chatList.get(chatId);
  }
}
