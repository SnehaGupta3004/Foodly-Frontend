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

  groceryListObj:any={
    cateogry_id:0
  }

  get receipesFormGroups () {
    return this.receipeItemForm.get('Recipe_Steps') as FormArray
  }

  // sequence = new FormControl('', VALIDATORS);
  // ingredienT_NAME = new FormControl('', VALIDATORS);
  // quantity= new FormControl('', VALIDATORS);
  // unit= new FormControl('', VALIDATORS);

  receipeItemForm: FormGroup;  
  Units: any = ['teaspoons', 'tablespoons', 'cups', 'grams','kilograms','pounds','litres'];
  
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
   // this.createForm();

    this.receipeItemForm=this._fb.group({
      Recipe_Steps:this._fb.array([
        this._fb.group({
          sequence:'',
          ingredienT_NAME:'',
          ingredienT_ID:Number(localStorage.getItem('ingredienT_ID')),
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

  
  // createForm(){
  //   this.receipeItemForm=new FormGroup({
  //     Recipe_Steps:new FormArray([
  //     new FormGroup({
  //     sequence:new FormControl(''),
  //     ingredienT_NAME:new FormControl(''),
  //     quantity:new FormControl(''),
  //     unit:new FormControl(''),
  //     remarks:new FormControl(''),
  //     restauranT_ID:new FormControl(localStorage.getItem('resultsmobile_No')) ,
  //     disH_ID:new FormControl(localStorage.getItem('dataDishID')) 
  //   })
  // ])
  //   });
  // }

  

  addNewRow() { 
    const control = <FormArray>this.receipeItemForm.controls['Recipe_Steps'];
    debugger
    control.push(
      new FormGroup({
        sequence:new FormControl(''),
        ingredienT_NAME:new FormControl(''),
        ingredienT_ID:new FormControl(localStorage.getItem('ingredienT_ID')),
        quantity:new FormControl(''),
        unit:new FormControl(''),
        remarks:new FormControl(''),
        restauranT_ID:new FormControl(localStorage.getItem('resultsmobile_No')) ,
        disH_ID:new FormControl(localStorage.getItem('dataDishID')) 
      })
    );
  }  
    

  groceryList!:GroceryItems[];
  category_id!:0
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
  this._resReceipesServiceService.getGroceryList(this.groceryListObj).subscribe((res:any)=>{
    if(res) 
    {
      this.groceryList = res.results[0];
      console.log(this.groceryList);
    }
    });
  }


  getReceipesSteps(){
    debugger
      this._resReceipesService.getReceipesSteps(this.ReceipeObj).subscribe((res:any)=>{
        console.log('res',res);
        debugger
        this.availableReceipes=res.results[0];
           debugger
          this.dataSource=new MatTableDataSource<Recipe>(this.availableReceipes);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
        });
      }
  
  onFormSubmit(){
    let dataforPass=[];
    debugger
    console.log(this.receipeItemForm.controls['Recipe_Steps'])
      for(let item of this.receipeItemForm.controls['Recipe_Steps'].value){
        let dataItem={
          "srno":item.srno,
          "sequence": item.sequence,
          "ingredienT_ID":Number(item.ingredienT_ID),
          "ingredienT_NAME":item.ingredienT_NAME,
          "quantity":item.quantity,
          "unit":item.unit,
          "remarks":item.remarks,
          "restauranT_ID": item.restauranT_ID,
          "disH_ID": item.disH_ID
        }
        dataforPass.push(dataItem)
      }

      let b={
        "Recipe_Steps": dataforPass
    }

    if (this.receipeItemForm.valid) {
    if(this.data){
    this._resReceipesService.updateDishesReceipes(b).subscribe({
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
  this._resReceipesService.addDishesReceipes(b).subscribe({
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



    getElementId(elemRef:any){
    debugger
    localStorage.setItem('ingredienT_ID',elemRef.ingredient_Id)
    // alert("The button's id is: " + elementId);  // Prompt element's Id
    }
  
  }

