import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/categories/interfaces/product.interface';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFinalModel } from 'src/app/models/ProductFinalModel';
import { AdminService } from 'src/app/services/admin.service';
import { Department } from 'src/app/models/DepartmentModel';
import { CategoryModelHome } from 'src/app/models/CategoryModelHome';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isOpen:boolean= false;
  faHeart=faHeart;
  faCartPlus=faCartPlus;
  departments: Department[];


  closeResult: string | undefined;
  products : ProductFinalModel[];
  categories: CategoryModelHome[];
  

  // products: Product[] = [
  //   {category:'Bages',photo:'assets/bag.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Books',photo:'assets/book.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Clothes',photo:'assets/clothes.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Clothes',photo:'assets/clothes2.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},

  //   {category:'Furniture',photo:'assets/furniture.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},


  // ];
  pidandemail: string[];


  constructor(
    private modalService: NgbModal, 
    private serviceAdmin : AdminService,
    public auth: AuthService
    ) { }

  ngOnInit(): void {
    this.GetHomeProducts();
    this.GetHomeCategories();
  }

  toggleNav(){
    this.isOpen=! this.isOpen
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  SetImageProduct(pro : ProductFinalModel){
    if(pro.productImage==null || pro.productImage == "null" || pro.productImage == "Null" || pro.productImage == "NULL"){
      return "assets/images/products/def.jpg"
    }else{
      return 'assets/images/products/' + pro.productImage
    }
  }

  GetHomeProducts(){
    this.serviceAdmin.GetHomeProducts().subscribe((list)=>{
      this.products=list;
   },err=>console.log(err));
  }

  GetHomeCategories(){
    this.serviceAdmin.GetHomeCategories().subscribe((list)=>{
      this.categories=list;
   },err=>console.log(err));
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
