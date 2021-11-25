import { Component, Input } from '@angular/core';
import { ArticleCheckoutData } from 'src/models/models';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  public name?: ArticleCheckoutData['name'];
  public price?: ArticleCheckoutData['price'];
  public imgPath?: ArticleCheckoutData['imgPath'];

  @Input() public set article(article: ArticleCheckoutData) {
    this.name = article.name;
    this.price = article.price;
    this.imgPath = article.imgPath;
  };
}
