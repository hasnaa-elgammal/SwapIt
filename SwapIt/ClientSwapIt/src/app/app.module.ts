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
import { ProductComponent } from './accounts/profile/products/product/product.component';
import { ForgotpasswordComponent } from './accounts/forgotpassword/forgotpassword.component';
import { ForgotresetpassComponent } from './accounts/forgotresetpass/forgotresetpass.component';
import { EditCategoryComponent } from './accounts/admin/Categories/edit-category/edit-category.component';
import { SubCategoryComponent } from './accounts/admin/SubCategories/sub-category/sub-category.component';
import { SubCategoryListComponent } from './accounts/admin/SubCategories/sub-category-list/sub-category-list.component';
import { ProductListComponent } from './accounts/admin/Products/product-list/product-list.component';
import { AddProductComponent } from './accounts/admin/Products/add-product/add-product.component';
import { EditproductComponent } from './accounts/admin/Products/editproduct/editproduct.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SearchComponent } from './components/search/search.component';
import { ContactAdminComponent } from './accounts/admin/contact-admin/contact-admin.component';


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
    ProductComponent,
    ForgotpasswordComponent,
    ForgotresetpassComponent,
    EditCategoryComponent,
    SubCategoryComponent,
    SubCategoryListComponent,
    ProductListComponent,
    AddProductComponent,
    EditproductComponent,
    SearchComponent,
    ContactAdminComponent,
    
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgImageSliderModule
   

   
    
    
  ],
  providers: [AdminGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
