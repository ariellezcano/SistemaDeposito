import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntregaEquipoUnidades, Unidad } from 'src/app/modelo/index.models';
import { EntregaEquipoUnidadService } from 'src/app/servicio/componentes/entrega-equipo-unidad.service';

@Component({
  selector: 'app-fil-asignacion-avanzado',
  templateUrl: './fil-asignacion-avanzado.component.html',
  styleUrls: ['./fil-asignacion-avanzado.component.scss'],
})
export class FilAsignacionAvanzadoComponent implements OnInit {
  [x: string]: any;
  //ṕaginado
  page: number = 1;
  search: String = '';
  total!: number;
  primero!: number;
  final!: number;
  siguiente!: number;
  anterior!: number;
  actual!: number;
  public limits: number[] = [10, 50, 100, 250, 500, 1000];

  //

  //
  thfiltradounidad!: Boolean;
  nombreunidad!: string;
  thfiltrregional!: boolean;
  nombreregional!: string;

  @Input()
  unidades!: Unidad[];
  item!: EntregaEquipoUnidades;
  items!: EntregaEquipoUnidades[];

  @Output()
  resultado: EventEmitter<EntregaEquipoUnidades[]> = new EventEmitter<
    EntregaEquipoUnidades[]
  >();
  //resultado = new EventEmitter<Asignacion[]>();

  checkUnidad!: boolean;
  cajaunidad!: string;
  checkmarca!: boolean;
  cajamarca!: string;
  checkmodelo!: boolean;
  cajamodelo!: string;
  checkano!: boolean;
  cajaano1!: Date;
  cajaano2!: Date;
  checktipoEquipo!: boolean;
  cajatipoEquipo!: string;

  constructor(private wsdl: EntregaEquipoUnidadService) {
    this.checkUnidad = false;
    this.checkano = false;
    this.checkmarca = false;
    this.checkmodelo = false;
    this.checktipoEquipo = false;
  }

  ngOnInit() {
    this.limit = 10;
    this.page = 1;
    this.filtradomultiple();
  }

  //Busqueda avanzada
  async filtradomultiple() {
    //unidad
    if (
      //Creado
      !this.checkUnidad &&
      !this.checkano &&
      !this.checkmodelo &&
      !this.checkmarca &&
      !this.checktipoEquipo
    ) {
      let sql = 'c.activo = true';
      let data = await this.wsdl
        .doCriteria(
          sql,
          false,
          null,
          'ORDER BY c.fechaEntrega Desc',
          this.page,
          this.limit
        )
        .then();
      console.log(data);
      const result = JSON.parse(JSON.stringify(data));
      // Swal.fire(JSON.stringify(date))
      // console.log(JSON.stringify(date))
      //this.resultado.emit(this.items);

      if (result.status === 200) {
        this.items = result.data;
        console.log('consulta avanzada', this.items);
        this.total = result.paginate.count;
        this.primero = 1;
        this.final = result.paginate.lastPage;
        this.siguiente = result.paginate.nextPage;
        this.anterior = result.paginate.prevPage;
        this.actual = result.paginate.page;
      } else if (result.status === 666) {
        // logout app o refresh token
        this.items = [];
      } else {
        //  this.persona = new Persona();
        this.items = [];
      }
      this.resultado.emit(this.items);
      //Creado
    } else {
      //funcional
      let ct = '';
      if (this.checkUnidad) {
        let sql = "c.unidad.nombre like '%" + this.cajaunidad + "%' ";
        console.log('sql unidad =', sql);
        if (ct.length > 0) {
          console.log('ct unidad =', ct);
          ct = ct + ' AND ' + sql;
        } else {
          ct = ct + sql;
        }
      }

      //tipoEquipo
      if (this.checktipoEquipo) {
        let sql =
          "c.equipo.tipoEquipo.nombre like '%" + this.cajatipoEquipo + "%' ";
        if (ct.length > 0) {
          ct = ct + ' AND ' + sql;
        } else {
          ct = ct + sql;
        }
      }

      //marca
      if (this.checkmarca) {
        let sql =
          "c.equipo.modelo.marca.nombre like '%" + this.cajamarca + "%' ";
        //let sql = "c.modelo.marca.nombre like '%" + this.cajamarca + "%' ";
        if (ct.length > 0) {
          ct = ct + ' AND ' + sql;
        } else {
          ct = ct + sql;
        }
      }

      //modelo
      if (this.checkmodelo) {
        let sql = "c.equipo.modelo.nombre like '%" + this.cajamodelo + "%' ";
        if (ct.length > 0) {
          ct = ct + ' AND ' + sql;
        } else {
          ct = ct + sql;
        }
      }
      //año
      if (this.checkano) {
        if (
          this.cajaano1.toString().length > 0 &&
          (this.cajaano2 == undefined || this.cajaano2.toString().length == 0)
        ) {
          let sql = "c.fechaEntrega like '%" + this.cajaano1 + "%'";
          if (ct.length > 0) {
            ct = ct + ' AND ' + sql;
          } else {
            ct = ct + sql;
          }
        } else {
          let sql =
            "c.fechaEntrega Between '" +
            this.cajaano1 +
            "' AND '" +
            this.cajaano2 +
            "' ";
          if (ct.length > 0) {
            ct = ct + ' AND ' + sql;
          } else {
            ct = ct + sql;
          }
        }
      }

      ct = ct + ' AND c.activo = true ';
      // Swal.fire(ct);
      console.log(ct);
      let data = await this.wsdl
        .doCriteria(
          ct,
          false,
          null,
          'ORDER BY c.fechaEntrega Desc',
          this.page,
          this.limit
        )
        .then();
      console.log(data);
      const result = JSON.parse(JSON.stringify(data));
      // Swal.fire(JSON.stringify(date))
      // console.log(JSON.stringify(date))
      //this.resultado.emit(this.items);

      if (result.status === 200) {
        this.items = result.data;
        console.log('consulta avanzada', this.items);
        this.total = result.paginate.count;
        this.primero = 1;
        this.final = result.paginate.lastPage;
        this.siguiente = result.paginate.nextPage;
        this.anterior = result.paginate.prevPage;
        this.actual = result.paginate.page;
      } else if (result.status === 666) {
        // logout app o refresh token
        this.items = [];
      } else {
        //  this.persona = new Persona();
        this.items = [];
      }
      this.resultado.emit(this.items);
    }
  }

  pase(page: number) {
    this.page = page;
    this.filtradomultiple();
  }
}
