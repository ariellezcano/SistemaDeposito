import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { OrdenCompra, Proveedor } from 'src/app/modelo/index.models';
import { OrdenCompraService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-orden-compra',
  templateUrl: './abm-orden-compra.component.html',
  styleUrls: ['./abm-orden-compra.component.scss']
})
export class AbmOrdenCompraComponent implements OnInit {

  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
 
  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  /*
    * control de operaciones a realizar
    */
   procesando!: Boolean;
 
  entity = 'principal/ordenCompra'
 
  id!: number;
  item: OrdenCompra;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: OrdenCompraService) {
    this.item = new OrdenCompra();
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
          this.item.fechaCompra = moment(this.item.fechaCompra).format('YYYY-MM-DD');
          if (this.item.fechaPagoCompra != undefined) {
            this.item.fechaPagoCompra = moment(this.item.fechaPagoCompra).format('YYYY-MM-DD');
          }
        }
      } else {
        this.item = new OrdenCompra();
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
  getProceso(){
    return this.procesando
  }
 
//control de búsqueda
  async buscar(op: any) {
    let crit = "";
    
    switch (op) {
      case 1:
        {
          crit = "c.nroExpte like '" + this.item.nroExpte + "' AND c.activo=true";
        }
        break;
      case 2:
        {
          crit = "c.nroOrdenCompra like '" + this.item.nroOrdenCompra + "' AND c.activo=true";
        }
        break;
      default: {
      }
    }

    let data = await this.wsdl
      .doCriteria(crit, true, null, "ORDER BY c.proveedor.nombre ASC", 1, 1)
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
