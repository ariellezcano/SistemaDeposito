import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from 'src/app/modelo/index.models';
import { PersonaService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-abm-persona',
  templateUrl: './abm-persona.component.html',
  styleUrls: ['./abm-persona.component.scss'],
})
export class AbmPersonaComponent implements OnInit {
  item!: Persona;

  constructor(private wsdl: PersonaService) {}

  ngOnInit(): void {}

  accion(f: NgForm) {
    if (this.item.id > 0) {
      this.editar();
    } else {
      this.crear();
    }
  }
  async crear() {
    try {
      //avisar al usuario que se esta haciendo algo
      const data = await this.wsdl.doInsert(this.item).then();
      const res = JSON.parse(JSON.stringify(data));
      if (res.status == 200) {
      }
    } catch (error) {
    } finally {
    }

    throw new Error('Method not implemented.');
  }
  editar() {
    throw new Error('Method not implemented.');
  }
}