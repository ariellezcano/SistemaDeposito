import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import {
  DatoPolicial,
  EntregaEquipoUnidades,
  Equipo,
  Persona,
  Unidad,
  Vehiculo,
} from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-entrega-equipo-unidad',
  templateUrl: './abm-entrega-equipo-unidad.component.html',
  styleUrls: ['./abm-entrega-equipo-unidad.component.scss'],
})
export class AbmEntregaEquipoUnidadComponent implements OnInit {
  unidades!: Unidad[];

  vehiculo!: Vehiculo[];
  public items!: Vehiculo[];

  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  

  
  /*
   * control de operaciones a realizar
   */
  procesando!: Boolean;

  visible = false;

  entity = 'principal/entregaEquipoUnidad';

  id!: number;
  item: EntregaEquipoUnidades;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: EntregaEquipoUnidadService
  ) {
    this.item = new EntregaEquipoUnidades();
  }

  ngOnInit() {
    this.procesando = false;
    this.id = this.route.snapshot.params.id;
    this.findID();
  }

  async findID() {
    try {
      if (this.id > 0) {
        let data = await this.wsdl.doFind(this.id).then();
        let res = JSON.parse(JSON.stringify(data));
        if (res.status == 200) {
          this.item = res.data;
      
          this.item.fechaEntrega = moment(this.item.fechaEntrega).format(
            'YYYY-MM-DD'
          );
          if(this.item.movilPol != undefined){
            this.visible = true;
          }else{
            this.visible = false;
          }
        }
      } else {
        this.item = new EntregaEquipoUnidades();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
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
      if(this.visible){
        this.item.movilPol = this.item.movilPol.id;
      }
      const res = await this.wsdl.doUpdate(this.item, this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.status == 200) {
        UturuncoUtils.showToas('Se actualizó correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.procesando = false;
  }

  async doCreate() {
    try {
      this.item.entrega.id = JSON.parse(
        '' + UturuncoUtils.getSession('personal')
      ).id;
      this.procesando = true;
      if(this.visible){
        this.item.movilPol = this.item.movilPol.id;
      }
      console.log("entregas creadas:", this.item);
      const res = await this.wsdl.doInsert(this.item).then();
      
      this.procesando = false;
        
      const result = JSON.parse(JSON.stringify(res));

      if (result.status == 200) {
        // this.item = result.status;
        UturuncoUtils.showToas('Se creó correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
  }

  back() {
    this.router.navigateByUrl(this.entity.toLowerCase());
  }

  unidadesEncontradas(event: Unidad) {
    if (event.id !== undefined) {
      this.item.unidad = event;
    } else {
      Swal.fire('Seleccione unidad');
    }
  }

  equiposEncontrados(event: Equipo) {
    if (event.id !== undefined) {
      this.item.equipo = event;
    } else {
      Swal.fire('Seleccione Equipo');
    }
  }

  personasEncontrados(event: DatoPolicial) {
    if (event.id !== undefined) {
      this.item.recibe = event.persona;
    } else {
      Swal.fire('Seleccione Persona');
    }
  }

  compareFnVe(c1: Vehiculo, c2: Vehiculo): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  vehiculoE(event: Vehiculo) {
      console.log("evento movil",event)
        this.item.movilPol = event;
  }
  

  
  getProceso() {
    return this.procesando;
  }




}
