import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _httpClient:HttpClient) { }

  onLogin(obj:any) : Observable<any>
  {
  return this._httpClient.post('https://localhost:44325/User/GetUserProfile',obj);
  }

  onSignUp(obj:any):Observable<any>
  {
    return this._httpClient.post('https://localhost:44325/User/SignUp',obj);
  }
  
}
