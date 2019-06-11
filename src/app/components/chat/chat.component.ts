import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs'
import { MessageService } from '../../services/message.service'
import { Message } from '../../models/message'

@Component({
    selector: 'chat-component',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit, OnDestroy {
    @Input('chatId') chatId: string;
    @Input('username') username: string;
    public text = '';
    messages: Message[] = [];
    private mSub: Subscription;
    constructor(private mService:MessageService) { }
    ngOnInit(){
      this. mSub = this.mService.getObservable(this.chatId).subscribe((message: Message) => {
        if(!this.messages.includes(message)){
          this.messages.push(message);
        }
      });
      //this.mService.getAll(this.chatId);
    }
    ngOnDestroy(){
      this.mSub.unsubscribe();
    }
  send(){
    if(this.text == ''){
      alert("Nope, please put in a text")
    } else{
      let m = new Message();
        
      m.username = this.username;
      m.text = this.text;
      m.chat = this.chatId;
      this.text = '';
      this.mService.send(m);
    }
  }
}