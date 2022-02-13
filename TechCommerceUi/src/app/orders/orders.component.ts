import { Component, OnInit } from '@angular/core';
import { ProductCartService } from '../product-cart.service';
import * as fileSaver from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { EditCardDialogComponent } from '../edit-card-dialog/edit-card-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  productArray: any = [];
  constructor( private product: ProductCartService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.product.getAllCartProduct().subscribe((data: any) => {
      this.productArray = data.filter((value:any)=>value.isBought);
    });
  }
  download(type:any,product:any) {
    if(type==='Downloadable'){
      this.product.downloadFile().subscribe(
        (response: any) => {
          let blob: any = new Blob([response]);
          const url = window.URL.createObjectURL(blob);
          fileSaver.saveAs(blob, 'dummy.pdf');
        },
        (error: any) => console.log('Error downloading the file',error.errors)
      );
    }
    if(type==='Subscription'){
      this.dialog.open(EditCardDialogComponent,{
        data:{
          name:product.name,
          from:"show",
          date:product.details
        }
      });
    }
    if(type==='Delivery'){
      this.dialog.open(EditCardDialogComponent,{
        data:{
          name:product.name,
          from:"show",
          transit:product.details
        }
      });
    }
    
  }

}
