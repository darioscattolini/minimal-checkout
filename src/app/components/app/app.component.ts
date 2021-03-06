import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleCheckoutData } from 'src/app/models/models';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  public load() {
    // Article data should be retrieved by service from back-end
    const data: ArticleCheckoutData = {
      id: '00012345',
      name: 'MacBook Air',
      price: '$899.00',
      imgPath: 'macbook-air.jpg'
    };

    this.dialog.open(CheckoutComponent, { 
      autoFocus: 'first-heading',
      data,
      disableClose: true,
      panelClass: 'checkout-dialog',
     });
  }

  public ngOnInit() {
    // Checkout dialog should be triggered by user interaction instead of Init event
    this.load();
  }
}
