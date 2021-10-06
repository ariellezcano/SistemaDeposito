import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/modelo/index.models';
import { ProveedorService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';
import { FilProveedorComponent } from '../../filtros/fil-proveedor/fil-proveedor.component';

@Component({
  selector: 'app-lst-proveedor',
  templateUrl: './lst-proveedor.component.html',
  styleUrls: ['./lst-proveedor.component.scss']
})
export class LstProveedorComponent implements OnInit {

  @ViewChild(FilProveedorComponent, { static: true })
  fil!: FilProveedorComponent;
  @ViewChild('close')
  cerrar!: ElementRef;
  entity = 'Proveedor';
  entidad = 'principal/proveedor';

  items: Proveedor[];
  item: Proveedor;

  procesando!: Boolean;

  constructor(private wsdl: ProveedorService, private router: Router) {
    this.item = new Proveedor();
    this.items = [];
  }

  ngOnInit() {

  }
  /* esto sirve para cuado hay combobox */
  select(item: Proveedor) {
    this.item = item;
  }

  cancel() {
    this.item = new Proveedor();
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

  preDelete(item: Proveedor) {
    this.item = new Proveedor();
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

  doFound(event: Proveedor[]) {
    this.items = event;
  }

  linkear(id?: Number) {
    this.router.navigateByUrl(this.entidad + '/abm/' + id);
  }

}
