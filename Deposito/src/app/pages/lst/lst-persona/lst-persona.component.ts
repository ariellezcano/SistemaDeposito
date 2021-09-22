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

  entity = 'persona';

  items: Persona[];
  item: Persona;

  proccess: Boolean | undefined;

  constructor(private wsdl: PersonaService, private router: Router) {
    this.item = new Persona();
    this.items = [];
  }

  ngOnInit() {

  }

  preNew() {
    this.item = new Persona();
  }

  select(item: Persona) {
    this.item = item;
  }

  cancel() {
    this.item = new Persona();
    this.fil.list();
  }

  async setResultCancel(event: boolean) {
 //   UturuncoUtils.showToas('Operación cancelada', 'info');
  }

  setResult(event: any) {
    this.cancel();
  }

  evento(event: Boolean) {
   alert('Se creo correctamente');
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
    }).then((result: any) => {
      if (result.value) {
       // this.delete();
       
      } else if (result.dismiss === Swal.DismissReason.cancel) {
       // UturuncoUtils.showToas('Tu archivo esta seguro :)', 'warning');
      }
    });
  }

  async delete() {
    try {
      this.proccess = true;
      const res = await this.wsdl.doDelete(this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      console.log(result);
      if (result.code == 200) {
      //  UturuncoUtils.showToas(result.msg, 'success');
        this.cancel();
      } else {
      //  UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error) {
     // UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.proccess = false;
  }

  doFound(event: Persona[]) {
    this.items = event;
    console.log (event)

  }

  


}
