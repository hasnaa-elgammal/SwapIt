import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent implements OnInit {

  constructor() { }
  isOpen:boolean= false;
  ngOnInit(): void {
  }
  toggleNav(){
    this.isOpen=! this.isOpen
  }
 

}
