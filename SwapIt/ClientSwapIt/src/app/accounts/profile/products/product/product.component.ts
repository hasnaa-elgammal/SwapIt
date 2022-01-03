import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/categories/interfaces/product.interface';
import { ProductModel } from 'src/app/models/ProductModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import{faStar} from '@fortawesome/free-solid-svg-icons';
import {faCog, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { AdminService } from 'src/app/services/admin.service';
import { ProductFinalModel } from 'src/app/models/ProductFinalModel';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  isShown:boolean;
  currentOpen:number;

  constructor(
    private service:UserService,
    private auth: AuthService,
    private router:Router,
    private serviceAdmin:AdminService,
  ) { }
  
  faHeart= faHeart;
  faCartPlus=faCartPlus;
  photo:'assets/book.jpg';

  products:ProductFinalModel[];
  ngOnInit(): void {
    
    this.products=null;
    var photo = 'assets/bag.jpg'

    // faMapMarkerAlt=faMapMarkerAlt;
    // faCog = faCog;
    // faCommentAlt=faCommentAlt;
    // faHeart= faHeart;
    // faCartPlus=faCartPlus;
    // faStar=faStar;

    // this.getProducts();
  }
  // getProducts() {
  //   this.service.GetAllProducts().subscribe((list)=>{
  //     this.products=list;
  //  },err=>console.log(err));
  // }


 
  GetHomeProductsByDepartmentId(id: number){
    this.serviceAdmin.GetHomeProductsByDepartmentId(id).subscribe((list)=>{
      this.products=list;
   },err=>console.log(err));
  }
 
  check(email1: string, email2: string, flag: boolean){
    return email1 != email2 && flag == true;
  }
  checkSub(catId: number){
    return catId == this.currentOpen; 
  }
  GetProductsByTwoIds(catId: number, depId: number){
    catId =  catId* 1000000 + depId;
    this.serviceAdmin.GetProductsByTwoIds(catId).subscribe((list)=>{
      this.products=list;
   },err=>console.log(err));
  }
}
