import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Unidad } from 'src/app/modelo/index.models';
import { UnidadService } from 'src/app/servicio/index.service';


@Component({
  selector: 'app-filtrounidad',
  templateUrl: './filtrounidad.component.html',
  styleUrls: ['./filtrounidad.component.scss']
})

export class FiltrounidadComponent implements OnInit {
  @Output()
  resultado = new EventEmitter<Unidad>();

  criterio!: string;

  items!: Unidad[];
  item!: Unidad;

  constructor(private wsdl: UnidadService) { }

  ngOnInit() {
  }

  compareFnUni(c1: Unidad, c2: Unidad): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  seleccionaruni(event: Unidad) {
    this.resultado.emit(event);
  }

  async buscarUnidad() {
    const crit = "(c.nombre like '%" + this.criterio + "%') AND c.activo=true";
    let data = await this.wsdl.doCriteria(crit, false, null, " ORDER BY c.nombre ASC", 1, 100).then();

    const result = JSON.parse(JSON.stringify(data));
    // alert(JSON.stringify(data))
    if (result.status === 200) {
      this.items = result.data;
      

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
