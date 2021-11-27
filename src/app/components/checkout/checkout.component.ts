import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleCheckoutData } from 'src/models/models';
import { 
  CreditCardFormComponent 
} from '../credit-card-input/credit-card-form.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
    
  @ViewChild('creditCard') private creditCard!: CreditCardFormComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public article: ArticleCheckoutData,
  ) { }
  
  public pay(method: 'apple-pay' | 'card') {
    const article = this.article.id;

    if (method === 'apple-pay') {
      alert(`Bought article id: ${article}. Should redirect to Apple Pay.`);
    } else {
      const cardData = this.creditCard.getValues();
      alert(
        `Bought article id: ${article}.
        The following card data should be sent to back-end: ${JSON.stringify(cardData, undefined, 2)}`
      );
    }
  }
}
