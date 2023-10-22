import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Grocery } from '../shared/models/grocery';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../services/cart/cart.service';
import { FoodItemsService } from '../services/food-items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroceryService } from '../services/grocery/grocery.service';
import { GroceryCategories } from '../shared/models/groceryCategories';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent {
  category_id!:number;
  data!:Grocery;
  Categories:GroceryCategories[]=[];
  show!:boolean;
  TotalCartItemNumber:number=0;
  groceryList:any;
  availableGroceries:Grocery[]=[];
  displayedColumns: string[] = [
    'ingredient_Id',
    'ingredient_Name',
    'price',
    'Action',
  ];
  groceries:Grocery[]=[];
  FoodObj:any={
    category_id: Number(localStorage.getItem('OnClickCategoryID'))
  };
  public dataSource!: MatTableDataSource<Grocery>;
  public value:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _foodItemService: FoodItemsService,
    private router:Router,
    private groceryService:GroceryService
  ) {}


  ngOnInit():void{
    {
      this.Categories=this.groceryService.getAllCategories();
      this.getGroceryList(this.data);
      this.groceryService.getGroceryData().subscribe(res=>{
        this.TotalCartItemNumber=res.length;
      })
      this._foodItemService.getGroceryList(this.FoodObj).subscribe((res:any)=>{
        this.groceryList=res.results[0];
        this.groceryList.array.forEach((a:any) => {
          Object.assign(a,{quantity:1, total:a.price})
        });
      })
    }
  }

  addToCart(item:any){
  debugger
  this.groceryService.addToCart(item);
  }

  removeFromcart(id:number){
    debugger
    this.groceryService.removeCartData(id);
  }

  getGroceryList(data:any){
    debugger
      this._foodItemService.getGroceryList(data).subscribe((res:any)=>{
        localStorage.setItem('GroceryCartData',res.results[0].category_id);
        debugger
        console.log('res',res);
        this.availableGroceries=[];  
        this.availableGroceries=res.results[0];
        });
      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

      CartPage(){
        this.router.navigateByUrl('/gcart-page');
      }

      getCategory(data:any){
        debugger
        localStorage.setItem('OnClickCategoryID',data.category_id);
        //this.router.navigateByUrl('/grocery');
      }
}
