import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { UserModel } from 'src/app/models/UserModel';
import { Users } from 'src/app/models/users.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service:AdminService,
    private activateRoute:ActivatedRoute
  ) {
    activateRoute.params.subscribe(params=>
      this.id=params['id'])
   }
  id:string;
  message:string;
  errorMsg:string;
  userForm!: FormGroup;
  user:UserModel;
  users:Users[];
  userData:Users;
  successMessage : string;
  isbusy: boolean;
  existsmessage: string;
  title:string;
  btnTitle:string;

  ngOnInit(): void {

    this.isbusy=false;
    this.users=null;
    this.successMessage = '';
    this.existsmessage = ''; 
    this.errorMsg=null;
    this.title="Add New User";
    this.btnTitle="Add User";
    this.userData=null;

    this.user = {
      email:'',
      firstName: '',
      lastName: '',
      country: '',
      city: '',
      zipCode: '',
      password: '',
    
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
      
      
    });

    this.userForm.valueChanges.subscribe(x=>{
      if(this.userForm.status=='VALID'){
        this.isbusy = true;
      }
    },ex=> console.log(ex));

    this.GetAllUsers();

    this.activateRoute.paramMap.subscribe(param=>{
      var id=param.get('id');
      if(id){
        this.service.GetUser(id).subscribe(x=>{
          this.userData=x;
          this.title="Edit Users information";
          this.btnTitle="Update User";
          
        },ex=>console.log(ex));
      }
    })
  }


  AddUser(){
    if(this.userForm.valid){
      this.validateRegisterModel();
      this.service.AddUser(this.user).subscribe(s=>{
        this.ngOnInit();
        this.message='The User is Added Successfully';
      },ex=>this.errorMsg=ex);
    }
  
  }

  validateRegisterModel() {
      this.user.firstName=this.userForm.value.firstName;
      this.user.lastName=this.userForm.value.lastName;
      this.user.email=this.userForm.value.email;
      this.user.country=this.userForm.value.country;
      this.user.city=this.userForm.value.city;
      this.user.password=this.userForm.value.password;
      this.user.zipCode=this.userForm.value.zipCode;
      
  }

  isEmailExists(){
    const e = this.userForm.value.email;
    if(e !=null && e!='' && this.isbusy === false){
      this.service.EmailExists(e).subscribe(x=>{
        this.existsmessage ='Email is already Exists';
      },ex=> {this.existsmessage ='';})
      return true;
    }else {
      this.existsmessage ='';
      return false;
    }
   
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

  passwordsNotMatch(){
    if (this.userForm.value.password !=='' && this.userForm.value.confirmPassword !== ''){
      if((this.userForm.value.password !== this.userForm.value.confirmPassword) && 
      (this.userForm.value.password.length >5) && (this.userForm.value.confirmPassword.length >5)){
        return true;
      }
    }
    return false;
}

  GetAllUsers(){
    this.service.GetAllUsers().subscribe((list)=>{
      this.users=list;
    }, ex=> console.log(ex));
  }


}

