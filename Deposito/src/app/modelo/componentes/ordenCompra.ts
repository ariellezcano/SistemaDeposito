import { Persona } from './persona';
import { Proveedor } from './proveedor';

export class OrdenCompra {
  id!: Number;
  nroExpediente!: string; //agregadoNuevo
  ordenCompraNum!: string; ///ordenCompraNum
  fechaInvitacion: any; //agregue nuevo
  fechaLicitacion: any; //se va a utilizar para fecha notificacion de preadjudicacion
  fechaAdjudicacion: any; //se va a utilizar para la fecha de preadjudicacion
  fechaOrdenCompra!: any; //fecha
  fecha: any; //fechacompra //se va a utilizar para fecha y hora de apertura
  usuario!: Persona; //persona que crea la orden compra
  tipoCompra!: string;
  observacion!: string; //agregue nuevo
  activo: Boolean;

  // nroLicitacion!: string; //agregadonuevo
  // nroPreadjudicacion!: string; //agregadonuevo
  // notaPreadjudicacion!: string; //agregadonuevo
  // nroFactura!: string; //agregadonuevo
  // ordenPago!: string; //agregadonuevo
  // fechaPago!: any;

  constructor() {
    this.fecha = new Date(); //fechacompra
    this.usuario = new Persona();
    this.activo = true;
  }
}
