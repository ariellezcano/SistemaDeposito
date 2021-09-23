import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Marca, Modelo } from 'src/app/modelo/index.models';

@Component({
  selector: 'app-abm-modelo',
  templateUrl: './abm-modelo.component.html',
  styleUrls: ['./abm-modelo.component.scss']
})
export class AbmModeloComponent implements OnInit {

  @Output()
  finalizado = new EventEmitter<Boolean>();
  
  item!: Modelo;
  form!: NgForm;


  constructor() { }

  ngOnInit(): void {
  }

  accion(f:NgForm){
    if (f.invalid) {
      this.form.ngSubmit;
      //alert("asa");
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
seleccionoMarca(event: Marca){
  this.item.marca = event;
  console.log("soy el papa" , this.item.marca)
}



}
