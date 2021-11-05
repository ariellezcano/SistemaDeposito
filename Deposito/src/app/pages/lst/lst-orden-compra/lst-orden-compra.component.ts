import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenCompra } from 'src/app/modelo/index.models';
import { OrdenCompraService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilOrdenCompraComponent } from '../../filtros/fil-orden-compra/fil-orden-compra.component';

@Component({
  selector: 'app-lst-orden-compra',
  templateUrl: './lst-orden-compra.component.html',
  styleUrls: ['./lst-orden-compra.component.scss']
})
export class LstOrdenCOmpraComponent implements OnInit {

  public load: boolean;
  @ViewChild(FilOrdenCompraComponent, { static: true })
  fil!: FilOrdenCompraComponent;
  @ViewChild('close')
  cerrar!: ElementRef;
  entity = 'Ordenes de Compras';
  entidad = 'principal/ordenCompra';

  items: OrdenCompra[];
  item: OrdenCompra;

  procesando!: Boolean;

  constructor(private wsdl: OrdenCompraService, private router: Router) {
    this.load = false;
    this.item = new OrdenCompra();
    this.items = [];
  }

  ngOnInit() {}
  /* esto sirve para cuado hay combobox */
  select(item: OrdenCompra) {
    this.item = item;
  }

  cancel() {
    this.item = new OrdenCompra();
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

  preDelete(item: OrdenCompra) {
    this.item = new OrdenCompra();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text: '¡No podrás recuperar este archivo ' + item.nroOrdenCompra + '!',
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

  doFound(event: OrdenCompra[]) {
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
  exportTableToExcel(tableID: any, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var navigator: any;

    var tableSelect: any = document.getElementById(tableID);
    console.log(tableSelect);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xlsx' : 'excel_data.xlsx';

    // Create download link element
    downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
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
