import { Proveedor } from "./proveedor";

export class OrdenCompra{

    id!: Number;
    nroOrdenCompra!: string;
    nroLicitacion!: string;//agregadonuevo
    nroPreadjudicacion!:string;//agregadonuevo
    notPreadjudicacion!:string;//agregadonuevo
    nroFactura!:string;//agregadonuevo
    ordenPago!:string;//agregadonuevo
    fechaPagoCompra!: Date;
    proveedor: Proveedor;
    fechaCompra!: Date;
    tipoCompra!: string;
    estadoCompra!: string;
    nroExpte!: string;//agregadoNuevo
    activo!: Boolean;

    constructor(){
       this.proveedor=new Proveedor();
       this.fechaCompra = new Date();
       this.fechaPagoCompra = new Date();       
    }
}