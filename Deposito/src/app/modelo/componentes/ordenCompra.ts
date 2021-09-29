import { Proveedor } from "./proveedor";

export class OrdenCompra{

    id!: Number;
    nroOrden!: string;
    activo!: Boolean;
    proveedor: Proveedor;
    fechaCompra!: Date;

    constructor(){
       this.proveedor=new Proveedor();
       this.fechaCompra = new Date();       
    }
}