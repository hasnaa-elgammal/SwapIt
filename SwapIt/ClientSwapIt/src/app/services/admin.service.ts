import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditUserRoleComponent } from '../accounts/admin/edit-user-role/edit-user-role.component';
import { Category } from '../models/CategoryModel';
import { CategoryModelHome } from '../models/CategoryModelHome';
import { EditUserModel } from '../models/EditUserModel';
import { EditUserRoleModel } from '../models/EditUserRoleModel';
import { ProductFinalModel } from '../models/ProductFinalModel';
import { ProductModel } from '../models/ProductModel';
import { RoleModel } from '../models/RoleModel';
import { SubCategory } from '../models/SubCategory';
import { UserModel } from '../models/UserModel';
import { UserRoleModel } from '../models/UserRoleModel';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) { }

  baseUrl= 'https://localhost:44329/Admin/';
  headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    withCredentials: true,
  };

  GetAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + 'GetAllUsers',this.headers).pipe();
  }

  AddUser(model:UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl + 'AddUser',model,this.headers).pipe();
  }
  
  EmailExists(email: string){
    return this.http.get(this.baseUrl+'IsEmailExists?email='+email).pipe()
  }

  GetUser(id:string):Observable<Users>{
    return this.http.get<Users>(this.baseUrl+'GetUser/'+id,this.headers).pipe();
  }
  EditUser(model:EditUserModel):Observable<Users>{
    return this.http.put<Users>(this.baseUrl+'EditUser',model,this.headers).pipe();
  }
  DeleteAll(ids:string[]){
    return this.http.post(this.baseUrl+'DeleteUsers',ids,this.headers).pipe();
  }
  GetUserRole():Observable<UserRoleModel[]>{
    return this.http.get<UserRoleModel[]>(this.baseUrl+'GetUserRole',this.headers).pipe();
  }
  GetAllRoles():Observable<RoleModel[]>{
    return this.http.get<RoleModel[]>(this.baseUrl+'GetAllRoles',this.headers).pipe();
  }
  EditUserRole(model:EditUserRoleModel):Observable<EditUserRoleModel>{
    return this.http.put<EditUserRoleModel>(this.baseUrl+'EditUserRole',model,this.headers).pipe();
  }
  GetAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'GetCategories',this.headers).pipe();
  }
  AddCategory(model:Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl + 'AddCategory',model,this.headers).pipe();
  }

  EditCategory(model:Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl + 'EditCategory',model,this.headers).pipe();
  }

  DeleteAllCategory(ids:string[]){
    return this.http.post(this.baseUrl+'DeleteCategory',ids,this.headers).pipe();
  }
  

  GetAllSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.baseUrl + 'GetSubCategories',this.headers).pipe();
  }
  AddSubCategory(model:SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(this.baseUrl + 'AddSubCategory',model,this.headers).pipe();
  }

  EditSubCategory(model:SubCategory): Observable<SubCategory> {
    return this.http.put<SubCategory>(this.baseUrl + 'EditSubCategory',model,this.headers).pipe();
  }

  DeleteAllSubCategory(ids:string[]){
    return this.http.post(this.baseUrl+'DeleteSubCategory',ids,this.headers).pipe();
  }
  
  GetAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl + 'GetAllProducts',this.headers).pipe();
  }

  AddProduct(fd:FormData){
    return this.http.post(this.baseUrl+'AddProduct',fd, {withCredentials:true}).pipe();
  }
  
  GetProduct(id:number):Observable<ProductModel>{
    return this.http.get<ProductModel>(this.baseUrl+'GetProduct/'+id,this.headers).pipe();
  }

  EditProduct(fd:FormData){
    return this.http.put(this.baseUrl+'EditProduct',fd,{withCredentials:true}).pipe();
  }
  DeleteAllProducts(ids:string[]){
    return this.http.post(this.baseUrl+'DeleteAllProducts',ids,this.headers).pipe();
  }
  SearchProducts(search:string):Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(this.baseUrl+'SearchProducts/'+search,this.headers).pipe();
  }

  // Added

  // GetHomeProducts
  GetHomeProducts(): Observable<ProductFinalModel[]> {
    return this.http.get<ProductFinalModel[]>(this.baseUrl + 'GetHomeProducts').pipe();
  }
   // GetFavProductsByEmail
   GetFavProductsByEmail(email:string):Observable<ProductFinalModel[]>{
    return this.http.get<ProductFinalModel[]>(this.baseUrl+'GetFavProductsByEmail/'+email, this.headers).pipe();
  }
  // GetCartProductsByEmail
  GetCartProductsByEmail(email:string):Observable<ProductFinalModel[]>{
    return this.http.get<ProductFinalModel[]>(this.baseUrl+'GetCartProductsByEmail/'+email, this.headers).pipe();
  }

  // GetProfileProductsByEmail
  GetProfileProductsByEmail(email:string):Observable<ProductFinalModel[]>{
    return this.http.get<ProductFinalModel[]>(this.baseUrl+'GetProfileProductsByEmail/'+email, this.headers).pipe();
  }
  
  GetHomeCategories(): Observable<CategoryModelHome[]> {
    return this.http.get<CategoryModelHome[]>(this.baseUrl + 'GetHomeCategories',this.headers).pipe();
  }

  AddToCart(product: ProductFinalModel): Observable<ProductFinalModel> {
    return this.http.post<ProductFinalModel>(this.baseUrl + 'AddToCart',product,this.headers).pipe();
  }
  AddToFav(product: ProductFinalModel): Observable<ProductFinalModel> {
    return this.http.post<ProductFinalModel>(this.baseUrl + 'AddToFav',product,this.headers).pipe();
  }

  RemoveFromFav(id:number){
    return this.http.get(this.baseUrl+'RemoveFromFav/'+id,this.headers).pipe();
  }
  RemoveFromCart(id:number){
    return this.http.get(this.baseUrl+'RemoveFromCart/'+id,this.headers).pipe();
  } 
  RemoveProductFromAllFiles(productName:string){
    return this.http.get(this.baseUrl+'RemoveProductFromAllFiles/'+productName,this.headers).pipe();
  }

  

  

  
  
  
}
