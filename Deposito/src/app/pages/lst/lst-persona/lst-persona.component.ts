import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/modelo/index.models';
import { PersonaService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilPersonaComponent } from '../../filtros/fil-persona/fil-persona.component';

@Component({
  selector: 'app-lst-persona',
  templateUrl: './lst-persona.component.html',
  styleUrls: ['./lst-persona.component.scss']
})
export class LstPersonaComponent implements OnInit {

  @ViewChild(FilPersonaComponent, { static: true })
  fil!: FilPersonaComponent;
  @ViewChild('close')
  cerrar!: ElementRef;
  entity = 'Personas';
  entidad = 'principal/persona';

  items: Persona[];
  item: Persona;

  procesando!: Boolean;

  constructor(private wsdl: PersonaService, private router: Router) {
    this.item = new Persona();
    this.items = [];
  }

  ngOnInit() {

  }
  /* esto sirve para cuado hay combobox */
  select(item: Persona) {
    this.item = item;
  }

  cancel() {
    this.item = new Persona();
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

  preDelete(item: Persona) {
    this.item = new Persona();
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

  doFound(event: Persona[]) {
    this.items = event;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl(this.entidad + '/abm/' + id);
  }  


}
