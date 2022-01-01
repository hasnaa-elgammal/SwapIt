import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/categories/interfaces/product.interface';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductFinalModel } from 'src/app/models/ProductFinalModel';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faHeart=faHeart;
  faCartPlus=faCartPlus;
  faTrash= faTrash
  products: ProductFinalModel[];


  
  // products: Product[] = [
  //   {category:'Bages',photo:'assets/bag.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Books',photo:'assets/book.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Clothes',photo:'assets/clothes.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Clothes',photo:'assets/clothes2.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},

  //   {category:'Furniture',photo:'assets/furniture.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},


  // ];

  constructor(
    private serviceAdmin: AdminService,
    public auth : AuthService 
  ) { }

  ngOnInit(): void {
    this.GetCartProductsByEmail();
  }
  

  GetCartProductsByEmail(){
    this.serviceAdmin.GetCartProductsByEmail(this.auth.email).subscribe((list)=>{
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
  RemoveFromCart(id : number){
    this.serviceAdmin.RemoveFromCart(id).subscribe(x=>{
    },ex=>console.log(ex));
  }

  RemoveProductFromAllFiles(productName: string){
    this.serviceAdmin.RemoveProductFromAllFiles(productName).subscribe(x=>{
    },ex=>console.log(ex));
  }


}
