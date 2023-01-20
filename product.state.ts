// import { IProduct } from "../Products/product";
// import * as AppState from '../state/app.state';
// // Extends the app state to include the product feature.
// // This is required because products are lazy loaded.
// // So the reference to ProductState cannot be added to app.state.ts directly.


// export interface State extends AppState.State {
//   products: ProductState;
// }
// export interface ProductState{
//   currentProductId:number | null;
//   products:IProduct[];
//   error:string;
// }

// export const initialState:ProductState={
//   currentProductId:null,
//   products:[],
//   error:''
// }
//import { IProduct } from "src/app/products/product.model";
import { IProduct} from "src/app/Products/product.model"
import { AppState } from "../state/app.state";

export interface State extends AppState{
    products:ProductState;
}
export interface ProductState{
    currentProductId:number|null;
    products:IProduct[];
    error:string;
}

export const initialState:ProductState={
    currentProductId:null,
    products:[],
    error:''
}