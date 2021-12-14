import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './accounts/login/login.component';
import { LogoutComponent } from './accounts/logout/logout.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { ProfileComponent } from './accounts/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { FavComponent } from './components/fav/fav.component';
import { AdminComponent } from './accounts/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { DressesComponent } from './categories/dresses/dresses.component';
import { AboutComponent } from './components/about/about.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdvertiseComponent } from './components/advertise/advertise.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResetpasswordComponent } from './accounts/resetpassword/resetpassword.component';
import { EditprofileComponent } from './accounts/editprofile/editprofile.component';
import { UsersComponent } from './accounts/admin/users/users.component';
import { AddUserComponent } from './accounts/admin/add-user/add-user.component';
import { EditUserComponent } from './accounts/admin/edit-user/edit-user.component';
import { UserRolesComponent } from './accounts/admin/user-roles/user-roles.component';
import { AccessdeniedComponent } from './components/accessdenied/accessdenied.component';
import { AdminGaurdService } from './gaurds/admin-gaurd.service';
import { EditUserRoleComponent } from './accounts/admin/edit-user-role/edit-user-role.component';
import { CategryListComponent } from './accounts/admin/Categories/categry-list/categry-list.component';
import { AddCategoryComponent } from './accounts/admin/Categories/add-category/add-category.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    ProfileComponent,
    NotFoundComponent,
    FooterComponent,
    
    ContactComponent,
    
    CartComponent,
    FavComponent,
    
    AdminComponent,
    HomeComponent,
    NavComponent,
    DressesComponent,
    AboutComponent,
    ChatComponent,
    AdvertiseComponent,
    ResetpasswordComponent,
    EditprofileComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    UserRolesComponent,
    AccessdeniedComponent,
    EditUserRoleComponent,
    CategryListComponent,
    AddCategoryComponent,
    
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   

   
    
    
  ],
  providers: [AdminGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
