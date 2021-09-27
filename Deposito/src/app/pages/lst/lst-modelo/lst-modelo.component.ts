import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modelo } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-lst-modelo',
  templateUrl: './lst-modelo.component.html',
  styleUrls: ['./lst-modelo.component.scss'],
})
export class LstModeloComponent implements OnInit {
  entity = 'Listado de modelos';

  item!: Modelo;
  items!: Modelo[];

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
      this.item = new Modelo();
      // agrega los datos del modelo
      this.item.id = index + 1;
      this.item.nombre = 'Laserjet 11023' + index + 1;
      this.item.marca.nombre = 'HP' + index +1
      this.item.activo = true;
      this.items.push(this.item);
    }
  }

  ngOnInit(): void {}
}
