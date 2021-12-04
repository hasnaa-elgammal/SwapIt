import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/categories/interfaces/product.interface';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faHeart=faHeart;
  faCartPlus=faCartPlus;
  faTrash= faTrash


  
  products: Product[] = [
    {category:'Bages',photo:'assets/bag.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
    {category:'Books',photo:'assets/book.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
    {category:'Clothes',photo:'assets/clothes.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
    {category:'Clothes',photo:'assets/clothes2.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},

    {category:'Furniture',photo:'assets/furniture.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},


  ];

  constructor() { }

  ngOnInit(): void {
  }

}
