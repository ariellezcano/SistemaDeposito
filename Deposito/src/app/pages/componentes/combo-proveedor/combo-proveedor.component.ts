import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proveedor } from 'src/app/modelo/index.models';
import { ProveedorService } from 'src/app/servicio/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-combo-proveedor',
  templateUrl: './combo-proveedor.component.html',
  styleUrls: ['./combo-proveedor.component.scss']
})
export class ComboProveedorComponent implements OnInit {

  @Input()
  set dibujar(item: Proveedor){
    this.item = item
  }


  item: Proveedor;
  items: Proveedor[];
  @Output()
  emity: EventEmitter<Proveedor> = new EventEmitter<Proveedor>();
  @Output()
  opcionseleccionada!: Proveedor;

  constructor(private wsdl: ProveedorService) {
    this.item = new Proveedor();
    this.items = [];
    this.listar();
   // this.opcionseleccionada = "";
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: Proveedor) {
      this.item = event;
      //Swal.fire(event.nombre)
      //console.log(event.nombre)
      this.emity.emit(this.item);
  }

  compareFnPer(c1: Proveedor, c2: Proveedor): boolean {
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
