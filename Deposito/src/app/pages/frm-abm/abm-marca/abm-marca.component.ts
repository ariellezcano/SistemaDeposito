import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Marca } from 'src/app/modelo/index.models';
import { MarcaService } from 'src/app/servicio/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-marca',
  templateUrl: './abm-marca.component.html',
  styleUrls: ['./abm-marca.component.scss']
})
export class AbmMarcaComponent implements OnInit {

  @Output()
  finalizado = new EventEmitter<Marca>();
  
  item!: Marca;
  form!: NgForm;

  constructor(private wsdl: MarcaService) { 
    this.item = new Marca();
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
  this.item.activo = true;
  if (this.item.nombre.length > 0){
    this.finalizado.emit(this.item);
  
  }else{
    Swal.fire("Rellene el campo obligatorio")
  }
  // const data = await this.wsdl.doInsert(this.item).then();
  //     const res = JSON.parse(JSON.stringify(data));
  //     if (res.status === 200) {
        
  //     }
}

}
