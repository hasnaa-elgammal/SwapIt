import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }
  isUserList:boolean;
  isAddUser:boolean;

  ngOnInit(): void {

    this.isUserList=false;
    this.isAddUser=false;
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });
  }

  CheckUser():boolean{
    this.isAddUser=false;
    return this.isUserList=true;
  }
  AddUser(){
    this.isUserList=false;
    return this.isAddUser=true;
  }
}
