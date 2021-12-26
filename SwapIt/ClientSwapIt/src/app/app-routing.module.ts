import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './accounts/login/login.component';
import { LogoutComponent } from './accounts/logout/logout.component';
import { ProfileComponent } from './accounts/profile/profile.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { ResetpasswordComponent } from './accounts/resetpassword/resetpassword.component';
import { EditprofileComponent } from './accounts/editprofile/editprofile.component';
import { AdminComponent } from './accounts/admin/admin.component';
import { DressesComponent } from './categories/dresses/dresses.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdvertiseComponent } from './components/advertise/advertise.component';

import { FooterComponent } from './components/footer/footer.component';
import { FavComponent } from './components/fav/fav.component';
import { AboutComponent } from './components/about/about.component';
import { EditUserComponent } from './accounts/admin/edit-user/edit-user.component';



import { NavComponent } from './components/nav/nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component'; 
import { AddUserComponent } from './accounts/admin/add-user/add-user.component';
import { AccessdeniedComponent } from './components/accessdenied/accessdenied.component';
import { AdminGaurdService } from './gaurds/admin-gaurd.service';
import { EditUserRoleComponent } from './accounts/admin/edit-user-role/edit-user-role.component';
import { AddCategoryComponent } from './accounts/admin/Categories/add-category/add-category.component';
import { ForgotpasswordComponent } from './accounts/forgotpassword/forgotpassword.component';
import { ForgotresetpassComponent } from './accounts/forgotresetpass/forgotresetpass.component';
import { SubCategoryComponent } from './accounts/admin/SubCategories/sub-category/sub-category.component';
import { AddProductComponent } from './accounts/admin/Products/add-product/add-product.component';
import { EditproductComponent } from './accounts/admin/Products/editproduct/editproduct.component';


const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'login' , component:LoginComponent},
  {path:'logout' ,component:LogoutComponent},
  {path:'signup' , component:SignupComponent},
  {path:'profile/:email' , component:ProfileComponent},
  {path:'resetpassword' , component:ResetpasswordComponent},
  {path:'editprofile/:email' , component:EditprofileComponent},
  {path:'forgotpassword' , component:ForgotpasswordComponent},
  {path:'resetforgotpassword' , component:ForgotresetpassComponent},
  {path:'admin' , component:AdminComponent,canActivate:[AdminGaurdService]},
  {path:'dresses' , component:DressesComponent},
  {path:'cart', component:CartComponent},
  {path:'chat' ,component:ChatComponent},
  {path:'advertise' , component:AdvertiseComponent},
  {path:'editusers/:id',component:EditUserComponent},
  
  {path:'contact' , component:ContactComponent},
  
  {path:'footer' , component:FooterComponent},
  {path:'nav' ,component:NavComponent},
  {path:'about' , component:AboutComponent},
  {path:'fav' ,component:FavComponent},
  {path:'category' ,component:AddCategoryComponent},
  {path:'editcategory/:id/:id1' ,component:AddCategoryComponent},
  {path:'notfound' , component:NotFoundComponent},
  {path:'accessdenied' , component:AccessdeniedComponent},
  {path:'edituserrole/:id/:id1',component:EditUserRoleComponent},
  {path:'subcategory',component:SubCategoryComponent},
  {path:'editsubcategory/:id/:id1/:id2',component:SubCategoryComponent},
  {path:'editproduct/:id',component:AddProductComponent},
  {path:'addproduct',component:AddProductComponent},
  {path:'editproduct/:id',component:EditproductComponent},


  // {path:'edituser/:id' ,component:AddUserComponent},
  //{path:'**' , component:NotFoundComponent},
  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
