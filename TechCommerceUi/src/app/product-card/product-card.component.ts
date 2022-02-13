import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditCardDialogComponent } from '../edit-card-dialog/edit-card-dialog.component';
import { ProductCartService } from '../product-cart.service';

interface ProductType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  imageLink = '';
  quantity: any;
  errorMessage: any;
  successMessage:any
  constructor(
    public dialog: MatDialog,
    private addProduct: ProductCartService,
    private _snackBar: MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.imageLink = this.product?.imageLink;
  }

  quantities: ProductType[] = [
    { value: 'Downloadable', viewValue: 'Downloadable' },
    { value: 'Subscription', viewValue: 'Subscription' },
    { value: 'Delivery', viewValue: 'Delivery' },
  ];

  openDialog() {
    let dialogRef =this.dialog.open(EditCardDialogComponent,{
      data:{
        name:this.product?.name,
        from:"edit"
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/cart')
    });
  }
  addToCart() {
    if (this.quantity) {
      const cartProduct={
        name:this.product.name,
        imageLink:this.product.imageLink,
        price:this.product.price,
        quantity:this.quantity
      }
      this.addProduct.addToCart(cartProduct).subscribe((data:any)=>{
        this.successMessage=data
        this._snackBar.open(this.successMessage,'', {duration: 2000});
        this.router.navigateByUrl('/cart')
      },
      (error:any)=>{
        this.successMessage=""
        this.errorMessage=error
        this._snackBar.open(this.errorMessage?.error,'', {duration: 2000});
      })
    } else {
      this.successMessage=""
      this.errorMessage = 'Please choose type.';
      this._snackBar.open(this.errorMessage,'', {duration: 2000});
    }
  }
}
