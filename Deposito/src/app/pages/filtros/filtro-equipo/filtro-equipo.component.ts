import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Equipo } from 'src/app/modelo/index.models';
import { EquipoService } from 'src/app/servicio/index.service';

@Component({
  selector: 'app-filtro-equipo',
  templateUrl: './filtro-equipo.component.html',
  styleUrls: ['./filtro-equipo.component.scss']
})
export class FiltroEquipoComponent implements OnInit {

  @Output()
  resultado = new EventEmitter<Equipo>();

  criterio!: string;

  items!: Equipo[];
  item!: Equipo;


  @Input()
  set dibujar(item: Equipo){
    this.item = item
    this.items = [];
    this.items.push(this.item);
  }


  constructor(private wsdl: EquipoService) { }

  ngOnInit() {
    this.items = []
  }


  compareFnEq(c1: Equipo, c2: Equipo): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  seleccionar(event: Equipo) {
    this.resultado.emit(event);
  }

  async buscar() {
    const crit = "(c.nroSerie like '%" + this.criterio + "%' or c.tipoEquipo.nombre like '%" + this.criterio + "%') AND c.activo=true";
    let data = await this.wsdl.doCriteria(crit, false, null, " ORDER BY c.modelo.nombre ASC", 1, 100).then();

    const result = JSON.parse(JSON.stringify(data));
    
    if (result.status === 200) {
      this.items = result.data;
      if (this.items.length == 1){
        this.item = this.items[0];
        this.resultado.emit(this.item)
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
