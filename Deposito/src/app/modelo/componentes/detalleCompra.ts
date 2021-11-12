import { Equipo } from './equipo';
import { Modelo } from './modelo';
import { OrdenCompra } from './ordenCompra';
import { Persona } from './persona';
import { TipoEquipo } from './tipoEquipo';

export class DetalleCompra {
  id!: Number;
  compra: OrdenCompra;
  cantidad_compra!: number; //ya esta
  cantidad_ingreso!: number;
  personal_recibe!: Persona;
  fecha_recepcion!: any;
  modelo: Modelo; //ya esta
  tipo_equipo: TipoEquipo; //ya esta
  editar: boolean;
  activo: Boolean;

  constructor() {
    this.compra = new OrdenCompra();
    this.personal_recibe = new Persona();
    this.fecha_recepcion = new Date();
    this.tipo_equipo = new TipoEquipo();
    this.modelo = new Modelo();
    this.activo = true;
    this.editar = false;
  }
}
