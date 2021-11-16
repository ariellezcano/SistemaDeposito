import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import {
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
  item: DetalleCompra;
  items!: DetalleCompra[];
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

  doAction() {
    /* validar */

    for (let index = 0; index < this.items.length; index++) {
      const dt = this.items[index];
      dt.compra.id = this.id;
      this.item = new DetalleCompra();
      this.item = dt;
      //console.log('item', this.item);

      if (this.item.id > 0) {
        this.doEdit();
      } else {
        this.doCreate();
      }
    }
  }

  async doEdit() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doUpdate(this.item, this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.status == 200) {
        UturuncoUtils.showToas('Se actualizado correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.procesando = false;
  }

  async doCreate() {
    try {
      this.procesando = true;
      this.item.compra = this.compra;
      this.item.cantidad_ingreso = 0;
      console.log('datos enviados', this.items);

      const res = await this.wsdl.doInsert(this.item).then();
      this.procesando = false;
      console.log('datos', res);
      const result = JSON.parse(JSON.stringify(res));

      if (result.status == 200) {
        //this.item = result.status;
        UturuncoUtils.showToas('Se creo correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
  }

  preDelete(item: DetalleCompra) {
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' + item.tipo_equipo.nombre + '!',
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

  async delete() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doDelete(this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        UturuncoUtils.showToas(result.msg, 'success');
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.procesando = false;
  }

  back() {
    this.router.navigateByUrl(this.entity);
  }

  seleccionpersona(event: Persona) {
    this.item.personal_recibe = event;
    // console.log("soy el papa" , this.item.personal_recibe)
  }

  seleccionmodelo(event: Modelo) {
    this.item.modelo = event;
    // console.log("soy el papa" , this.item.modelo)
  }

  selecciontipoEquipo(event: TipoEquipo) {
    this.item.tipo_equipo = event;
    // console.log("soy el papa" , this.item.tipo_equipo)
  }
  getProceso() {
    return this.procesando;
  }

  //control de búsqueda
  async buscar(op: any) {
    let crit = '';

    switch (op) {
      case 1:
        {
          crit =
            "c.compra.ordenCompraNum like '" +
            this.item.compra.ordenCompraNum +
            "' AND c.activo=true";
        }
        break;
      case 2:
        {
          crit =
            "c.compra.nroExpediente like '" +
            this.item.compra.nroExpediente +
            "' AND c.activo=true";
        }
        break;
      default: {
      }
    }

    let data = await this.wsdl
      .doCriteria(crit, true, null, 'ORDER BY c.fecha_recepcion ASC', 1, 1)
      .then();
    const result = JSON.parse(JSON.stringify(data));

    if (result.status === 200) {
      Swal.fire({
        title: 'Ya está asignado dentro de la Base de datos',
        text: '¡MODIFIQUE EL DATO INGRESADO!',
        icon: 'warning',
      });
    } else if (result.status === 666) {
    } else {
      Swal.fire({
        title: 'NO ESTA ASIGNADO',
        text: 'Puede seguir agregando',
        icon: 'success',
      });
    }
  }

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

  // compras: any[];
  guardar(f: NgForm) {
    if (f.valid) {
      this.items.unshift(this.item);
      //console.log('equipo', this.item.tipo_equipo.id);
    }
    this.item = new DetalleCompra();
  }

  eliminar(indice: any) {
    this.items.splice(indice, 1);
  }
  cancelar(item: DetalleCompra) {
    item.editar = !item.editar;
    item.cantidad_compra = this.cantidad;
    this.cantidad = 0;
  }

  modificar(item: DetalleCompra) {
    if (item.id > 0) {
      alert('esto es ya existe actualizo');
      this.doEdit();
    } else {
      alert('esto es en memroia');
      item.editar = !item.editar;
      this.cantidad = item.cantidad_compra;
    }
  }

  guardarboton(item: DetalleCompra) {
    item.editar = !item.editar;
    this.cantidad = 0;
  }
}
