import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { MovimientoComponent } from './components/movimiento/movimiento.component';
import { InventariosComponent } from './components/inventarios/inventarios.component';
import { InventarioProductoComponent } from './components/inventarios/inventario-producto/inventario-producto.component';
import { InventarioListComponent } from './components/inventarios/inventario-list/inventario-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { DatetableComponent } from './components/datetable/datetable.component';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent,
    MovimientoComponent,
    InventariosComponent,
    InventarioProductoComponent,
    InventarioListComponent,
    FooterComponent,
    DatetableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
