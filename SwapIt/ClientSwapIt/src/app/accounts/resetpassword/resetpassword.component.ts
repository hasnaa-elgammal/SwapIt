import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetModel } from 'src/app/models/resetpass-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  userForm!: FormGroup;
  successMessage : string;
  dangerMessage : string;
  model: ResetModel

  constructor(
    private fb: FormBuilder,
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.successMessage = '';
    this.dangerMessage = '';
    this.model = {
      email: this.service.email,
      oldPassword: '',
      newPassword: ''
    }

    this.userForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    });
  }

  reset(){
    if (this.userForm.valid){
        this.validateModel();
        this.service.ResetPassword(this.model).subscribe(success => {
          this.dangerMessage ='';
          this.successMessage = 'Reset Password successfully!';
        }, err => {
          this.successMessage='';
          this.dangerMessage = 'Cannot reset password, Please Try Again!';
        });
    } 
  }

  validateModel(){
    this.model.oldPassword = this.userForm.value.oldPassword;
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
