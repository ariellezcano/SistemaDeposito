import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoEquipo } from 'src/app/modelo/index.models';
import { EstadoEquipoService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-abm-estado-equipo',
  templateUrl: './abm-estado-equipo.component.html',
  styleUrls: ['./abm-estado-equipo.component.scss']
})
export class AbmEstadoEquipoComponent implements OnInit {

  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
 
  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
 
  /*
   * control de operaciones a realizar
   */
  /*
    * control de operaciones a realizar
    */
   procesando!: Boolean;
 
  entity = 'principal/estadoequipo'
 
  id!: number;
  item: EstadoEquipo;
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: EstadoEquipoService) {
    this.item = new EstadoEquipo();
  }
 
  ngOnInit() {
    this.procesando = false
    this.id = this.route.snapshot.params.id;
    this.findID();
  }
 
 
  async findID() {
    try {
      if (this.id > 0) {
        let data = await this.wsdl.doFind(this.id).then();
        let res = JSON.parse(JSON.stringify(data));
        if (res.code == 200) {
          this.item = res.status;
        }
      } else {
        this.item = new EstadoEquipo();
      }
 
    } catch (error) {
      UturuncoUtils.showToas("Error inesperado", "error");
 
    }
 
  }
 
  doAction(f: NgForm) {
    /* validar */
    if (this.item.id > 0) {
      this.doEdit();
    } else {
      this.doCreate();
    }
 
  }
 
  async doEdit() {
    try {
 
      this.procesando = true;
      const res = await this.wsdl.doUpdate(this.item.id, this.item).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.status == 200) {
        UturuncoUtils.showToas("Se actualizado correctamente", "success");
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, "error");
      }
    } catch (error: any) {
      UturuncoUtils.showToas("Excepción: " + error.message, "error");
    }
    this.procesando = false;
  }
 
  async doCreate() {
    try {
 
      this.procesando = true;
 
      const res = await this.wsdl.doInsert(this.item).then();
      this.procesando = false
 
      const result = JSON.parse(JSON.stringify(res));
 
      if (result.status == 200) {
        // this.item = result.status;
        UturuncoUtils.showToas("Se creo correctemte", "success");
        this.back() 
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
 
        UturuncoUtils.showToas(result.msg, "error");
      }
    } catch (error: any) {
      UturuncoUtils.showToas("Excepción: " + error.message, "error");
    }
  }
 
  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }

  getProceso(){
    return this.procesando
  }
}
