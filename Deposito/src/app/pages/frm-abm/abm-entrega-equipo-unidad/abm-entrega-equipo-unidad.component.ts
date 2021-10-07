import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntregaEquipoUnidades, Equipo, Unidad } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-entrega-equipo-unidad',
  templateUrl: './abm-entrega-equipo-unidad.component.html',
  styleUrls: ['./abm-entrega-equipo-unidad.component.scss']
})
export class AbmEntregaEquipoUnidadComponent implements OnInit {
  unidades!: Unidad[];

 
  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
 
  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  /*
    * control de operaciones a realizar
    */
   procesando!: Boolean;
 
  entity = 'principal/entregaEquipoUnidad';
 
  id!: number;
  item: EntregaEquipoUnidades;
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: EntregaEquipoUnidadService) {
    this.item = new EntregaEquipoUnidades();
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
        this.item = new EntregaEquipoUnidades();
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
      this.item.entrega.id = JSON.parse( ""+UturuncoUtils.getSession("personal")).id
      this.item.recibe.id = 1500;
      this.procesando = true;
      this.item.activo = true;
      this.item.unidad.id = 1;
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


  unidadesEncontradas(event: Unidad) {
  if (event.id !== undefined){
    this.item.unidad =event;
  }
  else{
    Swal.fire('Seleccione unidad')
  }
  }

  equiposEncontrados(event: Equipo) {
    if (event.id !== undefined){
      this.item.equipo =event;
    }
    else{
      Swal.fire('Seleccione Equipo')
    }
    }

  
  // seleccionProveedor(event: Proveedor){
  //   this.item.proveedor = event;
  //   console.log("soy el papa" , this.item.proveedor)
  // }

  // seleccionestado(event: EstadoEquipo){
  //   this.item.estado = event;
  //   console.log("soy el papa" , this.item.estado)
  // }

  // seleccionmodelo(event: Modelo){
  //   this.item.modelo = event;
  //   console.log("soy el papa" , this.item.modelo)
  // }

  // selecciontipoEquipo(event: TipoEquipo){
  //   this.item.tipoEquipo = event;
  //   console.log("soy el papa" , this.item.tipoEquipo)
  // }
  getProceso(){
    return this.procesando
  }
 

}
