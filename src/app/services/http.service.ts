import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private data = '../assets/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Products[]> {
    return this.http.get<Products[]>(this.data);
}
}




