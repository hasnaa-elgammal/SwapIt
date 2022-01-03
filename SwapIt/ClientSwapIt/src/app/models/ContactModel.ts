import { Time } from "@angular/common";

export class ContactModel{
    name:string;
    email:string;
    messageId:number;
    fromId:string;
    toId:string;
    messageText:string;
    messageDate:Date;
    messageTime:Time;
}