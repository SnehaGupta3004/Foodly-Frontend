import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FoodItemsAddEditComponent } from '../food-items-add-edit/food-items-add-edit.component';
import { FoodItemsService } from '../services/food-items.service';
import { Observable, Subscription } from 'rxjs';
import { CoreService } from '../core/core.service';
import { FoodItems } from '../shared/models/resFoodItems';
import { ItemReceipesAddEditComponent } from '../item-receipes-add-edit/item-receipes-add-edit.component';

@Component({
  selector: 'app-restaurant-owner',
  templateUrl: './restaurant-owner.component.html',
  styleUrls: ['./restaurant-owner.component.css']
})
export class RestaurantOwnerComponent implements OnInit {
  show!:boolean;
  private subs = new Subscription();
  availableFoodItems:FoodItems[]=[];

  displayedColumns: string[] = [
    'dish_ID',
    'dish_Name',
    'dish_Price',
    'Action',
  ];
  FoodObj:any={
    User_ID:localStorage.getItem('resultsmobile_No'),
    Role_ID:Number(localStorage.getItem('resultsRole_ID')),
  };

  // deleteFoodObj:any={
  //   dish_ID:''}

  public dataSource!: MatTableDataSource<FoodItems>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _foodItemService: FoodItemsService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    {
    this.getFoodItemsList();
    }
  }

  openAddEditFoodItemForm() {
    const dialogRef = this._dialog.open(FoodItemsAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFoodItemsList();
        }
        }
      });
      }
   
      getFoodItemsList(){
        debugger
      this._foodItemService.getFoodItemsList(this.FoodObj).subscribe((res:any)=>{
        console.log('res',res);
          this.availableFoodItems=[];
          for(var items of res.results) this.availableFoodItems.push(items);
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
    
      deleteFoodItem(data: any) {
        debugger
        this._foodItemService.deleteFoodItem(data).subscribe({
          next: (val:any) => {
            this._coreService.openSnackBar('Item deleted!','Done');
            this.getFoodItemsList();
          },
          error: console.log,
        });
      }

      openEditForm(data: any) {
        const dialogRef = this._dialog.open(FoodItemsAddEditComponent, {
          data,
        });
    
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if (val) {
              this.getFoodItemsList();
            }
          },
        });
      }

      primeFoodItem(data:any){
        debugger
        localStorage.setItem('dataDishID',data.dish_ID);
        const dialogRef = this._dialog.open(ItemReceipesAddEditComponent, {
          data,
        });
    
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if (val) {
              this.getFoodItemsList();
            }
          },
        });
      }


      openPrimeFoodItemEditForm(data: any) {
        debugger
        const dialogRef = this._dialog.open(ItemReceipesAddEditComponent, {
          data,
        });
    
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if (val) {
              this.getFoodItemsList();
            }
          },
        });
      }


}

    