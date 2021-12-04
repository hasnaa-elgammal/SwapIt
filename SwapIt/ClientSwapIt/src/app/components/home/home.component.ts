import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/categories/interfaces/product.interface';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isOpen:boolean= false;
  faHeart=faHeart;
  faCartPlus=faCartPlus;

  closeResult: string | undefined;
 

  products: Product[] = [
    {category:'Bages',photo:'assets/bag.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
    {category:'Books',photo:'assets/book.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
    {category:'Clothes',photo:'assets/clothes.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
    {category:'Clothes',photo:'assets/clothes2.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},

    {category:'Furniture',photo:'assets/furniture.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},


  ];


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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

}
