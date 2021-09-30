import { Proveedor } from "./proveedor";

export class OrdenCompra{

    id!: Number;
    nroExpte!: string;//agregadoNuevo
    nroOrdenCompra!: string;
    nroLicitacion!: string;//agregadonuevo
    nroPreadjudicacion!:string;//agregadonuevo
    notPreadjudicacion!:string;//agregadonuevo
    nroFactura!:string;//agregadonuevo
    ordenPago!:string;//agregadonuevo
    fechaPagoCompra!: any;
    proveedor: Proveedor;
    fechaCompra!: any;
    tipoCompra!: string;
    estadoCompra!: string;
    activo!: Boolean;

    constructor(){
       this.proveedor=new Proveedor();
       this.fechaCompra = new Date();
       this.fechaPagoCompra = new Date();       
    }
}