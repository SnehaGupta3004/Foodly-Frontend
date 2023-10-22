import { Injectable } from '@angular/core';
import { Foods } from 'src/app/shared/models/food';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

getAll():Foods[]{
return[
  {
    id:1,
    name:'Coffee',
    cookTime:'10-20',
    price:10,
    favourite:true,
    origins:['Italy'],
    star:4.5,
    imageUrl:'/assets/food1.jpg',
    tags: ['Hotdrink','Coffee','Desert'],
  },
  {
    id:2,
    name:'Cookies',
    cookTime:'10-20',
    price:10,
    favourite:false,
    origins:['Italy'],
    star:4.5,
    imageUrl:'/assets/food2.jpg',
    tags: ['Hotdrink','Cookies','Desert']
  },
  {
    id:3,
    name:'Strawberries',
    cookTime:'10-20',
    price:10,
    favourite:false,
    origins:['Italy'],
    star:4.5,
    imageUrl:'/assets/food3.jpg',
    tags: ['Fruit','Strawberries','Breakfast']
  },
  {
    id:4,
    name:'Orange',
    cookTime:'10-20',
    price:10,
    favourite:true,
    origins:['India'],
    star:4.5,
    imageUrl:'/assets/food4.jpg',
    tags: ['Fruit','Orange','Breakfast']
  },
  {
    id:5,
    name:'Pizza',
    cookTime:'10-20',
    price:10,
    favourite:false,
    origins:['Italy'],
    star:4.5,
    imageUrl:'/assets/food5.jpg',
    tags: ['FastFood','Pizza','Lunch']
  },
  {
    id:6,
    name:'Platter',
    cookTime:'10-20',
    price:10,
    favourite:false,
    origins:['Italy'],
    star:4.5,
    imageUrl:'/assets/food6.jpg',
    tags: ['FastFood','Platter','Lunch']
  },
  {
    id:7,
    name:'Pasta',
    cookTime:'10-20',
    price:10,
    favourite:false,
    origins:['Italy'],
    star:4.5,
    imageUrl:'/assets/food7.jpg',
    tags: ['FastFood','Pasta','Lunch']
  },
  {
    id:8,
    name:'Burger',
    cookTime:'10-20',
    price:10,
    favourite:true,
    origins:['Italy'],
    star:4.5,
    imageUrl:'/assets/food8.jpg',
    tags: ['FastFood','Burger','Lunch']
  }
]
}
}