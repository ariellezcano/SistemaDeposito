import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from 'src/app/modelo/index.models';
import { EquipoService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilEquipoComponent } from '../../filtros/fil-equipo/fil-equipo.component';

@Component({
  selector: 'app-lst-equipo',
  templateUrl: './lst-equipo.component.html',
  styleUrls: ['./lst-equipo.component.scss']
})
export class LstEquipoComponent implements OnInit {

  public load: boolean;
  @ViewChild(FilEquipoComponent, { static: true })
  fil!: FilEquipoComponent;
  @ViewChild('close')
  cerrar!: ElementRef;
  entity = 'Equipos';
  entidad = 'principal/equipo';

  items: Equipo[];
  item: Equipo;

  procesando!: Boolean;

  constructor(private wsdl: EquipoService, private router: Router) {
    this.load = false;
    this.item = new Equipo();
    this.items = [];
  }

  ngOnInit() {

  }
  /* esto sirve para cuado hay combobox */
  select(item: Equipo) {
    this.item = item;
  }

  cancel() {
    this.item = new Equipo();
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

  preDelete(item: Equipo) {
    this.item = new Equipo();
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

  doFound(event: Equipo[]) {
    this.items = event;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl(this.entidad + '/abm/' + id);
  }
}
