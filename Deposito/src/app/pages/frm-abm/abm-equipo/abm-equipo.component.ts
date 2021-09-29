import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Equipo } from 'src/app/modelo/index.models';
import { EquipoService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-abm-equipo',
  templateUrl: './abm-equipo.component.html',
  styleUrls: ['./abm-equipo.component.scss']
})
export class AbmEquipoComponent implements OnInit {

  @Output()
  finalizado = new EventEmitter<Boolean>();
  
  item!: Equipo;
  form!: NgForm;

  constructor(private wsdl: EquipoService) { 
    this.item = new Equipo();
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
