import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DetalleCompra } from 'src/app/modelo/index.models';
import { DetalleCompraService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilDetalleCompraComponent } from '../../filtros/fil-detalle-compra/fil-detalle-compra.component';

@Component({
  selector: 'app-lst-detalle-compra',
  templateUrl: './lst-detalle-compra.component.html',
  styleUrls: ['./lst-detalle-compra.component.scss'],
})
export class LstDetalleCompraComponent implements OnInit {
  public load: boolean;

  exportar: boolean = false;

  @ViewChild(FilDetalleCompraComponent, { static: true })
  fil!: FilDetalleCompraComponent;
  @ViewChild('close')
  cerrar!: ElementRef;
  entity = 'Detalles de la compra';
  entidad = 'principal/detallecompra';

  items: DetalleCompra[];
  item: DetalleCompra;

  procesando!: Boolean;

  constructor(private wsdl: DetalleCompraService, private router: Router) {
    this.load = false;
    this.item = new DetalleCompra();
    this.items = [];
  }

  ngOnInit() {}
  /* esto sirve para cuado hay combobox */
  select(item: DetalleCompra) {
    this.item = item;
  }

  cancel() {
    this.item = new DetalleCompra();
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

  doFound(event: DetalleCompra[]) {
    this.items = event;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl(this.entidad + '/abm/' + id);
  }

  colores(valor: any) {
    let color = '';
    switch (valor) {
      case 1:
        color = 't-success';
        break;
      case 11:
        color = 't-light';
        break;
      case 10:
        color = 't-violeta';
        break;
      case 8:
        color = 't-danger';
        break;
      case 9:
        color = 't-warning';
        break;
      default:
        color = 't-default';
        break;
    }
    return color;
  }

  tipoAdquisicion(value: any) {
    let valor = '';
    switch (value) {
      case 'AD':
        valor = 'Adquisicion Policial';
        break;
      case 'DO':
        valor = 'Donacion';
        break;
      case 'SE':
        valor = 'Secuestro';
        break;
      default:
        valor = 'SIN TIPO ADQUISICION';
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
    console.log('valor', value);
    const valor = '';
    if (value.length > 5) {
      const valor = 'table-responsive';
      return valor;
    } else {
      return console.log('no hay mas de 10');
    }
  }
}
