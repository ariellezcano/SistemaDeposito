import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EntregaEquipoUnidades } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lst-hitorial-equipo',
  templateUrl: './lst-hitorial-equipo.component.html',
  styleUrls: ['./lst-hitorial-equipo.component.scss'],
})
export class LstHitorialEquipoComponent implements OnInit {
  Entity = 'Historial de equipos';
  public load: boolean;

  constructor(private wsdl: EntregaEquipoUnidadService) {
    this.load = false;
    this.item = new EntregaEquipoUnidades();
    this.items = [];
  }

  fecha: Date = new Date();

  @ViewChild('collapse')
  collapse!: ElementRef;

  @ViewChild('close')
  close!: ElementRef;

  @Output()
  finalizado = new EventEmitter<Boolean>();
  resultado = new EventEmitter<EntregaEquipoUnidades[]>();

  entregaEquipo!: EntregaEquipoUnidades[];
  public items: EntregaEquipoUnidades[];
  public item: EntregaEquipoUnidades;

  encontrados(event: EntregaEquipoUnidades[]) {
    this.items = event;
    this.collapse.nativeElement.click();
  }

  accion(event: Boolean) {
    this.close.nativeElement.click();
    if (event) {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Se actualizo correctamente el fichero.',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  //para exportar a excel
  exportTableToExcel(tableID: any, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var navigator: any;
    var tableSelect: any = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xlsx' : 'excel_data.xlsx';

    // Create download link element
    downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(['ufeff', tableHTML], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  }

  doFound(event: EntregaEquipoUnidades[]) {
    this.items = event;
  }

  instrumento(value: any) {
    console.log("instrumento", value)
    let valor = '';
    switch (value) {
      case 'PC':
        valor = 'PROVISION CON CARGO';
        break;
      case 'PP':
        valor = 'PRESTAMO PROVISORIO';
        break;
      case 'SE':
        valor = 'ORDEN DE SERVICIO EXTERNO';
        break;
      case 'RE':
        valor = 'ENTREGA POR RELEVAMIENTO';
        break;
      default:
        valor = 'SIN INSTRUMENTO';
        break;
    }
    return valor;
  }

  ngOnInit() {
    this.instrumento;
  }
}
