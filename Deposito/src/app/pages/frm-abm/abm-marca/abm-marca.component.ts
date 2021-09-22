import { Component, OnInit } from '@angular/core';
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

  item!: Marca;

  constructor(private wsdl: MarcaService) { }

  ngOnInit(): void {
  }

  accion(f:NgForm){
    if (this.item.id>0){
      this.editar();
    }else{
      this.crear();
    }
  }

async editar(){
  

}
async crear(){
  const data = await this.wsdl.doInsert(this.item).then();
      const res = JSON.parse(JSON.stringify(data));
      if (res.status === 200) {
        
      }
}

}
