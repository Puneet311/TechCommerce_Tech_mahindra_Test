import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCartService } from '../product-cart.service';

export interface DialogData {
  name: string;
  from:string;
  date?:string;
  transit?:string
}
@Component({
  selector: 'app-edit-card-dialog',
  templateUrl: './edit-card-dialog.component.html',
  styleUrls: ['./edit-card-dialog.component.css'],
})
export class EditCardDialogComponent implements OnInit {
  price: any;
  imageLink: any = '';
  name:any
  type=''
  date:any=''
  transit:any=""
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<EditCardDialogComponent>,
    private service: ProductCartService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.type=this.data.from
    this.name=this.data.name
    this.date=this.data.date
    this.transit=this.data.transit
  }
  resetInfo() {
    this.price = '';
    this.imageLink = '';
    this.dialogRef.close();
  }
  editInfo() {
    const obj = {
      price: this.price,
      imageLink: this.imageLink,
      name:this.name
    };
    this.service.editProduct(obj).subscribe((data: any) => {
      this._snackBar.open(data,'', {duration: 2000});
      this.dialogRef.close();

    },
    (error:any)=>{
      this._snackBar.open(error.errors,'', {duration: 2000});
      this.dialogRef.close();
    });
  }
}
