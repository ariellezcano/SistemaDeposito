import { Proveedor } from "./proveedor";

export class OrdenCompra{

    id!: Number;
    nroOrdenCompra!: string;
    proveedor: Proveedor;
    fechaCompra!: Date;
    tipoCompra!: string;
    estadoCompra!: string;
    fechaPagoCompra!: Date;
    activo!: Boolean;

    constructor(){
       this.proveedor=new Proveedor();
       this.fechaCompra = new Date();
       this.fechaPagoCompra = new Date();       
    }
}