import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modelo } from 'src/app/modelo/index.models';
import { ModeloService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-combo-modelo-equipo',
  templateUrl: './combo-modelo-equipo.component.html',
  styleUrls: ['./combo-modelo-equipo.component.scss'],
})
export class ComboModeloEquipoComponent implements OnInit {
  @Input()
  set dibujar(item: Modelo) {
    this.item = item;
  }

  keyword = 'nombre';

  item: Modelo;
  items: Modelo[];
  @Output()
  emity: EventEmitter<Modelo> = new EventEmitter<Modelo>();
  @Output()
  opcionseleccionada!: Modelo;

  constructor(private wsdl: ModeloService) {
    this.item = new Modelo();
    this.items = [];
    this.listar();
    // this.opcionseleccionada = "";
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: any) {
    this.item = event;
    //Swal.fire(event.nombre)
    //console.log(event.nombre)
    this.emity.emit(this.item);
  }

  compareFnPer(c1: Modelo, c2: Modelo): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listar() {
    this.wsdl.getList(1, 2000).then((data: any) => {
      this.items = data.data;
      this.items.sort();
      console.log(this.items);
      //   this.items.sort((x: any, y: any) => {
      //     if (x.nombre > y.nombre) {
      //       return 1;
      //     }
      //     if (x.nombre < y.nombre) {
      //       return -1;
      //     }
      //     return 0;
      //   });
    });
  }
}
