import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { SubCategory } from 'src/app/models/SubCategory';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private adminService:AdminService,
    private router:Router,
    private activateRoute:ActivatedRoute,
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
    this.msg=null;

    this.productForm=this.fb.group({
      productName:['',Validators.required],
      productDescription:['',Validators.required],
      productSize:[null],
      productPrice:[0,Validators.required],
      productQuantity:[0,Validators.required],
      departmentId:[0,Validators.required],

    })
    this.GetSubCategories();

    this.activateRoute.paramMap.subscribe(param=>{
      var id=+param.get('id');
      if(id){
        this.adminService.GetProduct(id).subscribe(product=>{
          this.productForm.patchValue({
            departmentId:product.subCategory.departmentId,
            productName:product.productName,
            productDescription:product.productDescription,
            productPrice:product.productPrice,
            productQuantity:product.productQuantity,

          });

         id=product.productId;
        },ex=>{console.log(ex)});
      }
    })
  }

  GetSubCategories(){
    this.adminService.GetAllSubCategories().subscribe(subs=>{
      this.subCategories=subs;
    },ex=>console.log(ex));
  }



  EditProduct(){

    if(this.productForm.valid){
      const fd=new FormData();
      fd.append('departmentId',this.productForm.value.departmentId);
      fd.append('productName',this.productForm.value.productName);
      fd.append('productDescription',this.productForm.value.productDescription);
      fd.append('productPrice',this.productForm.value.productPrice);
      fd.append('productQuantity',this.productForm.value.productQuantity);



      this.adminService.EditProduct(fd).subscribe(success=>{
        this.msg="Updated Product Sucessfully";
        this.errmsg="null";
      },ex=>{
        console.log(ex);
        this.msg=null;
        this.errmsg=ex;
        
      })
    }
  }


  GoToList(){
    sessionStorage.setItem('product','product');
    this.router.navigate(['/admin']);
  }
}
