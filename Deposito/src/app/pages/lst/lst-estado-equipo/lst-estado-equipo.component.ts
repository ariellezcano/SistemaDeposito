import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoEquipo } from 'src/app/modelo/index.models';
import { EstadoEquipoService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilEstadoEquipoComponent } from '../../filtros/fil-estado-equipo/fil-estado-equipo.component';

@Component({
  selector: 'app-lst-estado-equipo',
  templateUrl: './lst-estado-equipo.component.html',
  styleUrls: ['./lst-estado-equipo.component.scss']
})
export class LstEstadoEquipoComponent implements OnInit {
  @ViewChild(FilEstadoEquipoComponent, { static: true })
  fil!: FilEstadoEquipoComponent;
  @ViewChild('close')
  cerrar!: ElementRef;
  entity = 'Estados';
  entidad = 'principal/estadoequipo';

  items: EstadoEquipo[];
  item: EstadoEquipo;

  procesando!: Boolean;

  constructor(private wsdl: EstadoEquipoService, private router: Router) {
    this.item = new EstadoEquipo();
    this.items = [];
  }

  ngOnInit() {

  }
  /* esto sirve para cuado hay combobox */
  select(item: EstadoEquipo) {
    this.item = item;
  }

  cancel() {
    this.item = new EstadoEquipo();
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

  preDelete(item: EstadoEquipo) {
    this.item = new EstadoEquipo();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text: '¡No podrás recuperar este archivo ' + item.nombre + '!',
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

  doFound(event: EstadoEquipo[]) {
    this.items = event;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl(this.entidad + '/abm/' + id);
  }

}
