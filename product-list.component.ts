import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { Router, RouterLinkActive } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { ProductService } from "../shared/product.service";
import { getProducts, getError, getCurrentProduct } from "../state/products/product.selector";
import * as ProductActions from '../state/products/product.actions'
import { IProduct } from "./product";
import { State } from "../state/products/product.state";
import { CartService } from "../shared/cart.service";
import { NgModel } from "@angular/forms";
import { throwDialogContentAlreadyAttachedError } from "@angular/cdk/dialog";


@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit ,OnDestroy {



errorMessage:string='';
sub!:Subscription;
prod!:IProduct;
products:IProduct[]=[];
pageTitle:string="Product List "
filteredProducts:IProduct[]=[];
selectedProduct!:IProduct | null;
filterValue!:string;
href:string='';

//******************** declared below are observables for which we will use async pipe in template , no sub/unsub*/
products$!:Observable<IProduct[]>;
selectedProduct$!:Observable<any>;
errorMessage$!: Observable<string>;

//*************** */
dataReceived=this.productService.getProducts();
obsProducts$!:Observable<IProduct[]>;
@Output() OnProductSelection:EventEmitter<IProduct>=new EventEmitter<IProduct>();

  constructor(private productService:ProductService,
    private router:Router,private store:Store<State>,
    private cartService:CartService){ }


  ngOnInit(): void {
    this.href=this.router.url;
    // console.log(this.href);
    // //sub object is initialized
    //    this.obsProducts$=this.productService.getProducts();
    //    /*.subscribe(
    //      (response)=>{

    //      console.log(response);
    //      this.products=response;
    //      this.filteredProducts = this.products;

    //    },
    //    err=>{this.errorMessage=err;
    //     console.log(err);
    //    }
    //    );*/

      //  console.log(this.selectedProduct);
      //  this.productService.selectedProductChanges$.
      //  subscribe(currentProduct=>{this.selectedProduct=currentProduct;
      // });
   // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.products$ = this.store.select(getProducts);
    this.products$.subscribe(resp=>this.filteredProducts=resp);
    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    // Do NOT subscribe here because it uses an async pipe
    this.selectedProduct$ = this.store.select(getCurrentProduct);

     }

     ngOnDestroy(): void {
       //this.sub.unsubscribe();
  }



   filterData(val:string){




    this.filteredProducts=this.products.filter((p)=>p.category===val);
  }


  onRatingClicked(msg:string):void{
    this.pageTitle='My Angular App ' +msg;
  }

 onSelect(p:IProduct){
  this.OnProductSelection.emit(p);
 }



newProduct():void{
   console.log('in new product');

  // this.productService.changeSelectedProduct(this.productService.newProduct());
  // console.log('back to newProduct from service ');
  this.store.dispatch(ProductActions.initializeCurrentProduct());
 
   this.router.navigate([this.href,'addProduct']);
}
 productSelected(product:IProduct):void{
  //this.productService.changeSelectedProduct(product);
this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:product.id}));
}
  getProductById(id:number):IProduct{
    this.productService.getProductById(id).subscribe(resp=>this.prod=resp);
    return this.prod;
  }
  addToCart(product:IProduct){
    this.cartService.addToCart(product);
    
    window.alert('Your product has been added to the cart!')
    console.log(product);
  }

  
  deleteProduct(prod:IProduct):void{
    if(prod && prod.id){

      if(confirm(`Are you sure you want to delete ${prod.name} details`)){


        this.store.dispatch(ProductActions.deleteProduct({ productId: prod.id }));

        // this.productService.deleteProduct(prod.id).subscribe(
        //   resp=>this.productService.changeSelectedProduct(null),
        //   err=>this.errorMessage=err
        // );
      }
      else{
// No need to delete, it was never saved
this.store.dispatch(ProductActions.clearCurrentProduct());

     // this.productService.changeSelectedProduct(null)
      }
    }

  }
}