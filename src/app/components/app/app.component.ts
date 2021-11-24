import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dialog.open(CheckoutComponent);
  }
}
