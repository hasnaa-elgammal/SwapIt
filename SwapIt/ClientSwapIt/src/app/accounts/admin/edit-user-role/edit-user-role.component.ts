import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUserRoleModel } from 'src/app/models/EditUserRoleModel';
import { RoleModel } from 'src/app/models/RoleModel';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.component.html',
  styleUrls: ['./edit-user-role.component.css']
})
export class EditUserRoleComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private activateRoute:ActivatedRoute,
    private router:Router,
    private service:AdminService,
  ) { }
  userForm:FormGroup;
  userId:string;
  roleId:string;
  userName:string;
  roles:RoleModel[];
  existsmessage: string;
  isbusy: boolean;
  userRole:EditUserRoleModel;

  ngOnInit(): void {

    this.userRole={
      roleId:'',
      userId:'',
    };

    this.isbusy=false;
    this.existsmessage = '';
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      roleName: ['', Validators.required],


    });



    this.activateRoute.paramMap.subscribe(param=>{
      var userId=param.get('id');
      var roleId=param.get('id1');
      if(userId && roleId){
        this.service.GetUser(userId).subscribe(x=>{
          this.userId=x.id;
          this.userName=x.userName;
          this.roleId=roleId;
          this.AddUserData();

        },ex=>console.log(ex));
        this.service.GetAllRoles().subscribe(s=>{
          this.roles=s;
        },ex=>console.log(ex))

      }else{
        this.router.navigate(['notfound']).then(x=>{window.location.reload()});
      }
    })
  }
  AddUserData() {
   this.userForm.setValue({
     userName:this.userName,
     roleName:this.roleId,
   })
  }
  EditRoles(){
    if(this.userId&& this.roleId &&this.userForm.valid){
      this.userRole.roleId=this.roleId;
      this.userRole.userId=this.userId;
      this.service.EditUserRole(this.userRole).subscribe(s=>{
        sessionStorage.setItem('editUserRole',"true");
        this.router.navigate(['admin']);
      },ex=>console.log(ex));
    }
  }
  isEmailExists(){
    const e = this.userForm.value.userName;
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

  onRoleChange(){
    this.roleId=this.userForm.value.roleName;
  }
}
