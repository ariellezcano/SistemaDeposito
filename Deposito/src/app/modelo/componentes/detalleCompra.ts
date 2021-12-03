import { Proveedor } from '../index.models';
import { Modelo } from './modelo';
import { OrdenCompra } from './ordenCompra';
import { Persona } from './persona';
import { TipoEquipo } from './tipoEquipo';

export class DetalleCompra {
  id!: Number;
  compra!: OrdenCompra;
  cantidadCompra!: number; //ya esta
  cantidadIngreso!: number;
  personalRecibe!: Persona;
  fechaRecepcion!: any;
  modelo: Modelo; //ya esta
  tipoEquipo: TipoEquipo; //ya esta
  proveedor: Proveedor;
  ordenCompraNum!: string; //agregado nuevo
  ordenPago!: string;
  fechaOrdenPago: any;
  fechaPago: any;
  nroFactura!: string;
  activo: Boolean;

  constructor() {
    this.proveedor = new Proveedor();
    this.tipoEquipo = new TipoEquipo();
    this.modelo = new Modelo();
    //this.personalRecibe = new Persona();
    this.activo = true;
  }
}
