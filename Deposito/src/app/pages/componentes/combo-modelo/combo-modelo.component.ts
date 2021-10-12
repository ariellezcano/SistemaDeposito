import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marca } from 'src/app/modelo/index.models';
import { MarcaService } from 'src/app/servicio/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-combo-modelo',
  templateUrl: './combo-modelo.component.html',
  styleUrls: ['./combo-modelo.component.scss']
})
export class ComboModeloComponent implements OnInit {

  @Input()
  set dibujar(item: Marca){
    this.item = item
  }


  item: Marca;
  items: Marca[];
  @Output()
  emity: EventEmitter<Marca> = new EventEmitter<Marca>();
  @Output()
  opcionseleccionada!: Marca;

  constructor(private wsdlM: MarcaService) {
    this.item = new Marca();
    this.items = [];
    this.listarmarca();
   // this.opcionseleccionada = "";
  }

  ngOnInit(): void {
    this.listarmarca();
  }
  //captura el dato del combo

  capturar(event: Marca) {
      this.item = event;
      //Swal.fire(event.nombre)
      //console.log(event.nombre)
      this.emity.emit(this.item);
  }

  compareFnPer(c1: Marca, c2: Marca): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listarmarca() {
    this.wsdlM.getList(1, 100).then((data: any) => {
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
