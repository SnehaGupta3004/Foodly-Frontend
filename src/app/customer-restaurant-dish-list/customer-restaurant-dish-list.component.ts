import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FoodItems } from '../shared/models/resFoodItems';
import { CoreService } from '../core/core.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodItemsService } from '../services/food-items.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { ViewRecipeComponent } from '../view-recipe/view-recipe.component';

@Component({
  selector: 'app-customer-restaurant-dish-list',
  templateUrl: './customer-restaurant-dish-list.component.html',
  styleUrls: ['./customer-restaurant-dish-list.component.css']
})
export class CustomerRestaurantDishListComponent {
  show!:boolean;
  TotalCartItemNumber:number=0;
  productList:any;
  settingForm!:FormGroup;
  ImagePath!: string; 
  displayedColumns: string[] = [
    'dish_ID',
    'dish_Path',
    'dish_Name',
    'dish_Price',
    'Action',
  ];
  FoodObj:any={
    User_ID:localStorage.getItem('OnClickRestaurantMobileNo'),
    Role_ID: Number(localStorage.getItem('OnClickRestaurantRoleID'))
  };
  public dataSource!: MatTableDataSource<FoodItems>;
  public value:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _foodItemService: FoodItemsService,
    private _coreService: CoreService,
    private fb:FormBuilder,
    private router:Router,
    private cartService:CartService,
    private dialogRef:MatDialog
  ) {}
  ngOnInit(){
    {
      this.getFoodItemsList();
      this.cartService.getFoodData().subscribe(res=>{
        this.TotalCartItemNumber=res.length;
      })
      this._foodItemService.getFoodItemsList(this.FoodObj).subscribe((res:any)=>{
        this.productList=res.results[0];
        this.productList.array.forEach((a:any) => {
          Object.assign(a,{quantity:1, total:a.price})
        });
      })
    }
  }

  addToCart(item:any){
  this.cartService.addToCart(item);
  console.log(this.cartService)
  }

  removeFromcart(){
    this.cartService.removeAllCart();
    console.log(this.cartService)
  }

    getFoodItemsList(){
      this._foodItemService.getFoodItemsList(this.FoodObj).subscribe((res:any)=>{
        console.log('res',res);
          for(var items of res.results)
          this.dataSource=new MatTableDataSource<FoodItems>(items);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
        });
      }

      
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }



      increment() {
        this.settingForm.setValue({
          capacity: this.settingForm.get("capacity")?.value + 1
        });
      }
      
      decrement() {
        this.settingForm.setValue({
          capacity: this.settingForm.get("capacity")?.value - 1
        });
      }


      CartPage(){
        this.router.navigateByUrl('/cart-page');
      }

      ViewRecipe(data:any){
        localStorage.setItem('OnClickDishID',data.dish_ID)
        this.router.navigateByUrl('/view-recipe');
      //   this.dialogRef.open(ViewRecipeComponent,{
      //   backdropClass: 'backdropBackground'
      // });
      }
}
