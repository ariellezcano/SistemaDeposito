import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modelo } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-lst-modelo',
  templateUrl: './lst-modelo.component.html',
  styleUrls: ['./lst-modelo.component.scss']
})
export class LstModeloComponent implements OnInit {
entity = "Listado de modelos"

id = 1
marca = "hp"
modelo = "laserjet 1102"

item!: Modelo;
items!: Modelo[];


@ViewChild('close')
cerrar!: ElementRef;


//evento que envia los datos del abm al listado
evento(event: Boolean) {
  console.log('se creo correctamente', this.item);
  this.cerrar.nativeElement.click();
}

constructor() {}

  ngOnInit(): void {}
}
