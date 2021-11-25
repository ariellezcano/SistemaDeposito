import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DetalleCompra,
  DetalleEquipos,
  Equipo,
} from 'src/app/modelo/index.models';
import { DetalleEquipoService } from 'src/app/servicio/componentes/detalle-equipo.service';
import { DetalleCompraService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-detalle-equipo',
  templateUrl: './abm-detalle-equipo.component.html',
  styleUrls: ['./abm-detalle-equipo.component.scss'],
})
export class AbmDetalleEquipoComponent implements OnInit {
  @ViewChild('close') cerrar!: ElementRef;

  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  /*
   * control de operaciones a realizar
   */
  /*
   * control de operaciones a realizar
   */
  detalle = 'principal/detallecompra';
  detalleEq = 'principal/detalleequipo';

  procesando!: Boolean;

  entity = 'principal/ordenCompra';

  id!: number;

  item: DetalleEquipos;
  items!: DetalleEquipos[];

  detallecompra: DetalleCompra;
  equipo: DetalleEquipos;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: DetalleEquipoService,
    private wsdlD: DetalleCompraService
  ) {
    this.item = new DetalleEquipos();
    this.items = [];
    this.detallecompra = new DetalleCompra();
    this.equipo = new DetalleEquipos();
  }

  ngOnInit() {
    this.procesando = false;
    this.id = this.route.snapshot.params.id;
    this.findID();
  }

  async findID() {
    try {
      if (this.id > 0) {
        let data = await this.wsdlD.doFind(this.id).then();
        let res = JSON.parse(JSON.stringify(data));
        if (res.status == 200) {
          this.detallecompra = res.data;

          //this.obtenerDetalle();
        }
      } else {
        this.item = new DetalleEquipos();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
    }
  }
  //enlista el detalle de compra en la tabla del abm y lo guarda en la lista de detalle
  // async obtenerDetalle() {
  //   try {
  //     let criteria = '(c.compra.id =' + this.compra.id + ') AND c.activo=true';
  //     let data = await this.wsdl
  //       .doCriteria(criteria, false, null, 'ORDER BY c.id Desc', 1, 1000)
  //       .then();
  //     const result = JSON.parse(JSON.stringify(data));
  //     if (result.status == 200) {
  //       this.items = result.data;
  //     } else {
  //       this.items = [];
  //     }
  //   } catch (error) {}
  // }

  //validar los campos del registro
  doAction() {
    /* validar */
    this.items.forEach((e) => {
      e.detalle.id = this.id;
      if (e.id == undefined) {
        this.item = new DetalleEquipos();
        this.item = e;
        console.log('items', this.item);
        //this.doCreate();
      }
    });
    //console.log('items', this.item);
  }

  //crear el registro
  async doCreate() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doInsert(this.item).then();
      this.procesando = false;
      const result = JSON.parse(JSON.stringify(res));

      if (result.status == 200) {
        //this.item = result.status;
        UturuncoUtils.showToas('Se creó correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    } finally {
      this.procesando = false;
    }
  }
  preDelete(item: DetalleEquipos) {
    this.item = new DetalleEquipos();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        item.equipo.tipoEquipo.nombre +
        '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.delete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        UturuncoUtils.showToas('Tu archivo esta seguro :)', 'warning');
      }
    });
  }

  equiposEncontrados(event: Equipo) {
    if (event.id !== undefined) {
      this.item.equipo = event;
    } else {
      Swal.fire('Seleccione Equipo');
    }
  }

  // select(item: DetalleCompra) {
  //   this.itm = new DetalleCompra();
  //   this.itm = item;
  // }

  // para ver cuantos equipos faltan en entregar

  faltantes(itm: DetalleCompra) {
    return itm.cantidadCompra - itm.cantidadIngreso;
  }

  async delete() {
    try {
      this.procesando = true;

      const res = await this.wsdl.doDelete(this.item).then();
      const result = JSON.parse(JSON.stringify(res));

      if (result.status == 200) {
        UturuncoUtils.showToas('Eliminado exitosamente!', 'success');
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    } finally {
      this.procesando = false;
    }
  }

  getProceso() {
    return this.procesando;
  }

  //agregar la fila en memoria
  addRow() {
    this.items.unshift(this.item);
    this.item = new DetalleEquipos();
  }
  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }

  // se utiliza para pintar la fila en memoria
  colores(item: DetalleEquipos) {
    let color = '';

    if (item.id == undefined) {
      color = 't-success';
    } else {
      color = 't-default';
    }

    return color;
  }

  back() {
    this.router.navigateByUrl(this.entity);
  }
}
