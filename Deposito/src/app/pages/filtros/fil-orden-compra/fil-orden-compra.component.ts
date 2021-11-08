import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrdenCompra } from 'src/app/modelo/index.models';
import { OrdenCompraService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-fil-orden-compra',
  templateUrl: './fil-orden-compra.component.html',
  styleUrls: ['./fil-orden-compra.component.scss']
})
export class FilOrdenCompraComponent implements OnInit {
  @Output()
  filter: EventEmitter<OrdenCompra[]> = new EventEmitter<OrdenCompra[]>();

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
  public limits: Number[] = [5, 10, 25, 50, 100, 150, 200];

  setPage(page: any) {
    this.page = page;
    this.list();
  }

  constructor(private wsdl: OrdenCompraService) {
    this.procesando = false;
    this.limit = 5;
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
        this.limit = 5;
        this.page = 1;
        this.oldSearch = this.search;
      }

      let c = this.search;
      // criteria, one, populate, sort, page, limit
      const crit =
        "(c.proveedor.nombre like '%" +
        this.search +
        "%' or c.ordenCompraNum like '%" +
        this.search +
        "%' or c.nroExpediente like '%" +
        this.search +
        "%') AND c.activo=true";
      let data = await this.wsdl
        .doCriteria(crit, false, null, 'ORDER BY c.nroExpediente ASC', this.page, this.limit)
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
        UturuncoUtils.showToas(result.msg, 'error');
      }
      this.procesando = false;
    } catch (error) {
      this.procesando = false;
      UturuncoUtils.showToas('Error', 'error');
    } finally {
      this.procesando = false;
      this.cargando = false;
    }
  }

}
