import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatoPolicial, Persona } from 'src/app/modelo/index.models';
import {
  DatoPolicialService,
  PersonaService,
} from 'src/app/servicio/index.service';

@Component({
  selector: 'app-fil-persona',
  templateUrl: './fil-persona.component.html',
  styleUrls: ['./fil-persona.component.scss'],
})
export class FilPersonaComponent implements OnInit {
  @Output()
  resultado = new EventEmitter<DatoPolicial>();
  nombre = '';

  @Input()
  set dibujar(item: Persona) {
    this.buscarDp(item.id);
    //  this.nombre = item.norDni+" - "+item.apellido+", "+ item.nombre;
  }

  criterio!: string;

  items!: DatoPolicial[];
  item!: DatoPolicial;

  constructor(private wsdl: DatoPolicialService) {}

  ngOnInit() {
    this.items = [];
  }

  compareFnPer(c1: DatoPolicial, c2: DatoPolicial): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  seleccionarPer(event: DatoPolicial) {
    this.resultado.emit(event);
  }

  async buscar() {
    const crit =
      "(c.persona.norDni like '%" +
      this.criterio +
      "%' or c.credencialNro like '%" +
      this.criterio +
      "%' or CONCAT(c.persona.apellido,' ', c.persona.nombre) like '%" +
      this.criterio +
      "%') AND c.activo=true";
    console.log('persona enviada', crit);
    let data = await this.wsdl
      .doCriteria(crit, false, null, 'ORDER BY c.persona.nombre ASC', 1, 100)
      .then();
    console.log('persona encontrada', data);
    const result = JSON.parse(JSON.stringify(data));

    if (result.status === 200) {
      this.items = result.data;
      if (this.items.length == 1) {
        this.item = this.items[0];
        this.resultado.emit(this.item);
      }
    } else if (result.status === 666) {
      // logout app o refresh token
      this.items = [];
    } else {
      //  this.persona = new Persona();
      this.items = [];
    }
    //  this.resultado.emit(this.items);
  }

  //datoPolicial
  async buscarDp(id: Number) {
    const crit = '(c.persona.id = ' + id + ') AND c.activo=true';
    let data = await this.wsdl
      .doCriteria(crit, false, null, 'ORDER BY c.persona.nombre ASC', 1, 100)
      .then();
    const result = JSON.parse(JSON.stringify(data));

    if (result.status === 200) {
      this.items = result.data;
      if (this.items.length == 1) {
        this.item = this.items[0];
      }
    } else if (result.status === 666) {
      // logout app o refresh token
      this.items = [];
    } else {
      //  this.persona = new Persona();
      this.items = [];
    }
    //  this.resultado.emit(this.items);
  }
}
