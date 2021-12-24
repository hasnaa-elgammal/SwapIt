import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import { ProductModel } from 'src/app/models/ProductModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent implements OnInit {
  errorMsg: any;

  constructor(
    private fb: FormBuilder,
    private service: UserService

  ) { }
  message:string;
  productForm: FormGroup;
  product: ProductModel;
  products: ProductModel[];
  isBusy: boolean;
  regx = RegExp;
  isOpen:boolean= false;

  ngOnInit(): void {
    this.isBusy =false;
    this.product = {
    
      productId: null,
      userId: '',
      departmentId: 1,
      productName: '',
      productPrice: 0,
      productQuantity: 0,
      productSize: '',
      productDescription: '',
      forswap: true,
      forsell: true

    };


    this.productForm = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // country: ['', Validators.required],
      // city: '',
      // zipCode: '',
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],

      productId: null,
      userId: '',
      departmentId: 1,
      productName: '',
      productPrice: 0,
      productQuantity: 0,
      productSize: '',
      productDescription: '',
      forswap: true,
      forsell: true
      
      
    });

  }

  toggleNav(){
    this.isOpen=! this.isOpen
  }
  AddProduct(){
    
      //this.product.productId = this.productForm.value.productId;
      //this.product.userId = this.productForm.value.userId;
      this.product.productName = this.productForm.value.productName;
      this.product.productPrice = this.productForm.value.productPrice;
      this.product.productQuantity = this.productForm.value.productQuantity;
      this.product.productSize = this.productForm.value.productSize;
      this.product.productDescription = this.productForm.value.productDescription;
      this.product.forswap = this.productForm.value.forswap;
      this.product.forsell = this.productForm.value.forsell;
      // this.product.departmentId = this.productForm.value.departmentId;
      // this.service.AddProduct(this.product).subscribe(s=>{
      // this.ngOnInit();
      // this.message='The Product is Added Successfully';
      // }, ex => this.errorMsg=ex);

      this.service.AddProduct(this.product).subscribe(s => {
        this.message = 'Product Added Successfully';
      }, ex => this.errorMsg = ex)
      
    

  }
 

}
