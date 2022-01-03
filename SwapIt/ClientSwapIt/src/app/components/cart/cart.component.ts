import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/categories/interfaces/product.interface';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductFinalModel } from 'src/app/models/ProductFinalModel';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';



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
  isShown:boolean;
  currentOpen:number;


  
  // products: Product[] = [
  //   {category:'Bages',photo:'assets/bag.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Books',photo:'assets/book.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Clothes',photo:'assets/clothes.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
  //   {category:'Clothes',photo:'assets/clothes2.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},

  //   {category:'Furniture',photo:'assets/furniture.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},


  // ];

  constructor(
    private serviceAdmin: AdminService,
    public auth : AuthService ,
    private modalService: NgbModal, 
  ) { }
  closeResult: string | undefined;

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
    window.location.reload();
  }

  RemoveProductFromAllFiles(productName: string){
    this.serviceAdmin.RemoveProductFromAllFiles(productName).subscribe(x=>{
    },ex=>console.log(ex));
    window.location.reload();
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
