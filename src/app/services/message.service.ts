import { Injectable } from "@angular/core";
import { Socket } from 'ngx-socket-io';
import { Message } from '../models/message';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
/* MessageService expects to get chat messages over an event with the id of the stream in question. *
 * It sends messages using 'sendMessage' as an event, for the server to handle by reading the same event *
 * It can fire off a single getAll request at load to get all older messages in the chat */
export class MessageService {
    gottenMessages: Observable<Message[]>;
    private chatId: string;
    constructor(private socket: Socket) {
    }
    public getObservable(){
        return new Observable((observer) => {
            this.socket.on('sendMessage', (data) => {
                console.log(data)
                let message = new Message();
                message.parse(data);
                observer.next(message);
            });
        });
        
    }
    public getSocket(){
        return this.socket;
    }

    public connect(roomId:string,username:string){
        this.socket.connect()
        let login = JSON.stringify({"room":roomId,"username":username})
        console.log(login)
        this.socket.emit('join', login)
    }
    public getAll(chatId:string){
        this.socket.emit('getAll',chatId)
    }

    public send(m:Message) {
        
        this.socket.emit('sendMessage',m.stringify(),(e)=>{
            console.log(m.stringify())
            if(e){
                return false;
            } else{
                return true;
            }
        })
    }

    public getChat(chat:string){
        this.socket.emit('getMessage',chat);
    }

    public disconnect(){
        this.socket.disconnect();
    }
}
