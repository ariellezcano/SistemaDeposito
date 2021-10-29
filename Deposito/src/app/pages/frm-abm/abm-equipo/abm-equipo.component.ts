import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Equipo, EstadoEquipo, Modelo, Proveedor, TipoEquipo } from 'src/app/modelo/index.models';
import { EquipoService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-equipo',
  templateUrl: './abm-equipo.component.html',
  styleUrls: ['./abm-equipo.component.scss']
})
export class AbmEquipoComponent implements OnInit {

  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
 
  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  /*
    * control de operaciones a realizar
    */
   procesando!: Boolean;
 
  entity = 'principal/equipo'
 
  id!: number;
  item: Equipo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: EquipoService) {
    this.item = new Equipo();
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
        if (res.status == 200) {
          this.item = res.data;
          this.item.fechaAlta = moment(this.item.fechaAlta).format('YYYY-MM-DD');
        }
      } else {
        this.item = new Equipo();
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
      const res = await this.wsdl.doUpdate(this.item, this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.status == 200) {
        UturuncoUtils.showToas("Se actualizado correctamente", "success");
        this.back();
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
      this.item.unidad.id = 1;
      console.log("datos",this.item)
       const res = await this.wsdl.doInsert(this.item).then();
       this.procesando = false
       console.log("datos",res)
       const result = JSON.parse(JSON.stringify(res));
 
      if (result.status == 200) {
          //this.item = result.status;
         UturuncoUtils.showToas("Se creo correctamente", "success");
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

  
  seleccionProveedor(event: Proveedor){
    this.item.proveedor = event;
    console.log("soy el papa" , this.item.proveedor)
  }

  seleccionestado(event: EstadoEquipo){
    this.item.estado = event;
    console.log("soy el papa" , this.item.estado)
  }

  seleccionmodelo(event: Modelo){
    this.item.modelo = event;
    console.log("soy el papa" , this.item.modelo)
  }

  selecciontipoEquipo(event: TipoEquipo){
    this.item.tipoEquipo = event;
    console.log("soy el papa" , this.item.tipoEquipo)
  }
  getProceso(){
    return this.procesando
  }
 
//control de búsqueda
  async buscar(op: any) {
    let crit = "";
    
    switch (op) {
      case 1:
        {
          crit = "c.nroSerie like '" + this.item.nroSerie + "' AND c.activo=true";
        }
        break;
      case 2:
        {
          crit = "c.idPolicial like '" + this.item.idPolicial + "' AND c.activo=true";
        }
        break;
      default: {
      }
    }

    let data = await this.wsdl
      .doCriteria(crit, true, null, "ORDER BY c.nroSerie ASC", 1, 1)
      .then();
    const result = JSON.parse(JSON.stringify(data));

    if (result.status === 200) {
      Swal.fire({
        title: "Ya está asignado dentro de la Base de datos",
        text: "¡MODIFIQUE EL DATO INGRESADO!",
        icon: "warning",
      });
    } else if (result.status === 666) {
    } else {
      Swal.fire({
        title: "NO ESTA ASIGNADO",
        text: "Puede seguir agregando",
        icon: "success",
      });
      
    }
  }



}