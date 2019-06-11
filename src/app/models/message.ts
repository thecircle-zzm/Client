export class Message implements JSON{
    [Symbol.toStringTag]: string;
    chat:string;
    time: Date;
    text: string;
    username: string;
    parse(s:string){
        let j = JSON.parse(s);
        this.chat = j.chat;
        this.time = new Date(j.time);
        this.text = j.text;
        this.username = j.username;
    }
    public stringify(){
        return '{ "chat": "' + this.chat + '", "text": "' + this.text + '", "username": "' + this.username +'" }'
    }
}