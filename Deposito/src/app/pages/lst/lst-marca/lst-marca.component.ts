import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Marca } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-lst-marca',
  templateUrl: './lst-marca.component.html',
  styleUrls: ['./lst-marca.component.scss'],
})
export class LstMarcaComponent implements OnInit {
  entity = 'Listado de marcas';
  id = 1;
  marca = 'HP';

  item!: Marca;
  items!: Marca[];

  
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
