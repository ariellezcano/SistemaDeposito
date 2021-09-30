import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Equipo } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-lst-equipo',
  templateUrl: './lst-equipo.component.html',
  styleUrls: ['./lst-equipo.component.scss']
})
export class LstEquipoComponent implements OnInit {

  entity = 'Lista de equipos';

  item!: Equipo;
  items!: Equipo[];

  
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
      this.item = new Equipo();
      // agrega los datos del modelo
      this.item.id = index + 1;
      this.item.modelo.marca.nombre = "HP";
      this.item.modelo.nombre = "Laserjet 1102";
      this.item.tipoEquipo.nombre = "Impresora";
      this.item.tipoAlta = "Adquisicion Policial";
      this.item.activo = true;
      this.items.push(this.item);
    }
  }

  ngOnInit(): void {
  }

}
