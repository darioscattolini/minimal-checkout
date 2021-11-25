import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleCheckoutData } from 'src/models/models';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public article: ArticleCheckoutData
  ) { }

}
