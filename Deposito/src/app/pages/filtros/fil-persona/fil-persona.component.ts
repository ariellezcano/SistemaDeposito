import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Persona } from 'src/app/modelo/index.models';
import { PersonaService } from 'src/app/servicio/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-fil-persona',
  templateUrl: './fil-persona.component.html',
  styleUrls: ['./fil-persona.component.scss']
})
export class FilPersonaComponent implements OnInit {

  @Output()
  filter: EventEmitter<Persona[]> = new EventEmitter<Persona[]>();

  proccess: Boolean;
  public search: String | undefined;
  public oldSearch: String | undefined;

  /* Searcheable table Filter */
  public limit: Number;
  public page: Number;
  public nextPage: Number | undefined;
  public prevPage: any;

  public lastPage: Number | undefined;
  public count: Number | undefined;
  public limits: Number[] = [5, 10, 25, 50, 100];

  setPage(page:any) {
    this.page = page;
    this.list();
  }

  constructor(private wsdl: PersonaService) {
    this.proccess = false;
    this.limit = 5;
    this.page = 1;
  }

  ngOnInit() {
    this.list();
  }

  public async list() {
    try {


      this.proccess = true;

      if (this.search === undefined) {
        this.search = '';
      }
      let d = this.oldSearch !== this.search;
      if (d) {
        this.limit = 5;
        this.page = 1;
        this.oldSearch = this.search;
      }

      const crit = "c.norDni like '%" + this.search + "%' AND c.activo=true";
      // const crit = "c.estado.id  not in(" + this.search + ") AND c.activo=true";
      let data = await this.wsdl.doCriteria(crit, false, null, " ORDER BY c.id ASC", this.page, this.limit).then();

      const result = JSON.parse(JSON.stringify(data));
console.log (result)
      if (result.status == 200) {
        this.filter.emit(result.data);

        // this.page = parseInt(result.data.paginate.page);
        // this.lastPage = parseInt(result.data.paginate.lastPage);
        // this.nextPage = parseInt(result.data.paginate.nextPage);
        // this.prevPage = parseInt(result.data.paginate.prevPage);
        // this.count = parseInt(result.data.paginate.count);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        this.filter.emit([]);
       // UturuncoUtils.showToas(result.msg, 'error');
      }
      this.proccess = false;
    } catch (error) {
      this.proccess = false;
    //  UturuncoUtils.showToas("Error", 'error');
    } finally {
      this.proccess = false
    }

  }





}
