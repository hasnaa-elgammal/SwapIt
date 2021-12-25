import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import { ForgotModel } from 'src/app/models/ForgotModel';

@Component({
  selector: 'app-forgotresetpass',
  templateUrl: './forgotresetpass.component.html',
  styleUrls: ['./forgotresetpass.component.css']
})
export class ForgotresetpassComponent implements OnInit {

  d: string;
  t: string;
  userForm!: FormGroup;
  successMessage : string;
  dangerMessage : string;
  model: ForgotModel;
  
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private activerouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.model = {
      id:'',
      token:'',
      newPassword:''
    }

    this.activerouter.queryParams.subscribe(params => {
      this.d  = params['ID'];
      this.t = params['Token'];
      if(this.d && this.t){
        var storage = localStorage.getItem('token');
        if(storage !== this.t){

          this.router.navigate(['']).then(x=> {window.location.reload();})
        }

      }else {
        this.router.navigate(['']).then(x=> {window.location.reload();})
      }
    }, ex => {console.log(ex);})
    this.successMessage = '';
    this.dangerMessage = '';
    this.model = {
      id: '',
      token: '',
      newPassword: ''
    }

    this.userForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    });
  }

  reset(){
    if (this.userForm.valid){
      if(this.userForm.value.newPassword !== null){
        this.validateModel();
        this.service.ResetForgotPassword(this.model).subscribe(success => {
          this.dangerMessage ='';
          this.successMessage = 'Reset Password successfully!';
          localStorage.clear();
        }, err => {
          this.successMessage='';
          this.dangerMessage = 'Cannot reset password, Please Try Again!';
        });
      }

    } 
  }

  validateModel(){
    this.model.id = this.d;
    this.model.token = this.t;
    this.model.newPassword = this.userForm.value.newPassword;
  }

  passwordsNotMatch(){
    if (this.userForm.value.newPassword !=='' && this.userForm.value.confirmNewPassword !== ''){
      if((this.userForm.value.newPassword !== this.userForm.value.confirmNewPassword)){
        return true;
      }
    }
    return false;
  }

  isPasswordValid(){
    const pass= this.userForm.value.newPassword;
    if(pass.length >5){
      if (!pass.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/)){
        return false;
      }
    }
    return true;
  }


}
