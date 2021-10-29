import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntregaEquipoUnidades } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-historial-equipo',
  templateUrl: './fil-historial-equipo.component.html',
  styleUrls: ['./fil-historial-equipo.component.scss']
})
export class FilHistorialEquipoComponent implements OnInit {
  @Output()
  filter: EventEmitter<EntregaEquipoUnidades[]> = new EventEmitter<EntregaEquipoUnidades[]>();
  @Input()
  procesando: boolean = true;
  proccess: Boolean;
  public search: String = '';

  cargando: Boolean = false;
  /* Searcheable table Filter */

  items: EntregaEquipoUnidades[];
  limit: number;
  page: number;

  total: number = 0;
  primero: number = 1;
  final: number = 0;
  siguiente: number = 0;
  anterior: number = 0;
  actual: number = 0;

  constructor(private wsdl: EntregaEquipoUnidadService) {
    this.proccess = false;
    this.limit = 25;
    this.page = 1;
    this.items = [];
    this.search = '';
  }

  ngOnInit() {
    //this.list();
  }

  async list() {
    if (this.search === '' || this.search === undefined) {
      this.items = [];
      this.filter.emit(this.items);
    } else {
      try {
        console.log('criterio de busqueda search', this.search);
        //this.item.activo = true;
        this.cargando = true;
        this.procesando = true;
        const crit =
          "(c.equipo.nroSerie = '" +
          this.search +
          "' or c.unidad.nombre like '%" +
          this.search +
          "')AND c.activo=true";

        let data = await this.wsdl
          .doCriteria(
            crit,
            false,
            null,
            ' ORDER BY c.id ASC',
            this.page,
            this.limit
          )
          .then();
        console.log(data);

        const result = JSON.parse(JSON.stringify(data));

        if (result.status === 200) {
          this.items = result.data;
          console.log(this.items);
          this.total = result.paginate.count;
          this.primero = 1;
          this.final = result.paginate.lastPage;
          this.siguiente = result.paginate.nextPage;
          this.anterior = result.paginate.prevPage;
          this.actual = result.paginate.page;

          this.filter.emit(this.items);

          this.cargando = false;
          this.procesando = false;
        } else if (result.status === 666) {
          // logout app o refresh token
        } else {
          UturuncoUtils.showToas(result.msg, 'error');
          this.filter.emit([]);
        }
      } catch (error: any) {
        UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
        // alert("catch")
      } finally {
        this.cargando = false;
        this.procesando = false;
      }
    }
  }

  paginaSelec(event: any) {
    console.log(event);
    this.page = event;
    this.list();
  }

}
