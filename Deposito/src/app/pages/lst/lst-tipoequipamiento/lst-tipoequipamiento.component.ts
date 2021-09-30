import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TipoEquipo } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-lst-tipoequipamiento',
  templateUrl: './lst-tipoequipamiento.component.html',
  styleUrls: ['./lst-tipoequipamiento.component.scss']
})
export class LstTipoequipamientoComponent implements OnInit {

  entity = "Listado de tipos de equipos"



  @ViewChild('close')
  cerrar!: ElementRef;


  item!: TipoEquipo;
  items!: TipoEquipo[];

  constructor() {
    this.items = []
    for (let index = 0; index < 5; index++) {
      this.item = new TipoEquipo();

      this.item.id = index + 1 ;
      this.item.nombre = "IMPRESORA " + index + 1;
     
      this.item.activo = true
      this.items.push(this.item)
   }
  }

  evento(event: Boolean) {
    console.log('se creo correctamente', this.item);
    this.cerrar.nativeElement.click();
  }

  ngOnInit(): void {
  }

}