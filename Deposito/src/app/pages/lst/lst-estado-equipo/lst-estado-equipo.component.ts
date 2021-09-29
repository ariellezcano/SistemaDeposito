import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EstadoEquipo } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-lst-estado-equipo',
  templateUrl: './lst-estado-equipo.component.html',
  styleUrls: ['./lst-estado-equipo.component.scss']
})
export class LstEstadoEquipoComponent implements OnInit {

  entity = 'Listado de estados';

  item!: EstadoEquipo;
  items!: EstadoEquipo[];

  
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
      this.item = new EstadoEquipo();
      // agrega los datos del modelo
      this.item.id = 1;
      this.item.nombre = "en reparacion"
      this.item.activo = true
      this.items.push(this.item);
    }
  }

  ngOnInit(): void {
  }

}
