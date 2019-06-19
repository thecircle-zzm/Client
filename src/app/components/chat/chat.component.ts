import { Component, OnInit, OnDestroy, Input, AfterViewChecked, ViewChild, ElementRef } from "@angular/core";
import { Subscription } from 'rxjs'
import { MessageService } from '../../services/message.service'
import { Message } from '../../models/message'


declare var $: any;
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  
    @Input('chatId') chatId: string;
    
    username: string = JSON.parse(sessionStorage.getItem('user')).username;
    public text = '';
    public errorMessage = "Please input text.";
    messages: Message[] = [];
    private mSub: Subscription;
    constructor(private mService:MessageService) { }
    ngOnInit(){
      $('.modal').hide();
      this. mSub = this.mService.getObservable(this.chatId,this.username).subscribe((message: Message) => {
        if(!this.messages.includes(message)){
          this.messages.push(message);
        }
      });
      //this.mService.getAll(this.chatId);
    }
    ngOnDestroy(){
      this.mSub.unsubscribe();
      this.mService.disconnect();
    }
    onChanges(){
      alert("changed")
      let doc = document.getElementById("itemList")
      doc.scrollTop = doc.scrollHeight;
    }
  send(){
    if(this.text == ''){
      this.notifyUser('noInput');
    } else{
      let m = new Message();
      m.username = this.username;
      m.message = this.text;
      this.text = '';
      this.mService.send(m);
    }
  }

  ngAfterViewChecked(){
    let doc = document.getElementById('itemList')
    doc.scrollTop = doc.scrollHeight;
  }

  closeModal() {
    $('.modal').hide();
  }

  changeMessage(message:string) {
    this.errorMessage = message;
    $('.modal').show();
  }

  notifyUser(messageType:string):void {
    switch(messageType){
      case 'noInput': {
        this.changeMessage("Please input text.");
      }

    }
  }
}