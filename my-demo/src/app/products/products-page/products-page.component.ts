import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { select, Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import {
  selectProducts,
  selectProductsErrorMessage,
  selectProductsLoading,
  selectProductsShowProductCode,
  selectProductsTotal,
} from '../state/products.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$ = this.store.select(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectProductsShowProductCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(private store: Store) {
    this.store.subscribe((store) => console.log(store));
  }

  ngOnInit() {
    this.store.dispatch(ProductsPageActions.loadProducts());
  }

  toggleShowProductCode(event: { d: string }) {
    console.log(event, 'toggleShowProductCode');
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
