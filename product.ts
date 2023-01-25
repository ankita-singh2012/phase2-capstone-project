export enum Category{
    vegetable='vegetable',
    fruits='fruits',
}
export interface IProduct{

    id:number;
    name:string;
    category:Category;
    price:number;
    image:string;
    rating:number;
    qty:number;
    

}