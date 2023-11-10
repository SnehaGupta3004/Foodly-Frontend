import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from '../shared/models/resFoodItems';
import { RestaurantDishesReceipesService } from '../services/restaurant-dishes-receipes/restaurant-dishes-receipes.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  Steps:any=0;
  displayedColumns: string[] = [
    'sequence',
    'ingredienT_NAME',
    'quantity',
    'unit',
    'remarks',
  ];
  RecipeObj:any={
    restauranT_ID:localStorage.getItem('OnClickRestaurantMobileNo'),
    disH_ID:localStorage.getItem('OnClickDishID')
  };

  public dataSource!: MatTableDataSource<Recipe>;
  public value:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _resService:RestaurantDishesReceipesService) {}

  ngOnInit(){
    debugger
    this._resService.getReceipesSteps(this.RecipeObj).subscribe((res:any)=>{
      console.log('res',res);
      for(var items of res.results)
      debugger
      this.dataSource=new MatTableDataSource<Recipe>(items);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }

  // getReceipesSteps(){
  //   debugger
  //   this._resService.getReceipesSteps(this.RecipeObj).subscribe((res:any)=>{
  //     console.log('res',res);
  //     for(var items of res.results)
  //     debugger
  //     this.dataSource=new MatTableDataSource<Recipe>(items);
  //     this.dataSource.sort=this.sort;
  //     this.dataSource.paginator=this.paginator;
  //   })
  // }

}
