import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFinalModel } from 'src/app/models/ProductFinalModel';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchtxt: string
  isOpen:boolean= false;
  faHeart=faHeart;
  faCartPlus=faCartPlus;
  closeResult: string | undefined;
  products : ProductFinalModel[];
  constructor(
    private modalService: NgbModal, 
    private _activatedRoute: ActivatedRoute,
    private serviceAdmin : AdminService,
    private route: Router,
    public auth: AuthService
  ) {
    _activatedRoute.params.subscribe(params =>
      this.searchtxt = params['text'])
   }

  ngOnInit(): void {
    this.onSearch();
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
  
  onSearch(){
      this.serviceAdmin.SearchProducts(this.searchtxt).subscribe(list=>{
        this.products = list;
      },ex=>{
        console.log(ex);
      })
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
