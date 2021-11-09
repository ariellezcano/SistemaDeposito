import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdenCompra } from 'src/app/modelo/index.models';
import { OrdenCompraService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-combo-compra',
  templateUrl: './combo-compra.component.html',
  styleUrls: ['./combo-compra.component.scss']
})
export class ComboCompraComponent implements OnInit {

  @Input()
  set dibujar(item: OrdenCompra){
    this.item = item
  }


  item: OrdenCompra;
  items: OrdenCompra[];
  @Output()
  emity: EventEmitter<OrdenCompra> = new EventEmitter<OrdenCompra>();
  @Output()
  opcionseleccionada!: OrdenCompra;

  constructor(private wsdl: OrdenCompraService) {
    this.item = new OrdenCompra();
    this.items = [];
    this.listar();
   // this.opcionseleccionada = "";
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: OrdenCompra) {
      this.item = event;
      //Swal.fire(event.nombre)
      //console.log(event.nombre)
      this.emity.emit(this.item);
  }

  compareFnPer(c1: OrdenCompra, c2: OrdenCompra): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listar() {
    this.wsdl.getList(1, 50).then((data: any) => {
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
