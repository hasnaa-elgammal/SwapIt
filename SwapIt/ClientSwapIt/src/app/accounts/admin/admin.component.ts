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
  isUserRoleList:boolean;
  isCategoryList:boolean;
  isSubCategoryList:boolean;
  isProductList:boolean;
  isEditUser:boolean;
  isContactList:boolean;

  ngOnInit(): void {

    this.isUserList=false;
    this.isUserRoleList=false;
    this.isAddUser=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isProductList=false;
    this.isEditUser=false;
    this.isContactList=false;
    

    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });
  if(sessionStorage.getItem("editUserRole")){
    this.CheckUserRoleList();
    sessionStorage.removeItem("editUserRole");
  }

  if(sessionStorage.getItem("edituser")){
    this.EditUserList();
    sessionStorage.removeItem("edituser");
  }

  if(sessionStorage.getItem("cat")){
    this.GetCategoryList();
    sessionStorage.removeItem("cat");
  }
  if(sessionStorage.getItem("subcat")){
    this.GetSubCategoryList();
    sessionStorage.removeItem("subcat");
  }
  if(sessionStorage.getItem("product")){
    this.GetProductList();
    sessionStorage.removeItem("product");
  }
  }

  CheckUser():boolean{
    this.isAddUser=false;
    this.isUserRoleList=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isProductList=false;
    this.isEditUser=false;
    this.isContactList=false;
    return this.isUserList=true;
  }
  AddUser(){
    this.isUserList=false;
    this.isUserRoleList=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isProductList=false;
    this.isEditUser=false;
    this.isContactList=false;
    return this.isAddUser=true;
  }
  CheckUserRoleList():boolean{
    this.isUserList=false;
    this.isAddUser=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isProductList=false;
    this.isEditUser=false;
    this.isContactList=false;
    return this.isUserRoleList=true;
  }
  GetCategoryList(){
    this.isUserList=false;
    this.isAddUser=false;
    this.isUserRoleList=false;
    this.isSubCategoryList=false;
    this.isProductList=false;
    this.isEditUser=false;
    this.isContactList=false;
    return this.isCategoryList=true;
  }
  GetSubCategoryList(){
    this.isCategoryList=false;
    this.isUserList=false;
    this.isAddUser=false;
    this.isUserRoleList=false;
    this.isProductList=false;
    this.isEditUser=false;
    this.isContactList=false;
    return this.isSubCategoryList=true;
  }
  GetProductList(){
    this.isCategoryList=false;
    this.isUserList=false;
    this.isAddUser=false;
    this.isUserRoleList=false;
    this.isSubCategoryList=false;
    this.isEditUser=false;
    this.isContactList=false;
    return this.isProductList=true;
  }
  GetContactList(){
    this.isCategoryList=false;
    this.isUserList=false;
    this.isAddUser=false;
    this.isUserRoleList=false;
    this.isSubCategoryList=false;
    this.isEditUser=false;
    this.isProductList=false;
    return this.isContactList=true;
  }
  EditUserList(){
    this.isAddUser=false;
    this.isUserRoleList=false;
    this.isCategoryList=false;
    this.isSubCategoryList=false;
    this.isProductList=false;
    this.isUserList=false;
    this.isContactList=false;
    return this.isEditUser=true;
  }
  
}
