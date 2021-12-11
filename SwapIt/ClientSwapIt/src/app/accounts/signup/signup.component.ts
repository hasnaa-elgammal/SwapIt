import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { RegisterModel } from 'src/app/models/register-model';
import { Users } from 'src/app/models/users.model';
import { RegisterService } from 'src/app/services/register.service';
import { createUnparsedSourceFile } from 'typescript';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: RegisterService
  ) { }

  userForm!: FormGroup;
  register: RegisterModel;
  successMessage : string;
  isbusy: boolean;
  existsmessage: string;

  ngOnInit(): void {
    this.isbusy=false;
    this.successMessage = '';
    this.existsmessage = '';
    this.register = {
      email:'',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      zipCode: '',
      password: ''
    };
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: '',
      zipCode: '',
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone:''
    });

    this.userForm.valueChanges.subscribe(x=>{
      if(this.userForm.status=='VALID'){
        this.isbusy = true;
      }
    },ex=> console.log(ex));
  }

  singup(){
      if (this.userForm.valid){
        this.validateRegisterModel();
        this.service.Register(this.register).subscribe(success => {
          this.successMessage = 'Signed Up successfully! You can Login Now.';
        }, err => console.log(err));        
      } 
  }

  validateRegisterModel() {
      this.register.firstName = this.userForm.value.firstName;
      this.register.lastName = this.userForm.value.lastName;
      this.register.email = this.userForm.value.email;
      this.register.country = this.userForm.value.country;
      this.register.city = this.userForm.value.city;
      this.register.zipCode = this.userForm.value.zipCode;
      this.register.password = this.userForm.value.password;
  }

  passwordsNotMatch(){
      if (this.userForm.value.password !=='' && this.userForm.value.confirmPassword !== ''){
        if((this.userForm.value.password !== this.userForm.value.confirmPassword) && 
        (this.userForm.value.password.length >5) && (this.userForm.value.confirmPassword.length >5)){
          return true;
        }
      }
      return false;
  }

  isPasswordValid(){
    const pass= this.userForm.value.password;
    if(pass.length >5){
      if (!pass.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/)){
        return false;
      }
    }
    return true;
  }


  isEmailExists(){
    const e = this.userForm.value.email;
    if(e !=null && e!='' && this.isbusy === false){
      this.service.EmailExists(e).subscribe(x=> {
        this.existsmessage ='Email is already Exists';
      },ex=> {
        this.existsmessage ='';
      })
      return true;
    }else {
      this.existsmessage ='';
    }
    return false;
  }

}
