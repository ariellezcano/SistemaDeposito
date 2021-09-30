import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { OrdenCompra } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.scss']
})
export class OrdenCompraComponent implements OnInit {
  entity = 'Listado de estados';

  item!: OrdenCompra;
  items!: OrdenCompra[];

  
  @ViewChild('close')
  cerrar!: ElementRef;


  //evento que cierra el abm al crearse el objeto
  evento(event: Boolean) {
    console.log('se creo correctamente', this.item);
    this.cerrar.nativeElement.click();
  }
  
  constructor() {
    
    //incialializa el array en vacio
    this.items = [];
    //recorre el bucle dando 5 vueltas
    for (let index = 0; index < 5; index++) {
      //inicializa el objeto
      this.item = new OrdenCompra();
      // agrega los datos del modelo
      this.item.id = 1;
      this.item.nroOrdenCompra = "102";
      this.item.nroExpte = "192/165/22"
      this.item.proveedor.nombre= "string";
      this.item.fechaCompra = moment().format('L');
      this.item.tipoCompra= "string";
      this.item.fechaPagoCompra= moment().format('L');
      this.item.activo = true
      this.items.push(this.item);
    }
  }


  ngOnInit(): void {
  }

}
