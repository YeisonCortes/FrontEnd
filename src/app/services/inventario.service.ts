import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inventario } from '../models/inventario';

@Injectable({
  providedIn: 'root'
})

export class InventarioService {
  myAppUrl = 'https://localhost:44351/';
  myApiUrl = 'api/Inventario/';
  list?: Inventario[];
  private actualizarFormulario = new BehaviorSubject<Inventario>({} as any);

  constructor(private http: HttpClient) { }

  guardarInventario(inventario: Inventario): Observable<Inventario>{
    return this.http.post<Inventario>(this.myAppUrl+this.myApiUrl, inventario);
  }

  eliminarInventario(id?: number): Observable<Inventario>{
    return this.http.delete<Inventario>(this.myAppUrl + this.myApiUrl + id);
  }

  obtenerInventario(){
    this.http.get(this.myAppUrl+this.myApiUrl).toPromise()
              .then(data => {
                this.list = data as Inventario[];
              })  
  }

  actualizarInventario(id: number, inventary: Inventario): Observable<Inventario>{
    return this.http.put<Inventario>(this.myAppUrl + this.myApiUrl + id, inventary)
  }
  actualizar(inventario: Inventario){
    this.actualizarFormulario.next(inventario);
  }

  obtenerInventario$(): Observable<Inventario>{
    return this.actualizarFormulario.asObservable()
  }

}
