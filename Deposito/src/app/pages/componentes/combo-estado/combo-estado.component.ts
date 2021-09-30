import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstadoEquipo } from 'src/app/modelo/index.models';
import { EstadoEquipoService } from 'src/app/servicio/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-combo-estado',
  templateUrl: './combo-estado.component.html',
  styleUrls: ['./combo-estado.component.scss']
})
export class ComboEstadoComponent implements OnInit {
  @Input()
  set dibujar(item: EstadoEquipo){
    this.item = item
  }


  item: EstadoEquipo;
  items: EstadoEquipo[];
  @Output()
  emity: EventEmitter<EstadoEquipo> = new EventEmitter<EstadoEquipo>();
  @Output()
  opcionseleccionada!: EstadoEquipo;

  constructor(private wsdl: EstadoEquipoService) {
    this.item = new EstadoEquipo();
    this.items = [];
    this.listar();
   // this.opcionseleccionada = "";
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: EstadoEquipo) {
      this.item = event;
      //Swal.fire(event.nombre)
      console.log(event.nombre)
      this.emity.emit(this.item);
  }

  compareFnPer(c1: EstadoEquipo, c2: EstadoEquipo): boolean {
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
