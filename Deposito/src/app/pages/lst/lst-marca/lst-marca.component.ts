import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Marca } from 'src/app/modelo/index.models';
import { MarcaService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-lst-marca',
  templateUrl: './lst-marca.component.html',
  styleUrls: ['./lst-marca.component.scss'],
})
export class LstMarcaComponent implements OnInit {
  entity = 'Listado de marcas';

  item!: Marca;
  items!: Marca[];

  
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
      this.item = new Marca();
      // agrega los datos del modelo
      this.item.id = index + 1;
      this.item.nombre = 'HP' + index + 1;
      this.item.activo = true;
      this.items.push(this.item);
    }
  }

  ngOnInit(): void {}
}
