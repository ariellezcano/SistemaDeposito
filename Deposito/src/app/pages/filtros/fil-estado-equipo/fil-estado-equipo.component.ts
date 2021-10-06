import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EstadoEquipo } from 'src/app/modelo/index.models';
import { EstadoEquipoService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-fil-estado-equipo',
  templateUrl: './fil-estado-equipo.component.html',
  styleUrls: ['./fil-estado-equipo.component.scss']
})
export class FilEstadoEquipoComponent implements OnInit {

  @Output()
  filter: EventEmitter<EstadoEquipo[]> = new EventEmitter<EstadoEquipo[]>();

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
  public limits: Number[] = [5, 10, 25, 50, 100];

  setPage(page: any) {
    this.page = page;
    this.list();
  }

  constructor(private wsdl: EstadoEquipoService) {
    this.procesando = false;
    this.limit = 5;
    this.page = 1;
  }

  ngOnInit() {
    this.list();
  }

  public async list() {
    try {

      this.procesando = true;
      if (this.search === undefined) {
        this.search = '';
      }
      let d = this.oldSearch !== this.search;
      if (d) {
        this.limit = 5;
        this.page = 1;
        this.oldSearch = this.search;
      }

      let c = this.search;
      let data = await this.wsdl.getCriteria(c, this.page, this.limit).then();

      const result = JSON.parse(JSON.stringify(data));

      if (result.code == 200) {
        this.filter.emit(result.data.docs);

        this.page = parseInt(result.data.paginate.page);
        this.lastPage = parseInt(result.data.paginate.lastPage);
        this.nextPage = parseInt(result.data.paginate.nextPage);
        this.prevPage = parseInt(result.data.paginate.prevPage);
        this.count = parseInt(result.data.paginate.count);
      } else if (result.code == 666) {
        // logout app o refresh token
      } else {
        this.filter.emit([]);
        console.log(result.msg)
        UturuncoUtils.showToas(result.msg, 'error');
      }
      this.procesando = false;
    } catch (error) {
      this.procesando = false;
      UturuncoUtils.showToas("Error", 'error');
    } finally {
      this.procesando = false
    }

  }


}
