import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductCartService } from '../product-cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productArray: any = [];
  endDate:any
  address:any
  constructor(
    private product: ProductCartService,
    private _snackBar: MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.product.getAllCartProduct().subscribe((data: any) => {
      this.productArray = data.filter((value:any)=>!value.isBought);
    });
  }
  removeProduct(name: any) {
    this.product.removeProduct(name).subscribe(
      (data: any) => {
        this._snackBar.open(data, '', { duration: 2000 });
        this.product.getAllCartProduct().subscribe((data: any) => {
          this.productArray = data.filter((value:any)=>!value.isBought);
        });
      },
      (error: any) => {
        this._snackBar.open(error?.errors, '', { duration: 2000 });
      }
    );
  }

  download(type:any,name:string) {
    if(type==='Downloadable'){
      const obj={
        isBought:true,
        details:"Product is downloadble.",
        name:name
      }
      this.product.orderProduct(obj).subscribe((data:any)=>{
        this._snackBar.open(data,'',{duration:2000})
        this.router.navigateByUrl('/orders')
        console.log(obj,data)
      },
      (error:any)=>{
        console.log(error)
        this._snackBar.open(error.error,'',{duration:2000})
      })
    }
    if(type==='Subscription' && this.endDate){
      const obj={
        isBought:true,
        details:this.endDate,
        name:name
      }
      this.product.orderProduct(obj).subscribe((data:any)=>{
        this._snackBar.open(data,'',{duration:2000})
        this.router.navigateByUrl('/orders')
      },
      (error:any)=>{
        this._snackBar.open(error.error,'',{duration:2000})
      })
    }
    if(type==='Delivery' && this.address){
      const obj={
        isBought:true,
        details:this.address,
        name:name
      }
      this.product.orderProduct(obj).subscribe((data:any)=>{
        this._snackBar.open(data,'',{duration:2000})
        this.router.navigateByUrl('/orders')
      },
      (error:any)=>{
        this._snackBar.open(error.error,'',{duration:2000})
      })
    }
    
  }
}
