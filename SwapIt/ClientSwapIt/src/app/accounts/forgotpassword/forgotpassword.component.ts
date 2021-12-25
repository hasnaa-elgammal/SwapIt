import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  message: string;
  forgotForm! : FormGroup;

  ngOnInit(): void {
    this.message = '';

    this.forgotForm = this.fb.group({
      email:['', [Validators.required,Validators.email]]
    });
  }

  forgotrequest(){
    var email = this.forgotForm.value.email
    if(email != null && email != ''){
      this.auth.ForgotPassword(email).subscribe(success => {
        var token = Object.values(success).toString();
        localStorage.clear();
        localStorage.setItem('token', token);
        this.message="You must recieve an email to reset your password in few minutes";
      }, err =>{
        console.log(err);
        this.message = '';
      })
    }
  }

}
