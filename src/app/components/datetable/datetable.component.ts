import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Inventario } from 'src/app/models/inventario';

@Component({
  selector: 'app-datetable',
  templateUrl: './datetable.component.html',
  styles: [
  ]
})
export class DatetableComponent implements OnDestroy, OnInit {
  myAppUrl = 'https://localhost:44351/';
  myApiUrl = 'api/Inventario/';
  list?: Inventario[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.http.get(this.myAppUrl+this.myApiUrl).toPromise()
      .then(data => {
        this.list = data as Inventario[];
        this.dtTrigger.next();
      });   
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
