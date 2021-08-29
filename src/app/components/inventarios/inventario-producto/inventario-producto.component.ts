import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Inventario } from 'src/app/models/inventario';
import { InventarioService } from 'src/app/services/inventario.service';
import { InventarioListComponent } from 'src/app/components/inventarios/inventario-list/inventario-list.component';


@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  suscription!: Subscription;
  vInventario!: Inventario;
  idInventario = 0;

  @ViewChild(InventarioListComponent) Listado?: InventarioListComponent;

  constructor(private formBuilder: FormBuilder, 
              private inventarioService: InventarioService,
              private toastr: ToastrService) { 
    this.form = this.formBuilder.group({
      id: 0,
      bodega: [0, [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      estado: [0, [Validators.required]],
      stock: ['', [Validators.required]],
    })
  }

  
  ngOnInit(): void {
    this.suscription =  this.inventarioService.obtenerInventario$().subscribe(data => {
      this.vInventario = data;
      this.form.patchValue({
        bodega: this.vInventario.inBodega,
        nombre: this.vInventario.inNombre,
        estado: this.vInventario.inEstado,
        stock: this.vInventario.inStock
      });
      this.idInventario = this.vInventario.inCod;
    });
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  guardarProducto(){
    if(this.idInventario === 0 || this.idInventario === undefined){
      this.Agregar();
    }else{
      this.Editar();
    }
  }

  Agregar(){
    const inventario: Inventario = {
      inCod: this.idInventario,
      inBodega: this.form.get('bodega')?.value,
      inNombre: this.form.get('nombre')?.value,
      inEstado: this.form.get('estado')?.value,
      inStock: this.form.get('stock')?.value,
    }
    this.inventarioService.guardarInventario(inventario).subscribe(data => {
      this.toastr.success('El Producto fue Guardado Exitosamente', 'Registro Agregado');
      this.form.reset();
      setTimeout(()=>{ window.location.reload() }, 3000) 
    })
  }

  Editar(){
    //editar
    const inventario: Inventario = {
      inCod: this.vInventario.inCod,
      inBodega: this.form.get('bodega')?.value,
      inNombre: this.form.get('nombre')?.value,
      inEstado: this.form.get('estado')?.value,
      inStock: this.form.get('stock')?.value,
    }
    this.inventarioService.actualizarInventario(this.idInventario, inventario).subscribe(data => {
      this.toastr.info('El Producto fue Actualizado', 'Registro Actualizado');
      this.form.reset();
      this.idInventario = 0;
      setTimeout(()=>{ window.location.reload() }, 3000) 
    })
  }  

}
