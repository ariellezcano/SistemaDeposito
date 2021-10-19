import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EntregaEquipoUnidades } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-fil-entrega-equipo-unidad',
  templateUrl: './fil-entrega-equipo-unidad.component.html',
  styleUrls: ['./fil-entrega-equipo-unidad.component.scss']
})
export class FilEntregaEquipoUnidadComponent implements OnInit {

  @Output()
  filter: EventEmitter<EntregaEquipoUnidades[]> = new EventEmitter<EntregaEquipoUnidades[]>();
  
  cargando: Boolean = false;
  procesando: Boolean;
  public search!: String;
  public oldSearch!: String;

  /* Searcheable table Filter */
  public limit: Number;
  public page: Number;
  public nextPage!: Number;
  public prevPage: any;

  public lastPage!: Number;
  public count!: Number;
  public limits: Number[] = [10, 25, 50, 100, 150, 200];

  setPage(page: any) {
    this.page = page;
    this.list();
  }

  constructor(private wsdl: EntregaEquipoUnidadService) {
    this.procesando = false;
    this.limit = 10;
    this.page = 1;
  }

  ngOnInit() {
    this.list();
  }

  public async list() {
    try {
      this.cargando = true;
      this.procesando = true;
      if (this.search === undefined) {
        this.search = '';
      }
      let d = this.oldSearch !== this.search;
      if (d) {
        this.limit = 10;
        this.page = 1;
        this.oldSearch = this.search;
      }

      let c = this.search;
      // criteria, one, populate, sort, page, limit
      const crit =
        "(c.unidad.nombre like '%" +
        this.search +
        "%') AND c.activo=true";
      let data = await this.wsdl
        .doCriteria(crit, false, null, 'ORDER BY c.unidad.nombre ASC', this.page, this.limit)
        .then();

      const result = JSON.parse(JSON.stringify(data));
      console.log("resultado de la busqueda", result)
      if (result.status == 200) {
        this.filter.emit(result.data);

        this.page = parseInt(result.paginate.page);
        this.lastPage = parseInt(result.paginate.lastPage);
        this.nextPage = parseInt(result.paginate.nextPage);
        this.prevPage = parseInt(result.paginate.prevPage);
        this.count = parseInt(result.paginate.count);
        this.cargando = false;
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        this.filter.emit([]);
        console.log(result.msg);
        UturuncoUtils.showToas(result.msg, 'error');
      }
      this.procesando = false;
    } catch (error) {
      this.procesando = false;
      UturuncoUtils.showToas('Error', 'error');
    } finally {
      this.procesando = false;
    }
  }

}
