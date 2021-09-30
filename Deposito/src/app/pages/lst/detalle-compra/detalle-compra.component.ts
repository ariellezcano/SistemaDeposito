import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DetalleCompra } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.scss']
})
export class DetalleCompraComponent implements OnInit {

  entity = 'Lista de equipos';

  item!: DetalleCompra;
  items!: DetalleCompra[];

  
  @ViewChild('close')
  cerrar!: ElementRef;


  //evento que envia los datos del abm al listado
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
      this.item = new DetalleCompra();
      // agrega los datos del modelo
      this.item.id=index+1;
      this.item.cantidadIngreso= 0;
      this.item.cantidadCompra= 0;
      this.item.equipo.tipoEquipo.nombre="impresora" 
      this.item.activo = true;
      this.items.push(this.item);
    }
  }


  ngOnInit(): void {
  }

}
