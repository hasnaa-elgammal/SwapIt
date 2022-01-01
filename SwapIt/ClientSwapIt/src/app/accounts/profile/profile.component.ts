import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {faCog, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Product } from 'src/app/categories/interfaces/product.interface';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import{faStar} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/models/users.model';
import { AdminService } from 'src/app/services/admin.service';
import { ProductFinalModel } from 'src/app/models/ProductFinalModel';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isOpen:boolean=false;
  email:string;
  user: Users;
  faMapMarkerAlt=faMapMarkerAlt;
  faCog = faCog;
  faCommentAlt=faCommentAlt;
  faHeart= faHeart;
  faCartPlus=faCartPlus;
  faStar=faStar;
  products : ProductFinalModel[];
  

  // products: Product[] = [
    
  //   {category:'Bages',photo:'assets/bag.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Books',photo:'assets/book.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Clothes',photo:'assets/clothes.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Clothes',photo:'assets/clothes2.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},

  //   {category:'Furniture',photo:'assets/furniture.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},


  // ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    public auth: AuthService,
    private serviceAdmin: AdminService
    
    ) {
    _activatedRoute.params.subscribe(params =>
      this.email = params['email'])
   }

  ngOnInit(): void {
    this.user = new Users();
    this.GetProfileProductsByEmail();
    this.GetProfile();
    
  }

  toggleSettings(){
    this.isOpen= !this.isOpen
  }

  GetProfile(){
    this.auth.GetProfile(this.email).subscribe(success=> {
      var u = success;
      this.user.firstName = u.firstName;
      this.user.lastName = u.lastName;
      this.user.email = u.email;
      this.user.county = u.county;
      this.user.city = u.city;
      this.user.userImage = u.userImage;
      this.user.phoneNumber= u.phoneNumber;
    },err=>console.log(err));
  }

  SetImage(){
    if(this.user.userImage==null){
      return "assets/default.jpg"
    }else{
      return 'assets/images/users/' + this.user.userImage
    }
  }

  GetProfileProductsByEmail(){
    this.serviceAdmin.GetProfileProductsByEmail(this.auth.email).subscribe((list)=>{
      this.products = list;
    },ex=>console.log(ex));
  }
  
  SetImageProduct(pro : ProductFinalModel){
    if(pro.productImage==null || pro.productImage == "null" || pro.productImage == "Null" || pro.productImage == "NULL"){
      return "assets/images/products/def.jpg"
    }else{
      return 'assets/images/products/' + pro.productImage
    }
  }
  AddToCart(product: ProductFinalModel){
    product.e = this.auth.email;
    this.serviceAdmin.AddToCart(product).subscribe(p=>{
    },ex=>console.log(ex));
  }
  AddToFav(product: ProductFinalModel){
    product.e = this.auth.email;
    this.serviceAdmin.AddToFav(product).subscribe(p=>{
    },ex=>console.log(ex));
  }
  RemoveProductFromAllFiles(productName: string){
    this.serviceAdmin.RemoveProductFromAllFiles(productName).subscribe(x=>{
    },ex=>console.log(ex));
  }




}
