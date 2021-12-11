import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/UserModel';
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


}
