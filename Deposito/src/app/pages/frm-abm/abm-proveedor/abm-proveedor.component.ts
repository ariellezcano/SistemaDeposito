import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proveedor } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-abm-proveedor',
  templateUrl: './abm-proveedor.component.html',
  styleUrls: ['./abm-proveedor.component.scss']
})
export class AbmProveedorComponent implements OnInit {
  item!: Proveedor;

  constructor() { }

  ngOnInit(): void {
  }

  accion(f:NgForm){

  }
}
