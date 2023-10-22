import { Injectable, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Grocery } from 'src/app/shared/models/grocery';
import { FoodItemsService } from '../food-items.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroceryCategories } from 'src/app/shared/models/groceryCategories';
import { GcartService } from '../gcart/gcart.service';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  cartDataList:any=[];
  settingForm!:FormGroup;
  groceryList=new BehaviorSubject<any>([]);
  FoodObj:any={
    User_ID:localStorage.getItem('resultsmobile_No'),
    Role_ID:Number(localStorage.getItem('resultsRole_ID'))
  };
  public dataSource!: MatTableDataSource<Grocery>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _foodItemService:FoodItemsService,
    private fb:FormBuilder,
    private gcartService:GcartService) { }
  ngOnInit(){
    {
    this.getGroceryList();
    }

    this.settingForm = this.fb.group({
      capacity: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ])
    })
  }


  // getGroceryByCategory(Category:string){
  //   if(Category=='All')
  //     return this.getGroceryList()
  //     else
  //     return this.getGroceryList().filter(grocery => grocery.category_id?.includes(Category))
  // }

  getGroceryList(){
    this._foodItemService.getGroceryList(this.FoodObj).subscribe((res:any)=>{
      console.log('res',res);
      this.groceryList=res;
        for(var items of res.results)
        this.dataSource=new MatTableDataSource<Grocery>(items);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
        return this.dataSource
      });
    }

    getGroceryData(){
      debugger
      return this.groceryList.asObservable();
    }

    setGroceryList(GroceryItems:any){
      this.cartDataList.push(...GroceryItems);
      this.groceryList.next(GroceryItems);
    }

    addToCart(GroceryItems:any){
      debugger
      this.gcartService.AddGCartItems(GroceryItems).subscribe(res=>{
        console.log(GroceryItems)
      });
      this.cartDataList.push(GroceryItems);
      this.groceryList.next(this.cartDataList);
      this.getTotalAmount();
    }
    
    getTotalAmount(){
    let grandTotal=0;
    this.gcartService.GetGCartItems().subscribe(response=>{
      this.cartDataList=response
      debugger
      return this.cartDataList.map((a:any)=>{
        debugger
        grandTotal+=a.price;
        debugger
        localStorage.setItem('grandTotal',grandTotal.toString());
      }
      );
    });
   }

   removeCartData(id:number){
    debugger
    this.gcartService.DeleteGCartItems(id).subscribe({next:(res)=>{}})
    // this.cartDataList.map((a:any,index:any)=>{
    //   if(grocery.ingredient_Id === a.ingredient_Id)
    //   debugger
    //   this.cartDataList.splice(index,1)
    // }
    //)
    this.groceryList.next(this.cartDataList);
   }

   removeAllCart(){
    this.cartDataList=[];
    this.groceryList.next(this.cartDataList);
   }


   getAllCategories():GroceryCategories[]{
    return[
      {category_id:0,Name:'All',Image:'/assets/GroceryCategories/All.jpg'},
      {category_id:3,Name:'Dry Fruits',Image:'/assets/GroceryCategories/Dry Fruits.jpg'},
      {category_id:11,Name:'Fresh Vegetables',Image:'/assets/GroceryCategories/Fresh Vegs.jpg'},
      {category_id:12,Name:'Dairy',Image:'/assets/GroceryCategories/Dairy.jpg'}
    ];
   }
   
}
