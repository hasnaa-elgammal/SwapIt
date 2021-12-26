import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RC4Drop } from 'crypto-js';
import { SubCategory } from 'src/app/models/SubCategory';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private adminService:AdminService,
    private router:Router,
  ) { }

  msg:string;
  errmsg:string;
  messages={
    productName:{
      required:'The product name is required'
    },
    productDescription:{
      required:'The product Description is required'
    },
    productPrice:{
      required:'The product Price is required'
    },
    productQuantity:{
      required:'The product Quantity is required'
    },
    departmentId:{
      required:'The department Id is required'
    },
  }

  productForm:FormGroup;
  subCategories:SubCategory[];
  ngOnInit(): void {
    this.subCategories=[];

    this.productForm=this.fb.group({
      productName:['',Validators.required],
      productDescription:['',Validators.required],
      productSize:[null],
      productPrice:[0,Validators.required],
      productQuantity:[0,Validators.required],
      departmentId:[0,Validators.required],

    })
    this.GetSubCategories();
  }

  GetSubCategories(){
    this.adminService.GetAllSubCategories().subscribe(subs=>{
      this.subCategories=subs;
    },ex=>console.log(ex));
  }

  AddProduct(){

    const fd=new FormData();
    fd.append('departmentId',this.productForm.value.departmentId);
    fd.append('productName',this.productForm.value.productName);
    fd.append('productDescription',this.productForm.value.productDescription);
    fd.append('productPrice',this.productForm.value.productPrice);
    fd.append('productQuantity',this.productForm.value.productQuantity);

    this.adminService.AddProduct(fd).subscribe(success=>{
      this.msg="Added Product Sucessfully";
      this.errmsg="null";
    },ex=>{
      console.log(ex);
      this.msg=null;
      this.errmsg=ex;
      
    })

    
  }


  GoToList(){
    sessionStorage.setItem('product','product');
    this.router.navigate(['/admin']);
  }
}
