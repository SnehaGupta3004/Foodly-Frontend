import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDisplayName:any;

  constructor(private router:Router){

  }
  
  ngOnInit(){
    debugger
    this.userDisplayName= new BehaviorSubject(localStorage.getItem('resultsUsername') ?? '{}');
    console.log(this.userDisplayName.value);
  }

  logout(){
    debugger
    localStorage.clear();
    this.router.navigateByUrl('/login');
    console.log(this.userDisplayName.value);
  }


}
