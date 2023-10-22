import { Component, OnInit ,Inject, ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FoodItemsService } from '../services/food-items.service';
import { GroceryItems } from '../shared/models/groceryItems';
import { MatValidators } from '../mat-form-field-required/mat-form-field-required.module';
import { RestaurantDishesReceipesService } from '../services/restaurant-dishes-receipes/restaurant-dishes-receipes.service';
import { CoreService } from '../core/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe, RecipesData } from '../shared/models/resFoodItems';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


const VALIDATORS = [
  MatValidators.required
] 

@Component({
  selector: 'app-item-receipes-add-edit',
  templateUrl: './item-receipes-add-edit.component.html',
  styleUrls: ['./item-receipes-add-edit.component.css']
})
export class ItemReceipesAddEditComponent implements OnInit{
  public dataSource!: MatTableDataSource<Recipe>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  availableReceipes:any={
    SRNO:'',
    restauranT_ID:'',
    disH_ID:'',
    sequence:'',
    ingredienT_ID:'',
    ingredienT_NAME:'',
    quantity:'',
    unit:'',
    remarks:''
  };
  
  Recipe_Steps:Recipe[]=[];

  ReceipeObj:any={
    RESTAURANT_ID:localStorage.getItem('resultsmobile_No'),
    DISH_ID:localStorage.getItem('dataDishID')
  };

  get receipesFormGroups () {
    return this.receipeItemForm.get('Recipe_Steps') as FormArray
  }

  sequence = new FormControl('', VALIDATORS);
  ingredienT_NAME = new FormControl('', VALIDATORS);
  quantity= new FormControl('', VALIDATORS);
  unit= new FormControl('', VALIDATORS);

  receipeItemForm: FormGroup;  
  Units: any = ['teaspoons', 'tablespoons', 'cups', 'grams','pounds','litres'];
  
  constructor
  (
    private _fb:FormBuilder,
    private _resReceipesServiceService: FoodItemsService, 
    private _resReceipesService:RestaurantDishesReceipesService,
    private _coreService:CoreService,
    private _dialogRef:MatDialogRef<ItemReceipesAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public value:any,
  )
  {
    this.createForm();

    this.receipeItemForm=this._fb.group({
      Recipe_Steps:this._fb.array([
        this._fb.group({
          sequence:'',
          ingredienT_NAME:'',
          //ingredienT_ID:localStorage.getItem('ingredienT_ID'),
          quantity:'',
          unit:'',
          remarks:'',
          restauranT_ID:localStorage.getItem('resultsmobile_No'),
          disH_ID:localStorage.getItem('dataDishID')
        })
      ])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.receipeItemForm.controls[controlName].hasError(errorName);
  }

  
  createForm(){
    this.receipeItemForm=new FormGroup({
      Recipe_Steps:new FormArray([
      new FormGroup({
      sequence:new FormControl(''),
      ingredienT_NAME:new FormControl(''),
      //ingredienT_ID:new FormControl(localStorage.getItem('ingredienT_ID')),
      quantity:new FormControl(''),
      unit:new FormControl(''),
      remarks:new FormControl(''),
      restauranT_ID:new FormControl(localStorage.getItem('resultsmobile_No')) ,
      disH_ID:new FormControl(localStorage.getItem('dataDishID')) 
    })
  ])
    });
  }

  

  addNewRow() { 
    debugger
    const control = <FormArray>this.receipeItemForm.controls['Recipe_Steps'];
    debugger
    control.push(
      new FormGroup({
        sequence:new FormControl(''),
        ingredienT_NAME:new FormControl(''),
        //ingredienT_ID:new FormControl(localStorage.getItem('ingredienT_ID')),
        quantity:new FormControl(''),
        unit:new FormControl(''),
        remarks:new FormControl(''),
        restauranT_ID:new FormControl(localStorage.getItem('resultsmobile_No')) ,
        disH_ID:new FormControl(localStorage.getItem('dataDishID')) 
    })
    );
  }  
    
  changeIngredient(value:any){
    debugger
    console.log(value);
    localStorage.setItem('ingredienT_ID',value.ingredient_Id)
  }



  groceryList!:GroceryItems[];
  
  data:any;
 
  ngOnInit(): void {
    this.getReceipesSteps();
    {
    this.getGroceryList();
    }
    this.receipeItemForm.patchValue(this.value);
  }


  getGroceryList(){
  debugger
  this._resReceipesServiceService.getGroceryList(this.data).subscribe((res:any)=>{
    if(res) {
      this.groceryList = res.results[0];
      console.log(this.groceryList);
    }
    });
  }


  getReceipesSteps(){
    debugger
      this._resReceipesService.getReceipesSteps(this.ReceipeObj).subscribe((res:any)=>{
        console.log('res',res);
        this.availableReceipes=res.results[0];
        //  for(var items of res.results)this.availableReceipes.push(items);
           debugger
          this.dataSource=new MatTableDataSource<Recipe>(this.availableReceipes);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
        });
      }
  
  onFormSubmit(){
    debugger
    if (this.receipeItemForm.valid) {
    if(this.data){
    this._resReceipesService.updateDishesReceipes(this.receipeItemForm.value).subscribe({
    next: (val: any) => {
      this._coreService.openSnackBar('Receipe updated successfully','Done');
      this._dialogRef.close(true);
    },
    error: (err: any) => {
      console.error(err);
    },
  });
}
else{
  debugger
  console.log(this.receipeItemForm.value)
  this._resReceipesService.addDishesReceipes(this.receipeItemForm.value).subscribe({
    next: (val: any) => {
      this._coreService.openSnackBar('Receipe added successfully','Done');
      this._dialogRef.close(true);
    },
    error: (err: any) => {
      console.error(err);
    },
  });
}
       
      }
    }


}
