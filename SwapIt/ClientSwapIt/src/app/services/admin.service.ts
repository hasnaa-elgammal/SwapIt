import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditUserRoleComponent } from '../accounts/admin/edit-user-role/edit-user-role.component';
import { Category } from '../models/CategoryModel';
import { EditUserModel } from '../models/EditUserModel';
import { EditUserRoleModel } from '../models/EditUserRoleModel';
import { RoleModel } from '../models/RoleModel';
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

}
