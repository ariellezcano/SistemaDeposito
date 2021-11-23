import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import {
  DatoPolicial,
  DetalleCompra,
  Modelo,
  OrdenCompra,
  Persona,
  TipoEquipo,
} from 'src/app/modelo/index.models';
import {
  DetalleCompraService,
  OrdenCompraService,
} from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-detalle-compra',
  templateUrl: './abm-detalle-compra.component.html',
  styleUrls: ['./abm-detalle-compra.component.scss'],
})
export class AbmDetalleCompraComponent implements OnInit {
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

  procesando!: Boolean;

  entity = 'principal/ordenCompra';

  compra!: OrdenCompra;

  id!: number;

  itm!: DetalleCompra;
  item: DetalleCompra;
  items!: DetalleCompra[];

  dt: DetalleCompra;

  cantidad!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: DetalleCompraService,
    private wsdlc: OrdenCompraService
  ) {
    this.compra = new OrdenCompra();
    this.item = new DetalleCompra();
    this.items = [];
    this.dt = new DetalleCompra();
  }

  ngOnInit() {
    this.procesando = false;
    this.id = this.route.snapshot.params.id;
    this.findID();
  }

  async findID() {
    try {
      if (this.id > 0) {
        let data = await this.wsdlc.doFind(this.id).then();
        let res = JSON.parse(JSON.stringify(data));
        if (res.status == 200) {
          this.compra = res.data;

          this.obtenerDetalle();

          // if (this.item.fecha_recepcion != undefined)
          //   this.item.fecha_recepcion = moment(
          //     this.item.fecha_recepcion
          //   ).format('YYYY-MM-DD');
        }
      } else {
        this.item = new DetalleCompra();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
    }
  }
  //enlista el detalle de compra en la tabla del abm y lo guarda en la lista de detalle
  async obtenerDetalle() {
    try {
      let criteria = '(c.compra.id =' + this.compra.id + ') AND c.activo=true';
      let data = await this.wsdl
        .doCriteria(criteria, false, null, 'ORDER BY c.id Desc', 1, 1000)
        .then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.status == 200) {
        this.items = result.data;
      } else {
        this.items = [];
      }
    } catch (error) {}
  }

  //validar los campos del registro
  doAction() {
    /* validar */
    for (let index = 0; index < this.items.length; index++) {
      this.dt = new DetalleCompra();
      this.dt = this.items[index];

      if (this.dt.id == undefined) {
        this.item = new DetalleCompra();
        this.item = this.dt;
        this.item.compra = new OrdenCompra();
        this.item.compra.id = this.id;

        this.doCreate();
      }
    }
  }

  //crear el registro
  async doCreate() {
    try {
      this.procesando = true;

      this.item.cantidadIngreso = 0;

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
  //editar el registro
  async doEdit() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doUpdate(this.item, this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.status == 200) {
        UturuncoUtils.showToas('Se actualizado correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
        this.cerrar.nativeElement.click();
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
  async doEditEntrega() {
    try {
      this.procesando = true;
      this.itm.personalRecibe = new Persona();

      this.itm.personalRecibe.id = JSON.parse(
        '' + UturuncoUtils.getSession('personal')
      ).id;

      if (this.faltantes(this.itm) < 0) {
        UturuncoUtils.showToas('No recibir mas de lo comprado', 'info');
        return;
      }

      const res = await this.wsdl.doUpdate(this.itm, this.itm.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.status == 200) {
        UturuncoUtils.showToas('Se actualizó correctamente', 'success');
        this.cerrar.nativeElement.click();
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

  preDelete(item: DetalleCompra) {
    this.item = new DetalleCompra();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text: '¡No podrás recuperar este archivo ' + item.tipoEquipo.nombre + '!',
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

  select(item: DetalleCompra) {
    this.itm = new DetalleCompra();
    this.itm = item;
  }

  // para ver cuantos equipos faltan en entregar

  faltantes(itm: DetalleCompra) {
    return itm.cantidadCompra - itm.cantidadIngreso;
  }

  async delete() {
    try {
      this.procesando = true;
      this.item.activo = false;

      const res = await this.wsdl.doUpdate(this.item, this.item.id).then();
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

  back() {
    this.router.navigateByUrl(this.entity);
  }

  // se utiliza para la seleccion del combo modelo
  seleccionmodelo(event: Modelo) {
    this.item.modelo = event;
  }

  // se utiliza para la seleccion del combo tipo equipo
  selecciontipoEquipo(event: TipoEquipo) {
    this.item.tipoEquipo = event;
  }

  getProceso() {
    return this.procesando;
  }

  // se utiliza en la compra
  tipoCompra(value: any) {
    let valor = '';
    switch (value) {
      case 'CD':
        valor = 'Contratación Directa';
        break;
      case 'CP':
        valor = 'Concurso de Precios';
        break;
      case 'LPr':
        valor = 'Licitación Privada';
        break;
      case 'LPu':
        valor = 'Licitación Pública';
        break;
      default:
        valor = 'SIN TIPO ADQUISICION';
        break;
    }
    return valor;
  }

  //agregar la fila en memoria
  addRow() {
    this.items.unshift(this.item);
    this.item = new DetalleCompra();
  }
  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }

  //cancelar no se utiliza
  // cancelar(item: DetalleCompra) {
  //   item.editar = !item.editar;
  //   item.cantidadCompra = this.cantidad;
  //   this.cantidad = 0;
  // }

  //cancelar no se utiliza
  // modificar(item: DetalleCompra) {
  //   if (item.id > 0) {
  //     alert('esto es ya existe actualizo');
  //     this.doEdit();
  //   } else {
  //     alert('esto es en memroia');
  //     item.editar = !item.editar;
  //     this.cantidad = item.cantidadCompra;
  //   }
  // }

  // guardarboton no se utiliza
  // guardarboton(item: DetalleCompra) {
  //   item.editar = !item.editar;
  //   this.cantidad = 0;
  // }

  // se utiliza para pintar la fila en memoria
  colores(item: DetalleCompra) {
    let color = '';

    if (item.id == undefined) {
      color = 't-success';
    } else {
      color = 't-default';
    }

    return color;
  }
}
