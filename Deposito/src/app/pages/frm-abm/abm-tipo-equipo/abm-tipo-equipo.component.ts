import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEquipo } from 'src/app/modelo/index.models';
import { TipoEquipoService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-abm-tipo-equipo',
  templateUrl: './abm-tipo-equipo.component.html',
  styleUrls: ['./abm-tipo-equipo.component.scss']
})
export class AbmTipoEquipoComponent implements OnInit {

/*
    * Varaiables de control para comportamientos del componente
    */
@Output()
finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

@Output()
cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
/*
  * control de operaciones a realizar
  */
 procesando!: Boolean;

entity = 'principal/tipoEquipo'

id!: number;
item: TipoEquipo;

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private wsdl: TipoEquipoService) {
  this.item = new TipoEquipo();
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
      this.item = new TipoEquipo();
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
    //this.item.activo=true;
    console.log("respuesta capturada", this.item)
    const res = await this.wsdl.doInsert(this.item).then();
    console.log("respuesta",res)
    const result = JSON.parse(JSON.stringify(res));

    if (result.status == 200) {
      // this.item = result.status;
      UturuncoUtils.showToas('Se creo correctamente', 'success');
      this.back();
      this.finalizado.emit(true);
    } else if (result.status == 666) {
      // logout app o refresh token
    } else {
      UturuncoUtils.showToas(result.msg, 'error');
    }
  } catch (error: any) {
    UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
  } finally {
    this.procesando = false;
  }
}

back() {
  this.router.navigateByUrl(this.entity);
}

getProceso(){
  return this.procesando
}

}
