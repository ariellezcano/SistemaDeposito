import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TipoEquipo, Modelo } from 'src/app/modelo/index.models';
import { TipoEquipamientoService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-abm-tipo-equipamiento',
  templateUrl: './abm-tipo-equipamiento.component.html',
  styleUrls: ['./abm-tipo-equipamiento.component.scss'],
})
export class AbmTipoEquipamientoComponent implements OnInit {
  @Output()
  finalizado = new EventEmitter<Boolean>();

  item!: TipoEquipo;
  form!: NgForm;

  constructor(private wsdl: TipoEquipamientoService) {
    this.item = new TipoEquipo();
  }

  ngOnInit(): void {}

  accion(f: NgForm) {
    if (f.invalid) {
      this.form.ngSubmit;

      return;
    }
    if (this.item.id > 0) {
      this.editar();
    } else {
      this.crear();
    }
  }

  async editar() {}
  async crear() {
    this.finalizado.emit(true);
    console.log(this.item);
    // const data = await this.wsdl.doInsert(this.item).then();
    //     const res = JSON.parse(JSON.stringify(data));
    //     if (res.status === 200) {

    //     }
  }

  // seleccionoMarca(event: Modelo) {
  //   this.item.modelo = event;
  //   console.log('soy el papa', this.item.modelo);
  // }
}
