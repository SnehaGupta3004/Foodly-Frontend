import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
signupUsers:any[]=[];
availableRoles: any[] = [];
signupObj:any={
  Mobile_No:'',
  Email_Id:'',
  Password:'',
  Username:'',
  CITY:'',
  Role_ID:Number(localStorage.getItem('Role_ID'))
};
loginObj:any={
  User_ID:'',
  Password:''
};
constructor(
  private route:ActivatedRoute,
  private router:Router,
  private accService:AccountService,
  private _core:CoreService
  ){}
ngOnInit():void{
  this.availableRoles = [
    {
      Role_ID: 3,
        name: "RestaurantOwner",
        val: "RestaurantOwner"
    },
    {
      Role_ID: 2,
        name: "Customer",
        val: "Customer"
    }];

  const LocalData=localStorage.getItem('signUpusers');
  if(LocalData!=null){
    this.signupUsers=JSON.parse(LocalData);
  }
}


getElementId(elemRef:any){
  debugger
  localStorage.setItem('Role_ID',elemRef.Role_ID)
  }

onSignUp(){
  debugger
  this.accService.onSignUp(this.signupObj).subscribe((res:any)=>{
    console.log('SignUpRes',res);
  })
  localStorage.setItem('signUpusers',JSON.stringify(this.signupUsers));
  this.signupObj={
    Mobile_No:'',
    Email_Id:'',
    Password:'',
    Username:'',
    CITY:'',
    Role_ID:localStorage.getItem('Role_ID')
  };
}


onLogin()
{
    debugger
    this.accService.onLogin(this.loginObj).subscribe((res:any)=>{
    debugger
    console.log('res',res);
    localStorage.setItem('resultsmobile_No',res.results[0].mobile_No);
    localStorage.setItem('resultsRole_ID',res.results[0].role_ID);
    localStorage.setItem('resultsUsername',res.results[0].username);
    localStorage.setItem('responseStatusCode',res.responseStatusCode);
    if(res.responseStatusCode==2)
    {
      if(res.results[0].role_ID==3){
        this.router.navigateByUrl('/restaurant-owner');
      }
      else if(res.results[0].role_ID==2){
        this.router.navigateByUrl('/dashboard');
      }
      else if(res.results[0].role_ID==1){
        this.router.navigateByUrl('/admin');
      }
    }
    else if(res.responseStatusCode==4)
      {
        this._core.openSnackBar(res.message);
      }
    
    });
}
}


