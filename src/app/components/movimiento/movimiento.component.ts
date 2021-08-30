import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Movimiento } from 'src/app/models/movimiento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovimientoService } from 'src/app/services/movimiento.service';
import { ToastrService } from 'ngx-toastr';
import { Inventario } from 'src/app/models/inventario';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {
  myAppUrl = 'https://localhost:44351/';
  myApiUrl = 'api/Movimiento/';
  form: FormGroup;
  list?: Movimiento[];
  productos?: Inventario[];
  vMovimiento!: Movimiento;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private formBuilder: FormBuilder,
              private movimientoService : MovimientoService,
              private toastr: ToastrService,
              private http: HttpClient) {

    this.form = this.formBuilder.group({
      id: 0,
      codproducto: ['', [Validators.required]],
      codclase: ['', [Validators.required]],
      cantidad: [0, [Validators.required]],
    })                
  }

  ngOnInit(): void {
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
    this.inicio();
    console.log(new Date);  
  }

  inicio(){
    this.http.get(this.myAppUrl+this.myApiUrl).toPromise()
              .then(data => {
                this.list = data as Movimiento[];
                this.dtTrigger.next();
              })
    
    this.http.get("https://localhost:44351/api/Inventario/ruta2").toPromise()
            .then(data => {
              this.productos = data as Inventario[];
            })           
  } 
  
  guardarMovimiento(){
    const movimiento: Movimiento = {
      moCod: 0,
      moProducto: this.form.get('codproducto')?.value,
      moClaseMvto: this.form.get('codclase')?.value,
      moCantidad: this.form.get('cantidad')?.value,
      moFecha: new Date,
    }
    this.movimientoService.guardarMovimiento(movimiento).subscribe(data => {
      this.toastr.success('El Movimieto se registro Exitosamente', 'Registro Agregado');
      this.form.reset();
      setTimeout(()=>{ window.location.reload() }, 3000) 
    })
  }  

}
