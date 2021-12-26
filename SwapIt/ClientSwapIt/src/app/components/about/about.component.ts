import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  // closeResult: string | undefined;
  // constructor(private modalService: NgbModal) { }
 
  

  ngOnInit(): void {}


  // open(content: any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

//   imgCollection: Array<object> = [
//     {
//       image: 'assets/a1.jpg',
//       thumbImage: 'assets/a1.jpg',
      
//     }, {
//       image: 'assets/a2.jpg',
//       thumbImage: 'assets/a2.jpg',
     
//     }, {
//       image: 'assets/a3.png',
//       thumbImage: 'assets/a3.png',
      
//     },
//     {
//       image: 'assets/a4.jpeg',
//       thumbImage: 'assets/a4.jpeg',
      
      
//     }, 
// ];


// team: Array<object> = [
//   {
//     image: 'assets/sara.jpg',
//     thumbImage: 'assets/sara.jpg',
//     alt: 'Sara Ahmed (Leader)',
//     title: 'Sara Ahmed (Leader)'
    
//   }, {
//     image: 'assets/hasna.jpg',
//     thumbImage: 'assets/hasna.jpg',
//     alt: 'Hasnaa Hamed (Backend)',
//     title: 'Hasnaa Hamed (Backend)'
   
//   }, {
//     image: 'assets/nadeen.jpg',
//     thumbImage: 'assets/nadeen.jpg',
//     alt: 'Nadeen Moasa (Backend)',
//     title: 'Nadeen Moasa (Backend)'
    
   
    
//   },
//   {
//     image: 'assets/sabreen.jpg',
//     thumbImage: 'assets/sabreen.jpg',
//     alt: 'Sabreen Hassan (Frontend)',
//     title: 'Sabreen Hassan (Frontend)'
   
   
    
    
//   }, 
// ];
  

}
