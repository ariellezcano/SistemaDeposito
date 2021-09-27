import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proveedor } from 'src/app/modelo/index.models';
import { ProveedorService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-abm-proveedor',
  templateUrl: './abm-proveedor.component.html',
  styleUrls: ['./abm-proveedor.component.scss'],
})
export class AbmProveedorComponent implements OnInit {
  item!: Proveedor;
  form!: NgForm;

  @Output()
  finalizado = new EventEmitter<Boolean>();

  constructor(private wsdl: ProveedorService) {
    this.item = new Proveedor();
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

  async editar() {

  }

  async crear() {
    this.finalizado.emit(true);
    console.log(this.item);
    // const data = await this.wsdl.doInsert(this.item).then();
    //     const res = JSON.parse(JSON.stringify(data));
    //     if (res.status === 200) {

    //     }
  }
}
