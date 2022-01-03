import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import { AddProductModel } from 'src/app/models/AddProductModel';
import { Category } from 'src/app/models/CategoryModel';
import { Department } from 'src/app/models/DepartmentModel';
import { ProductFinalModel } from 'src/app/models/ProductFinalModel';
import { ProductModel } from 'src/app/models/ProductModel';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent implements OnInit {
  

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private auth: AuthService,
    private serviceAdmin:AdminService,

  ) { }
  image: File;
  successMessage:string;
  productForm!: FormGroup;
  product: ProductFinalModel;
  email = this.auth.email;
  departments:Department[];
  categories:Category[];
  d: Department;

  ngOnInit(): void {
    this.successMessage ='';

    this.GetAllDepartments();
    this.GetHomeCategories();

    this.product = {
      categoryId:0,
      email: '',
      departmentId: 0,
      productName: '',
      productPrice: 0,
      productQuantity: 0,
      productSize: '',
      productDescription: '',
      forswap: true,
      forsell: true,
      ownerFirstName: '',
      ownerLastName: '',
      sInCart: '',
      sInFav: '',
      sIsOwner: '',
      productImage: '',
      userId: '', 
      productId: 0,
      e: ''
    };

    this.productForm = this.fb.group({
      image: null,
      productName: ['', Validators.required],
      productPrice: [0, Validators.required],
      productDepartment: -1,
      productQuantity: [0, Validators.required],
      productSize: '',
      productDescription: '',
      categoryId:-1,
      forswap: true,
      forsell: true
    });

  }


  AddProduct(){

    if(this.productForm.valid){
      this.ValidateProduct();
      const formdata = new FormData();
        formdata.append('image', this.image);
        formdata.append('productName', this.product.productName);
        formdata.append('productPrice', this.product.productPrice.toString());
        formdata.append('departmentId', this.product.departmentId.toString());
        formdata.append('email', this.product.email);
        formdata.append('productQuantity', this.product.productQuantity.toString());
        formdata.append('productDescription', this.product.productDescription);
        formdata.append('forsell', this.product.forsell.toString());
        formdata.append('forswap', this.product.forswap.toString());
        formdata.append('categoryId', this.product.categoryId.toString());
      this.service.AddProduct(formdata).subscribe(s => {
        this.successMessage = 'Product Added Successfully';
      }, ex => {
        this.successMessage='';
        console.log(ex);
      })
    }
  }

  imageprocess(event: any){
    if(event.target.files!== null && event.target.files.length >0){
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        $('#userimage').attr('src', reader.result.toString());
      }
      reader.readAsDataURL(this.image);
    } 
  }
  
  ValidateProduct(){
    if(this.productForm.valid){

      this.product.departmentId = this.productForm.value.productDepartment;
      this.product.email = this.email;
      this.product.productName = this.productForm.value.productName;
      this.product.productPrice = this.productForm.value.productPrice;
      this.product.productQuantity = this.productForm.value.productQuantity;
      this.product.productDescription = this.productForm.value.productDescription;
      this.product.forswap = this.productForm.value.forswap;
      this.product.forsell = this.productForm.value.forsell;
    }
  }

  GetAllDepartments(){
    this.service.GetAllDepartments().subscribe(list => {
      this.departments = list;
    }, err =>{console.log(err);})
  }
  GetHomeCategories(){
    this.serviceAdmin.GetHomeCategories().subscribe((list)=>{
      this.categories=list;
   },err=>console.log(err));
  }

}
