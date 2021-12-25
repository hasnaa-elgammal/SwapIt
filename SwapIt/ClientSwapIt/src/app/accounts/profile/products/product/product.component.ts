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



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  constructor(
    private service:UserService,
    private auth: AuthService,
    private router:Router
  ) { }
  
  faHeart= faHeart;
  faCartPlus=faCartPlus;
  photo:'assets/book.jpg';

  products:ProductModel[];
  ngOnInit(): void {
    
    this.products=null;
    var photo = 'assets/bag.jpg'

    // faMapMarkerAlt=faMapMarkerAlt;
    // faCog = faCog;
    // faCommentAlt=faCommentAlt;
    // faHeart= faHeart;
    // faCartPlus=faCartPlus;
    // faStar=faStar;

    this.getProducts();
  }
  getProducts() {
    this.service.GetAllProducts().subscribe((list)=>{
      this.products=list;
   },err=>console.log(err));
  }


}
