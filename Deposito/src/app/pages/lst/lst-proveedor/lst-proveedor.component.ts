import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-lst-proveedor',
  templateUrl: './lst-proveedor.component.html',
  styleUrls: ['./lst-proveedor.component.scss'],
})
export class LstProveedorComponent implements OnInit {
  entity = 'Listado de proveedores';

  @ViewChild('close')
  cerrar!: ElementRef;

  item!: Proveedor;
  items!: Proveedor[];

  constructor() {
    this.items = []
    for (let index = 0; index < 5; index++) {
      this.item = new Proveedor();

      this.item.id =  index+1 ;
      this.item.nombre = "PROVEEDOR " + index+1;
      this.item.Celular = "3624253403" + index + 1;
      this.item.activo = true
      this.item.correo = "ariellezcano95@hotmail.com"+ index+1
      this.item.cuit = "20355468759"+ index+1
      this.item.direccion = "sabatini 430"+ index+1
      this.item.telefono = "3624256458"+ index+1
      this.items.push(this.item)
      
    }
    
  }

  ngOnInit(): void {}

  //evento que envia los datos del abm al listado
  evento(event: Boolean) {
    console.log('se creo correctamente', this.item);
    this.cerrar.nativeElement.click();
  }
}
