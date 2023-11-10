import { Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodItemsService } from '../services/food-items.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-food-items-add-edit',
  templateUrl: './food-items-add-edit.component.html',
  styleUrls: ['./food-items-add-edit.component.css']
})
export class FoodItemsAddEditComponent implements OnInit{
show!:boolean;
foodItemForm:FormGroup;
@ViewChild('UploadFileInput') uploadFileInput!: ElementRef;
myfilename = 'Select File';
srcResult:any;


  constructor(
    private _fb:FormBuilder,
    private _foodItem:FoodItemsService,
    private _dialogRef:MatDialogRef<FoodItemsAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService:CoreService
    )
    {
    this.foodItemForm=this._fb.group({
      dish_ID:'',
      dish_Name:'',
      dish_Price:'',
      RESTAURANT_ID:localStorage.getItem('resultsmobile_No')
    });
    }

    ngOnInit(): void {
      this.foodItemForm.patchValue(this.data);
    }

    onFormSubmit(){
    if (this.foodItemForm.valid) {
      debugger
          if(this.data){
          this._foodItem.updateFoodItems(this.foodItemForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Item updated successfully','Done');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
        }
        else{
          debugger
          this._foodItem.addFoodItems(this.foodItemForm.value).subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Item added successfully','Done');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
      }
    }


  
    onFileSelected() {
      const inputNode: any = document.querySelector('#file');
    debugger
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
    
        reader.onload = (e: any) => {
          this.srcResult = e.target.result;
        };
    
        reader.readAsArrayBuffer(inputNode.files[0]);
      }
    }

  }