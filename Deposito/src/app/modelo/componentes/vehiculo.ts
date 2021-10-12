import { Tipovehiculo } from "./tipovehiculo";
import { Modelo } from "./modelo";
import { Estados } from "./estados";
import { Tipocombustible } from "./tipocombustible";
import { Unidad } from "./unidad";

export class Vehiculo {
  id!: number;
  titular!: string;
  ano!: string;
  dominio!: string;
  motornum!: string;
  chasisnum!: string;
  numInventario!: number;
  identificacionPol!: string;
  observaciones!: string;
  tipoVehiculo: Tipovehiculo;
  modelo: Modelo;
  estado: Estados;
  tipoCombustible: Tipocombustible;
  unidad: Unidad;
  /* campos nuevos del proyecto*/
  gps!: Boolean;
  fechaBaja!: Date;
  instrumento!: string;
  fechaCompra!: Date;
  activo: boolean;

  constructor() {
    this.unidad = new Unidad();
    this.tipoCombustible = new Tipocombustible();
    this.tipoVehiculo = new Tipovehiculo();
    this.modelo = new Modelo();
    this.estado = new Estados();
    this.instrumento = "";
    this.activo = true;
  }
}
