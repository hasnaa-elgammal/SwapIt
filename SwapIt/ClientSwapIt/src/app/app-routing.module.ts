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




import { NavComponent } from './components/nav/nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component'; 


const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'login' , component:LoginComponent},
  {path:'logout' ,component:LogoutComponent},
  {path:'signup' , component:SignupComponent},
  {path:'profile/:email' , component:ProfileComponent},
  {path:'resetpassword' , component:ResetpasswordComponent},
  {path:'editprofile/:email' , component:EditprofileComponent},
  {path:'admin' , component:AdminComponent},
  {path:'dresses' , component:DressesComponent},
  {path:'cart', component:CartComponent},
  {path:'chat' ,component:ChatComponent},
  {path:'advertise' , component:AdvertiseComponent},
  
  {path:'contact' , component:ContactComponent},
  
  {path:'footer' , component:FooterComponent},
  {path:'nav' ,component:NavComponent},
  {path:'about' , component:AboutComponent},
  
  {path:'fav' ,component:FavComponent},
  {path:'**' , component:NotFoundComponent},
  





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
