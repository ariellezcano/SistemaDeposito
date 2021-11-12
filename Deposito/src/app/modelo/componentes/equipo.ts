import { Unidad } from './unidad';
import { Proveedor } from './proveedor';
import { EstadoEquipo } from './estadoEquipo';
import { Modelo } from './modelo';
import { TipoEquipo } from './tipoEquipo';

export class Equipo {
  id!: Number;
  unidad: Unidad; //no
  proveedor: Proveedor;
  estado: EstadoEquipo;
  tipoEquipo: TipoEquipo;
  modelo: Modelo;
  situacion!: string; //'A ASIGNAR',/*REASIGNAR ASIGNADO*/
  idPolicial!: String;
  nroSerie!: string;
  observacion!: String;
  fechaAlta!: any;
  garantia!: Number;
  fechaAsiganacion!: any; //fecha para desguace de equipo
  tipoAlta!: string; //adquisicion, donacion, secuestro
  activo: Boolean;

  constructor() {
    this.unidad = new Unidad();
    this.proveedor = new Proveedor();
    this.estado = new EstadoEquipo();
    this.modelo = new Modelo();
    this.tipoEquipo = new TipoEquipo();
    this.fechaAlta = new Date();
    this.activo = true;
    this.fechaAsiganacion = new Date();
  }
}
