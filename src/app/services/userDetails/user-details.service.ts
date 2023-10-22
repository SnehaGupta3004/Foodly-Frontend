import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http:HttpClient) { }

  getUserAddressList(obj:any):Observable<any>{
    return this.http.post('https://localhost:44325/User/GetAddressList',obj);
  }

  addUserAddress(data:any):Observable<any>{
    debugger
    return this.http.post('https://localhost:44325/User/AddNewAddress',data);
  }

  updateUserAddress(data:any):Observable<any>{
    return this.http.post('https://localhost:44325/User/AddNewAddress',data);
  }

  deleteAddress(data:any):Observable<any>{
    return this.http.post('https://localhost:44325/User/RemoveAddress',data);
  }
  
}
