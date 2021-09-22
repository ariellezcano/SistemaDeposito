import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-equipamiento',
  templateUrl: './tipo-equipamiento.component.html',
  styleUrls: ['./tipo-equipamiento.component.scss']
})
export class TipoEquipamientoComponent implements OnInit {
marca="HP"
modelo= "laserjet 1102"
tipoEquipamiento= "impresora"

  constructor() { }

  ngOnInit(): void {
  }

}