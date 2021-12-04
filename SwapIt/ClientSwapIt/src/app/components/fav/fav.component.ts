import { Component, OnInit } from '@angular/core';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/categories/interfaces/product.interface';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {
  faHeartBroken=faHeartBroken;
  faCartPlus=faCartPlus;

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
