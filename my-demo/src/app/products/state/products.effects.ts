import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../products.service';
import {
  mergeMap,
  map,
  catchError,
  concatMap,
  exhaustMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';

@Injectable()
export class ProductEffects {
  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productsService.getAll().pipe(
          map((products) =>
            ProductsAPIActions.productsLoadedSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsAPIActions.productsLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({ product }) =>
        this.productsService.add(product).pipe(
          map((newProduct) =>
            ProductsAPIActions.productAddedSuccess({ product: newProduct })
          ),
          catchError((error) =>
            of(ProductsAPIActions.productAddedFail({ message: error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map((newProduct) =>
            ProductsAPIActions.productUpdatedSuccess({ product: newProduct })
          ),
          catchError((error) =>
            of(ProductsAPIActions.productUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.delete(id).pipe(
          map(() => ProductsAPIActions.productDeletedSuccess({ id })),
          catchError((error) =>
            of(ProductsAPIActions.productDeletedFail({ message: error }))
          )
        )
      )
    )
  );
}
