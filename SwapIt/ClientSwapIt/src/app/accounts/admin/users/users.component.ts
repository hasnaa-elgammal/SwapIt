import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { Users } from 'src/app/models/users.model';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  

  constructor(
    private service:AdminService,
    private auth: AuthService,
    private router:Router
  ) { }

  users:Users[];
  ngOnInit(): void {
    this.users=null;
    this.service.GetAllUsers().subscribe((list)=>{
       this.users=list;
    },err=>console.log(err));
  }


  EditUserClick(id:string){

    this.router.navigate(['/edituser',id]);
  }


  // isUserAdmin(){
  //   if(this.auth.role.toLowerCase()=='admin'){
  //     return true;
  //   }
  //   return false;
  // }

}
