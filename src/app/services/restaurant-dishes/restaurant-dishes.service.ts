import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDishesService {

  constructor(private _httpClient:HttpClient) { }

  onFormSubmit(obj:any) : Observable<any>
  {
  return this._httpClient.post('https://localhost:44325/Restaurant/AddUpdateDishes',obj);
  }
  
}
