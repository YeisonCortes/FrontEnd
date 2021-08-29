import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Inventario } from 'src/app/models/inventario';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css']
})
export class InventarioListComponent implements OnDestroy, OnInit {
  myAppUrl = 'https://localhost:44351/';
  myApiUrl = 'api/Inventario/';
  list?: Inventario[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(public inventarioService: InventarioService,
              public toastr: ToastrService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 4,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.inicio();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }  

  eliminarInventario(id: number){
    if(confirm('¿Esta seguro que desea eliminar este producto?')){
      this.inventarioService.eliminarInventario(id).subscribe(data => {
        this.toastr.warning('El producto fue eliminado', 'Registro Eliminado');
        setTimeout(()=>{ window.location.reload() }, 3000)       
      });
    }
  }

  editar(inventario: Inventario){
    this.inventarioService.actualizar(inventario);
  }

  inicio(){
    this.http.get(this.myAppUrl+this.myApiUrl).toPromise()
              .then(data => {
                this.list = data as Inventario[];
                this.dtTrigger.next();
                console.log('Cargo la data');
              })     
  }

}
