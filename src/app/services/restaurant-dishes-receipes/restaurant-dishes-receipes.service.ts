import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDishesReceipesService {

  constructor(private _httpClient:HttpClient) { }

  // onFormSubmit(obj:any) : Observable<any>
  // {
  // return this._httpClient.post('https://localhost:44325/Restaurant/AddUpdateRecipes',obj);
  // }

  addDishesReceipes(obj:any):Observable<any>
  {
      return this._httpClient.post('https://localhost:44325/Restaurant/AddUpdateRecipes',obj);
  }

  updateDishesReceipes(obj:any):Observable<any>
  {
    return this._httpClient.post('https://localhost:44325/Restaurant/AddUpdateRecipes',obj);
  }
  
  getReceipesSteps(obj:any){
    return this._httpClient.post('https://localhost:44325/Restaurant/GetRecipe',obj);
  }
}