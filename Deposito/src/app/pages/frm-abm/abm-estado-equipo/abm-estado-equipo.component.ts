import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EstadoEquipo } from 'src/app/modelo/index.models';
import { EstadoEquipoService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-abm-estado-equipo',
  templateUrl: './abm-estado-equipo.component.html',
  styleUrls: ['./abm-estado-equipo.component.scss']
})
export class AbmEstadoEquipoComponent implements OnInit {

  @Output()
  finalizado = new EventEmitter<Boolean>();
  
  item!: EstadoEquipo;
  form!: NgForm;

  constructor(private wsdl: EstadoEquipoService) { 
    this.item = new EstadoEquipo();
  }

  
  ngOnInit(): void {
  }

  accion(f:NgForm){
    if (f.invalid) {
      this.form.ngSubmit;
      
      return;
    }
    if (this.item.id > 0){
      this.editar();
    }else{
      this.crear();
    }
  }

async editar(){
  

}
async crear(){
  this.finalizado.emit(true);
  console.log(this.item)
  // const data = await this.wsdl.doInsert(this.item).then();
  //     const res = JSON.parse(JSON.stringify(data));
  //     if (res.status === 200) {
        
  //     }
}

}
