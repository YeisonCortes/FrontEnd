import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimiento } from '../models/movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  myAppUrl = 'https://localhost:44351/';
  myApiUrl = 'api/Movimiento/';

  constructor(private http: HttpClient) { }

  guardarMovimiento(movimiento: Movimiento): Observable<Movimiento>{
    return this.http.post<Movimiento>(this.myAppUrl+this.myApiUrl, movimiento);
  }

  
}
