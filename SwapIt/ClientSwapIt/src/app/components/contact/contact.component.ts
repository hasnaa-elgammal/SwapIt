import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactModel } from 'src/app/models/ContactModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private auth: AuthService
  ) { }

  successMessage:string;
  ContactForm: FormGroup;
  contact:ContactModel;
  ngOnInit(): void {
    this.successMessage ='';

    this.contact = {
      name:'',
      email:'',
      messageId:0,
      fromId:'',
      toId:'',
      messageText:'',
      messageDate:new Date("Fri Dec 08 2019 07:44:57"),
      messageTime:{hours: 0,
      minutes: 0},
    }
    this.ContactForm = this.fb.group({
      
      contactName: ['', Validators.required],
      contactEmail:['', Validators.required],
      contactMsg: ['', Validators.required],
    });
  }
  AddContact(){

    if(this.ContactForm.valid){
      this.ValidateProduct();
      const formdata = new FormData();
        
        formdata.append('contactName', this.contact.name);
        formdata.append('contactEmail', this.contact.email);
        formdata.append('contactMsg', this.contact.messageText);
        
      this.service.AddContact(formdata).subscribe(s => {
        this.successMessage = 'Message Sent Successfully';
      }, ex => {
        this.successMessage='';
        console.log(ex);
      })
    }
  }
  ValidateProduct(){
    if(this.ContactForm.valid){

      this.contact.name = this.ContactForm.value.contactName;
      this.contact.email = this.ContactForm.value.contactEmail;
      this.contact.messageText = this.ContactForm.value.contactMsg;

      
     
    }
  }
}
