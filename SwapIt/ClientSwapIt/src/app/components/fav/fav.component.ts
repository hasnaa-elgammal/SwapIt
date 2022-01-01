import { Component, OnInit } from '@angular/core';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/categories/interfaces/product.interface';
import { ProductFinalModel } from 'src/app/models/ProductFinalModel';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {
  faHeartBroken=faHeartBroken;
  faCartPlus=faCartPlus;
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
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.GetFavProductsByEmail();
  }
  GetFavProductsByEmail(){
    this.serviceAdmin.GetFavProductsByEmail(this.auth.email).subscribe((list)=>{
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

  RemoveFromFav(id:number){
    this.serviceAdmin.RemoveFromFav(id).subscribe(x=>{
    },ex=>console.log(ex));
  }

  RemoveProductFromAllFiles(productName: string){
    this.serviceAdmin.RemoveProductFromAllFiles(productName).subscribe(x=>{
    },ex=>console.log(ex));
  }

}
