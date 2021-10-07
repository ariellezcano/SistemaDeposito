import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EntregaEquipoUnidades } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilEntregaEquipoUnidadComponent } from '../../filtros/fil-entrega-equipo-unidad/fil-entrega-equipo-unidad.component';

@Component({
  selector: 'app-lst-entrega-equipo-unidad',
  templateUrl: './lst-entrega-equipo-unidad.component.html',
  styleUrls: ['./lst-entrega-equipo-unidad.component.scss']
})
export class LstEntregaEquipoUnidadComponent implements OnInit {

  @ViewChild(FilEntregaEquipoUnidadComponent, { static: true })
  fil!: FilEntregaEquipoUnidadComponent;
  @ViewChild('close')
  cerrar!: ElementRef;
  entity = 'Entrega de equipos';
  entidad = 'principal/entregaEquipoUnidad';

  items: EntregaEquipoUnidades[];
  item: EntregaEquipoUnidades;

  procesando!: Boolean;

  constructor(private wsdl: EntregaEquipoUnidadService , private router: Router) {
    this.item = new EntregaEquipoUnidades();
    this.items = [];
  }

  ngOnInit() {

  }
  /* esto sirve para cuado hay combobox */
  select(item: EntregaEquipoUnidades) {
    this.item = item;
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
      text: '¡No podrás recuperar este archivo ' + item.equipo.tipoEquipo.nombre + '!',
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

  linkear(id?: Number) {
    this.router.navigateByUrl(this.entidad.toLowerCase() + '/abm/' + id);
  }

}
