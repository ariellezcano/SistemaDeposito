import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/modelo/index.models';
import { PersonaService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-abm-persona',
  templateUrl: './abm-persona.component.html',
  styleUrls: ['./abm-persona.component.scss'],
})
export class AbmPersonaComponent implements OnInit {
  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();
 
  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  /*
    * control de operaciones a realizar
    */
   procesando!: Boolean;
 
  entity = 'principal/persona'
 
  id!: number;
  item: Persona;
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PersonaService) {
    this.item = new Persona();
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
          this.item = res.data;
        }
      } else {
        this.item = new Persona();
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
      if (result.code == 200) {
        UturuncoUtils.showToas("Se actualizado correctamente", "success");
        this.finalizado.emit(true);
      } else if (result.code == 666) {
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
 
      if (result.code == 200) {
        // this.item = result.data;
        UturuncoUtils.showToas("Se creo correctemte", "success");
 
        this.finalizado.emit(true);
      } else if (result.code == 666) {
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
 }
