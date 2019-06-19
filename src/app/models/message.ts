export class Message implements JSON{
    [Symbol.toStringTag]: string;
    chat:string;
    message: string;
    username: string;
    parse(s:string){
        let j = JSON.parse(s);
        this.message = j.text;
        this.username = j.username;
    }
    public stringify(){
        return '{ message: "' + this.message + '", username: "' + this.username +'" }'
    }
}