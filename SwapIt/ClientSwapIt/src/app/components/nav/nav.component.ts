import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { RegisterService } from 'src/app/services/register.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/users.model';
import { CryptService } from 'src/app/services/crypt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ProductModel } from 'src/app/models/ProductModel';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  isOpen:boolean=false;
  email:string;
  faBars =faBars ;
  faSearch=faSearch;
  faHeart=faHeart;
  faCartPlus=faCartPlus;
  faUserCircle =faUserCircle 
  logo='assets/logo.png'

  constructor(
    private service: RegisterService,
    private serviceO:AdminService,
    private auth: AuthService,
    private route: Router,
    private crypt: CryptService,
    private fb:FormBuilder,
    
  ) { }

  formSearch:FormGroup;

  products:ProductModel[];
  ngOnInit(): void {

    this.formSearch=this.fb.group({
      search:['',Validators.required]
    })

    if(this.isUserIn()){
      if(this.auth.IsExpiredDate(this.auth.expire) === true){
        this.logout();
        this.auth.ValidateUser(this.auth.email,this.auth.role).subscribe( success=> {
        }, err=>  {this.logout();})
      }
    }
  }

  toggleNav(){
    this.isOpen= !this.isOpen
  }

  logout(){
    this.service.Logout().subscribe( success => {
      localStorage.clear();
      this.route.navigate(['logout'])
    }, err => console.log(err));
  }

  isUserIn(){
    const email = !!localStorage.getItem('email');
    const expire = !!localStorage.getItem('expire');
    const role = !!localStorage.getItem('role');
    if(email && role && expire){
      return true;
    }
    return false;
  }
  
  GotoProfile(){
    this.email=this.crypt.Decrypt(localStorage.getItem('email'));
    if(this.email!=null && this.email != ''){
      this.route.navigate(['/profile', this.email]);
    }
  }
  IsAdmin(){
    var isAdmin=!!this.auth.role;
    if(isAdmin){
      if( this.auth.role.toLowerCase() == 'admin'){
        return true;
      }
    }
    return false;
  }

  // getProducts(){
  //   this.serviceO.GetAllProducts().subscribe(list=>{
  //     this.products=list;
  //     console.log(list);
  //   },ex=>console.log(ex));
  // }
  // onSearch(){
  //   if(this.formSearch.valid){
  //     const search=this.formSearch.value.search;
  //     this.serviceO.SearchProducts(search).subscribe(list=>{
  //       this.products=list;
  //     },ex=>{
  //       console.log(ex);
  //     })
  //   }

  // }
  onSearch(){
    if(this.formSearch.valid){
      const search=this.formSearch.value.search;
      this.route.navigate(['/search', search]).then(x=>{window.location.reload();});
    }
  }

}
