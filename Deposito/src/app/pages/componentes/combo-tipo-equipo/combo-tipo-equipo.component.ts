import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoEquipo } from 'src/app/modelo/index.models';
import { TipoEquipoService } from 'src/app/servicio/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-combo-tipo-equipo',
  templateUrl: './combo-tipo-equipo.component.html',
  styleUrls: ['./combo-tipo-equipo.component.scss']
})
export class ComboTipoEquipoComponent implements OnInit {

  @Input()
  set dibujar(item: TipoEquipo){
    this.item = item
  }


  item: TipoEquipo;
  items: TipoEquipo[];
  @Output()
  emity: EventEmitter<TipoEquipo> = new EventEmitter<TipoEquipo>();
  @Output()
  opcionseleccionada!: TipoEquipo;

  constructor(private wsdl: TipoEquipoService) {
    this.item = new TipoEquipo();
    this.items = [];
    this.listar();
   // this.opcionseleccionada = "";
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: TipoEquipo) {
      this.item = event;
      //Swal.fire(event.nombre)
      console.log(event.nombre)
      this.emity.emit(this.item);
  }

  compareFnPer(c1: TipoEquipo, c2: TipoEquipo): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listar() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data;
      this.items.sort((x: any, y: any) => {
        if (x.nombre > y.nombre) {
          return 1;
        }
        if (x.nombre < y.nombre) {
          return -1;
        }
        return 0;
      });
    });
  }

}
