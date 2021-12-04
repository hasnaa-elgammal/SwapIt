import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register-model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Users } from '../models/users.model';
import { FormGroup } from '@angular/forms';
import { LoginModel } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  baseUrl= 'https://localhost:44329/Accounts/';
  headers = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    withCredentials: true
  };

  Register(reg: RegisterModel): Observable<RegisterModel> {
    return this.http.post<RegisterModel>(this.baseUrl + 'Register', reg, this.headers).pipe();
  }

  GetAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + 'GetAllUsers').pipe();
  }

  Login(logmodel: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.baseUrl + 'Login', logmodel, this.headers).pipe();
  }

  Logout(){
    return this.http.get(this.baseUrl + 'Logout', {withCredentials: true}).pipe();
  }

  EmailExists(email: string){
    return this.http.get(this.baseUrl+'IsEmailExists?email='+email).pipe()
  }

}
