import { Persona } from './persona';
import { Proveedor } from './proveedor';

export class OrdenCompra {
  id!: Number;
  nroExpediente!: string; //agregadoNuevo
  ordenCompraNum!: string; ///ordenCompraNum
  nroLicitacion!: string; //agregadonuevo
  nroPreadjudicacion!: string; //agregadonuevo
  notaPreadjudicacion!: string; //agregadonuevo
  nroFactura!: string; //agregadonuevo
  ordenPago!: string; //agregadonuevo
  fechaPago!: any;
  proveedor: Proveedor;
  fechaInvitacion: any; //agregue nuevo
  fechaLicitacion: any; //agregue nuevo
  fechaAdjudicacion: any; //Agregue nuevo
  fechaOrdenCompra!: any; //fecha
  fecha: any; //fechacompra
  usuario!: Persona;
  tipoCompra!: string;
  observacion!: string; //agregue nuevo
  activo: Boolean;

  constructor() {
    this.proveedor = new Proveedor();
    this.fecha = new Date(); //fechacompra
    this.usuario = new Persona();
    this.activo = true;
  }
}
