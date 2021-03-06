import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EntregaEquipoUnidades, Vehiculo } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import { VehiculosService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilEntregaEquipoUnidadComponent } from '../../filtros/fil-entrega-equipo-unidad/fil-entrega-equipo-unidad.component';

@Component({
  selector: 'app-lst-entrega-equipo-unidad',
  templateUrl: './lst-entrega-equipo-unidad.component.html',
  styleUrls: ['./lst-entrega-equipo-unidad.component.scss'],
})
export class LstEntregaEquipoUnidadComponent implements OnInit {
  public load!: boolean;
  @ViewChild(FilEntregaEquipoUnidadComponent, { static: true })
  fil!: FilEntregaEquipoUnidadComponent;
  @ViewChild('close')
  cerrar!: ElementRef;
  entity = ' Equipos Entregados';
  entidad = 'principal/entregaEquipoUnidad';

  items: EntregaEquipoUnidades[];
  historial: EntregaEquipoUnidades[];
  item: EntregaEquipoUnidades;

  vehiculo: Vehiculo;

  procesando!: Boolean;
  exportar: boolean = false;
  constructor(
    private wsdl: EntregaEquipoUnidadService,
    private router: Router,
    private wsdlM: VehiculosService
  ) {
    this.item = new EntregaEquipoUnidades();
    this.items = [];
    this.historial = [];
    this.vehiculo = new Vehiculo();
  }

  ngOnInit() {}

  /* esto sirve para cuado hay combobox */
  @Input()
  set select(item: EntregaEquipoUnidades) {
    this.item = item;
  }

  movil(item: EntregaEquipoUnidades) {
    this.item = item;
  }
  vehiculoE(event: Vehiculo) {
    console.log('evento movil', event);
    this.item.movilPol = event.id;
  }

  cancel() {
    this.item = new EntregaEquipoUnidades();
    this.fil.list();
  }

  async setResultCancel(event: Boolean) {
    UturuncoUtils.showToas('Operación cancelada', 'info');
  }

  setResult(event: any) {
    this.cancel();
  }

  evento(event: Boolean) {
    UturuncoUtils.showToas('Se creo correctamente', 'success');
    this.cerrar.nativeElement.click();
    this.fil.list();
  }

  preDelete(item: EntregaEquipoUnidades) {
    this.item = new EntregaEquipoUnidades();
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

  async delete() {
    try {
      this.procesando = true;
      const res = await this.wsdl.doDelete(this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        UturuncoUtils.showToas(result.msg, 'success');
        this.cancel();
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.procesando = false;
  }

  doFound(event: EntregaEquipoUnidades[]) {
    this.items = event;
  }

  encontradosfil(event: EntregaEquipoUnidades[]) {
    this.items = event;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl(this.entidad.toLowerCase() + '/abm/' + id);
  }

  linkearReporte(id?: Number) {
    this.router.navigateByUrl(this.entidad.toLowerCase() + '/reporte/' + id);
  }

  linkearActa(id?: Number) {
    this.router.navigateByUrl(
      this.entidad.toLowerCase() + '/actaentrega/' + id
    );
  }

  //devuelve movil policial
  async buscarvehiculo(item: number) {
    const crit = 'c.id = ' + item + ' ';
    let data = await this.wsdlM
      .doCriteria(crit, false, null, 'ORDER BY c.id ASC', 1, 100)
      .then();

    const result = JSON.parse(JSON.stringify(data));
    if (result.status === 200) {
      this.vehiculo = result.data[0];
    } else if (result.status === 666) {
      // logout app o refresh token
      this.items = [];
    } else {
      //  this.persona = new Persona();
      this.items = [];
    }
    //this.resultado.emit(this.items);
  }

  async listarHistorial(id: any) {
    const crit = 'c.equipo.id = ' + id;
    let data = await this.wsdl.doCriteria(
      crit,
      false,
      null,
      'ORDER BY c.fechaEntrega desc',
      1,
      100
    );
    const result = JSON.parse(JSON.stringify(data));
    console.log('historial', result);
    if (result.status === 200) {
      this.historial = result.data;
    } else if (result.status === 666) {
      // logout app o refresh token
      this.historial = [];
    } else {
      //  this.persona = new Persona();
      this.historial = [];
    }
    //this.resultado.emit(this.items);
  }

  tipoEntrega(value: any) {
    let valor = '';
    switch (value) {
      case 'PP':
        valor = 'PRESTAMO PROVISORIO';
        break;
      case 'PC':
        valor = 'PROVISION CON CARGO';
        break;
      default:
        valor = 'SIN TIPO ENTREGA';
        break;
    }
    return valor;
  }
  motivoEntrega(value: any) {
    let valor = '';
    switch (value) {
      case 'SE':
        valor = 'ORDEN DE SERVICIO EXTERNO';
        break;
      case 'RE':
        valor = 'ENTREGA POR RELEVAMIENTO';
        break;
      case 'DS':
        valor = 'ENTREGA POR DIRECTIVA SUPERIOR';
        break;
      default:
        valor = 'SIN MOTIVO DE ENTREGA';
        break;
    }
    return valor;
  }

  //para exportar datos a excel
  async exportTableToExcel(tableID: any, filename = '') {
    this.exportar = true;
    await UturuncoUtils.delay(300);
    await UturuncoUtils.exportTableToExcel(tableID, filename).then();

    this.exportar = false;
  }

  scroll(value: any[]) {
    const valor = '';
    if (value.length > 5) {
      const valor = 'table-responsive';
      return valor;
    } else {
      return console.log('no hay mas de 10');
    }
  }
}
