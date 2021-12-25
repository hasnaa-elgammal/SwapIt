import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {faCog, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Product } from 'src/app/categories/interfaces/product.interface';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import{faStar} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/models/users.model';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isOpen:boolean=false;
  email:string;
  user: Users;
  faMapMarkerAlt=faMapMarkerAlt;
  faCog = faCog;
  faCommentAlt=faCommentAlt;
  faHeart= faHeart;
  faCartPlus=faCartPlus;
  faStar=faStar;
  

  products: Product[] = [
    
    {category:'Bages',photo:'assets/bag.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
    {category:'Books',photo:'assets/book.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
    {category:'Clothes',photo:'assets/clothes.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},
    {category:'Clothes',photo:'assets/clothes2.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},

    {category:'Furniture',photo:'assets/furniture.jpg',owner:'sabreen hassan', desc:'this a photo', price:5},


  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    public auth: AuthService,
    
    ) {
    _activatedRoute.params.subscribe(params =>
      this.email = params['email'])
   }

  ngOnInit(): void {
    this.user = new Users();
    this.GetProfile()
  }

  toggleSettings(){
    this.isOpen= !this.isOpen
  }

  GetProfile(){
    this.auth.GetProfile(this.email).subscribe(success=> {
      var u = success;
      this.user.firstName = u.firstName;
      this.user.lastName = u.lastName;
      this.user.email = u.email;
      this.user.county = u.county;
      this.user.city = u.city;
      this.user.userImage = u.userImage;
      this.user.phoneNumber= u.phoneNumber;
    },err=>console.log(err));
  }

  SetImage(){
    if(this.user.userImage==null){
      return "assets/default.jpg"
    }else{
      return 'assets/images/users/' + this.user.userImage
    }
  }


}
