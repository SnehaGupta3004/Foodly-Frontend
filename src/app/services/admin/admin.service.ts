import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }

  
  EnableDisableRestaurant(data:any):Observable<any>{
    debugger
    return this._http.post('https://localhost:44325/User/EnableDisableRestaurant',data);
  }
}
