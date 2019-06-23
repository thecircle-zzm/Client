export class Message {
    [Symbol.toStringTag]: string;
    chat:string;
    message: string;
    username: string;
    parse(j){
        this.message = j.message;
        this.username = j.username;
    }
    public stringify(){
        return JSON.stringify({"message":this.message,"username":this.username});
    }
}