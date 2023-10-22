export interface FoodItems{
    dish_Name:string,
    dish_ID:number,
    dish_Price:number,
    Ratings:number,
    UserCount:number,
    IsPrime:number,
    Restaurant_ID:string,
    dish_Path:string
}

export interface RecipesData{
    SRNO :number,
    restauranT_ID:string, 
    disH_ID :string,
    sequence :number,
    ingredienT_ID :number,
    ingredienT_NAME :string,
    quantity :number,
    unit :string,
    remarks :string
}

export interface Recipe{
    Recipe_Steps:RecipesData[]
}
