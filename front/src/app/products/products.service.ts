import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private static productslist: Product[] = null;
    private products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

    private apiUrl = 'http://127.0.0.1:8001/api/products' ;
    

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        if( ! ProductsService.productslist )
        {
            this.http.get<any>(this.apiUrl).subscribe(data => {
                ProductsService.productslist = data['hydra:member'];
                this.products$.next(ProductsService.productslist);
            });
        }
        else
        {
            this.products$.next(ProductsService.productslist);
        }

        return this.products$;
    }

    create(prod: Product): Observable<Product[]> {

        delete(prod.id);
        prod.quantity= 20;

        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(prod);
       
        this.http.post<any>(this.apiUrl , body, {'headers': headers} ).subscribe(data => {
        });

        this.products$.next(ProductsService.productslist = [prod, ...ProductsService.productslist]);

        return this.products$;
    }

    update(prod: Product): Observable<Product[]>{

        this.products$.next(ProductsService.productslist);        
        this.http.put<any>(this.apiUrl + '/' + prod.id, prod).subscribe(data => {
    });

        this.products$.next(ProductsService.productslist = [prod, ...ProductsService.productslist]);

        return this.products$;
    }

    delete(id: number): Observable<Product[]>{

        this.http.delete<any>(this.apiUrl + '/' + id).subscribe(data => {  
    });

    this.products$.next(ProductsService.productslist.filter(prod => prod.id != id));

    return this.products$;

    }
}
