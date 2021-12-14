import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login-model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: RegisterService,
    private route: Router,
    private auth: AuthService
  ) { }

  dangerMessage: string;
  loginForm! : FormGroup;
  logmodel: LoginModel;

  ngOnInit(): void {
    this.dangerMessage = '';
    this.logmodel = {
      email: '',
      password: '',
      rememberMe: false
    }
    this.loginForm = this.fb.group({
      email:['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

  login(){
    if (this.loginForm.valid){
      this.validateLoginModel();
      this.service.Login(this.logmodel).subscribe(success => {
        const remember = !!this.loginForm.value.rememberMe;
        const email = this.loginForm.value.email;
        this.auth.installStorage(remember, email);
        
        this.route.navigate(['']).then(x=>{window.location.reload});
      }, err => {
        console.log(err);
        this.dangerMessage = 'Cannot login. Please, try again';
      } )
    }
  }

  validateLoginModel() {
    this.logmodel.email = this.loginForm.value.email;
    this.logmodel.password = this.loginForm.value.password;
    this.logmodel.rememberMe = this.loginForm.value.rememberMe;
}

}
