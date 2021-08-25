import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { persona } from 'src/app/modelo/persona';
import { PersonaService } from 'src/app/servicio/persona.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilPersonaComponent } from '../../Filtro/fil-persona/fil-persona.component';

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

  items: persona[];
  item: persona;

  proccess: Boolean | undefined;

  constructor(private wsdl: PersonaService, private router: Router) {
    this.item = new persona();
    this.items = [];
  }

  ngOnInit() {

  }

  preNew() {
    this.item = new persona();
  }

  select(item: persona) {
    this.item = item;
  }

  cancel() {
    this.item = new persona();
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

  preDelete(item: persona) {
    this.item = new persona();
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

  doFound(event: persona[]) {
    this.items = event;
    console.log (event)

  }

  


}
